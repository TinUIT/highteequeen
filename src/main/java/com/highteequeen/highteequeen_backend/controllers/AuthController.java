package com.highteequeen.highteequeen_backend.controllers;

import com.highteequeen.highteequeen_backend.dto.CustomerDto;
import com.highteequeen.highteequeen_backend.dto.UserDto;
import com.highteequeen.highteequeen_backend.model.Customer;
import com.highteequeen.highteequeen_backend.service.UserService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import org.slf4j.Logger;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/auth")
public class AuthController {


    private Logger logger =  LoggerFactory.getLogger(AuthController.class);

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDto userDto) {
        Customer registeredUser = userService.registerUser(userDto);
        if (registeredUser != null) {
            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Invalid Username or Password",HttpStatus.BAD_REQUEST);
        }
    }

//    @PostMapping("/register/google")
//    public ResponseEntity<User> googleRegister(@RequestBody TokenId tokenId) {
//        User registeredUser = userService.registerGoogleUser(tokenId.getToken());
//        if (registeredUser != null) {
//            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
//        } else {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody UserDto userDto) throws ChangeSetPersister.NotFoundException {
        CustomerDto res = userService.loginUser(userDto);  //userService.loginUser now returns CustomerDto
        if (res != null) {
            return new ResponseEntity<>(res, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


//    @PostMapping("/login/google")
//    public ResponseEntity<User> googleLogin(@RequestBody TokenId tokenId) {
//        return ResponseEntity.ok(userService.login(tokenId.getToken()));
//    }
}
