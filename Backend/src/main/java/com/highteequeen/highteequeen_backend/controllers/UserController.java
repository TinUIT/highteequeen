package com.highteequeen.highteequeen_backend.controllers;

import com.highteequeen.highteequeen_backend.components.LocalizationUtils;
import com.highteequeen.highteequeen_backend.dtos.*;
import com.highteequeen.highteequeen_backend.entity.Product;
import com.highteequeen.highteequeen_backend.entity.ProductImage;
import com.highteequeen.highteequeen_backend.entity.Token;
import com.highteequeen.highteequeen_backend.entity.User;
import com.highteequeen.highteequeen_backend.exeptions.DataNotFoundException;
import com.highteequeen.highteequeen_backend.exeptions.InvalidPasswordException;
import com.highteequeen.highteequeen_backend.helper.MailInfo;
import com.highteequeen.highteequeen_backend.repositories.UserRepository;
import com.highteequeen.highteequeen_backend.responses.*;
import com.highteequeen.highteequeen_backend.services.IMailService;
import com.highteequeen.highteequeen_backend.services.ITokenService;
import com.highteequeen.highteequeen_backend.services.IUserService;
import com.highteequeen.highteequeen_backend.services.impl.AuthenticationService;
import com.highteequeen.highteequeen_backend.utils.MessageKeys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;
    private final LocalizationUtils localizationUtils;
    private final IMailService mailer;
    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;
    private final ITokenService tokenService;

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllUser(
            @RequestParam(defaultValue = "", required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit
    ){
        try {
            PageRequest pageRequest = PageRequest.of(
                    page, limit,
                    //Sort.by("createdAt").descending()
                    Sort.by("id").ascending()
            );
            Page<UserResponse> userPage = userService.findAll(keyword, pageRequest)
                    .map(UserResponse::fromUser);
            int totalPages = userPage.getTotalPages();
            List<UserResponse> userResponses = userPage.getContent();
            return ResponseEntity.ok(UserListResponse
                    .builder()
                    .users(userResponses)
                    .totalPages(totalPages)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> createUser(
            @Valid @RequestBody UserDTO userDTO,
            HttpServletRequest request,
            BindingResult result
    ) {
        RegisterResponse registerResponse = new RegisterResponse();

        if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            registerResponse.setMessage(errorMessages.toString());
            return ResponseEntity.badRequest().body(registerResponse);
        }

        if (!userDTO.getPassword().equals(userDTO.getRetypePassword())) {
            registerResponse.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.PASSWORD_NOT_MATCH));
            return ResponseEntity.badRequest().body(registerResponse);
        }

        try {
            User user = userService.createUser(userDTO);
            registerResponse.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.REGISTER_SUCCESSFULLY));
            registerResponse.setUser(user);
            String from = "ptt102002@gmail.com";
            String to = userDTO.getEmail();
            String subject = "Welcome!";
            String url = request.getRequestURL().toString().replace("register", "activate/" + user.getId());
            String body = "Highteequeen xin chào! Vui lòng nhấn vào <a href='" + url + "'>Activate</a> để kích hoạt tài khoản.";
            MailInfo mail = new MailInfo(from, to, subject, body);
            mailer.send(mail);
            return ResponseEntity.ok(registerResponse);
        } catch (Exception e) {
            registerResponse.setMessage(e.getMessage());
            return ResponseEntity.badRequest().body(registerResponse);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody UserLoginDTO userLoginDTO,
            HttpServletRequest request
    ) {
        try {
            String token = userService.login(
                    userLoginDTO.getEmail(),
                    userLoginDTO.getPassword()
            );
            String userAgent = request.getHeader("User-Agent");
            User userDetail = userService.getUserDetailsFromToken(token);
            Token jwtToken = tokenService.addToken(userDetail, token, isMobileDevice(userAgent));

            return ResponseEntity.ok(LoginResponse.builder()
                    .message(localizationUtils.getLocalizedMessage(MessageKeys.LOGIN_SUCCESSFULLY))
                    .token(jwtToken.getToken())
                    .tokenType(jwtToken.getTokenType())
                    .refreshToken(jwtToken.getRefreshToken())
                    .username(userDetail.getUsername())
                    .roles(userDetail.getAuthorities().stream().map(item -> item.getAuthority()).toList())
                    .id(userDetail.getId())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    LoginResponse.builder()
                            .message(localizationUtils.getLocalizedMessage(MessageKeys.LOGIN_FAILED, e.getMessage()))
                            .build()
            );
        }
    }
    private boolean isMobileDevice(String userAgent) {
        return userAgent.toLowerCase().contains("mobile");
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<LoginResponse> refreshToken(
            @Valid @RequestBody RefreshTokenDTO refreshTokenDTO
    ) {
        try {
            User userDetail = userService.getUserDetailsFromRefreshToken(refreshTokenDTO.getRefreshToken());
            Token jwtToken = tokenService.refreshToken(refreshTokenDTO.getRefreshToken(), userDetail);
            return ResponseEntity.ok(LoginResponse.builder()
                    .message("Refresh token successfully")
                    .token(jwtToken.getToken())
                    .tokenType(jwtToken.getTokenType())
                    .refreshToken(jwtToken.getRefreshToken())
                    .username(userDetail.getUsername())
                    .roles(userDetail.getAuthorities().stream().map(item -> item.getAuthority()).toList())
                    .id(userDetail.getId())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    LoginResponse.builder()
                            .message(localizationUtils.getLocalizedMessage(MessageKeys.LOGIN_FAILED, e.getMessage()))
                            .build()
            );
        }
    }

    @PostMapping("/details")
    public ResponseEntity<UserResponse> getUserDetails(
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        try {
            String extractedToken = authorizationHeader.substring(7);
            User user = userService.getUserDetailsFromToken(extractedToken);
            return ResponseEntity.ok(UserResponse.fromUser(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/details/{userId}")
    public ResponseEntity<UserResponse> updateUserDetails(
            @PathVariable Long userId,
            @RequestBody UpdateUserDTO updatedUserDTO,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        try {
            String extractedToken = authorizationHeader.substring(7);
            User user = userService.getUserDetailsFromToken(extractedToken);
            if (user.getId() != userId) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            User updatedUser = userService.updateUser(userId, updatedUserDTO);
            return ResponseEntity.ok(UserResponse.fromUser(updatedUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/activate/{userId}")
    public ResponseEntity<?> activateAccount(@PathVariable Long userId) {
        try {
            User foundUser = userRepository.findById(userId).orElseThrow();
            boolean result =authenticationService.activateUser(userId);
            if(result==true){
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject(HttpStatus.OK.value(), "User "+ foundUser.getUsername() + " activated successfully!",  null));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        new ResponseObject(HttpStatus.BAD_REQUEST.value(), "Unable to activate user account",  null));
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject(HttpStatus.BAD_REQUEST.value(), "Error activating account", e.getMessage()));
        }
    }

    @PutMapping("/reset-password/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> resetPassword(@Valid @PathVariable long userId){
        try {
            String newPassword = UUID.randomUUID().toString().substring(0, 5);
            userService.resetPassword(userId, newPassword);
            return ResponseEntity.ok(newPassword);
        } catch (InvalidPasswordException e) {
            return ResponseEntity.badRequest().body("Invalid password");
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body("User not found");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/block/{userId}/{active}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> blockOrEnable(
            @Valid @PathVariable long userId,
            @Valid @PathVariable int active
    ) {
        try {
            userService.blockOrEnable(userId, active > 0);
            String message = active > 0 ? "Successfully enabled the user." : "Successfully blocked the user.";
            User existingUser = userRepository.findById(userId)
                    .orElseThrow(() -> new DataNotFoundException("User not found"));
            if(active == 0) {
                String from = "ptt102002@gmail.com";
                String to = existingUser.getEmail();
                String subject = "Thông báo!";

                String body = "Highteequeen xin chào! Tài khoản của " + existingUser.getFullName() + " đã bị khóa. Vui lòng liên hệ ptt102002@gmail.com để biết thêm chi tiết ";
                MailInfo mail = new MailInfo(from, to, subject, body);
                mailer.send(mail);
            }
            return ResponseEntity.ok().body(message);
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body("User not found.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/avatars/{imageName}")
    public ResponseEntity<?> viewImage(@PathVariable String imageName) {
        try {
            java.nio.file.Path imagePath = Paths.get("avatars/"+imageName);
            UrlResource resource = new UrlResource(imagePath.toUri());
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(new UrlResource(Paths.get("avatars/default-avatar-image.jpg").toUri()));
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "uploads/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> uploadImages(
            @PathVariable("id") Long userId,
            @ModelAttribute("file") MultipartFile file,
            @RequestHeader("Authorization") String authorizationHeader
    ){
        try {
            String extractedToken = authorizationHeader.substring(7);
            User user = userService.getUserDetailsFromToken(extractedToken);
                if(file.getSize() > 10 * 1024 * 1024) {
                    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                            .body(localizationUtils
                                    .getLocalizedMessage(MessageKeys.UPLOAD_IMAGES_FILE_LARGE));
                }
                String contentType = file.getContentType();
                if(contentType == null || !contentType.startsWith("image/")) {
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                            .body(localizationUtils.getLocalizedMessage(MessageKeys.UPLOAD_IMAGES_FILE_MUST_BE_IMAGE));
                }
                String filename = userService.storeFile(file);
                user.setAvatar(filename);
                userRepository.save(user);
            return ResponseEntity.ok().body("Avartar change suscessfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    @PostMapping("/forgot-password")
//    public ResponseEntity<?> requestPasswordReset(@RequestParam String email) {
//        String token = userService.generateResetToken(email);
//        emailService.sendResetLink(email, token);
//        return ResponseEntity.ok().body("Password reset link has been sent to your email.");
//    }
}

