package com.highteequeen.highteequeen_backend.controllers;

import com.highteequeen.highteequeen_backend.entity.User;
import com.highteequeen.highteequeen_backend.exeptions.DataNotFoundException;
import com.highteequeen.highteequeen_backend.helper.MailInfo;
import com.highteequeen.highteequeen_backend.repositories.UserRepository;
import com.highteequeen.highteequeen_backend.services.IMailService;
import com.highteequeen.highteequeen_backend.services.IUserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.internal.bytebuddy.utility.RandomString;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("${api.prefix}/auth")
@RequiredArgsConstructor
public class ForgotPasswordController {
    private final IUserService userService;
    private final UserRepository userRepository;
    private final IMailService mailer;

    @PostMapping("/forgot_password")
    public String processForgotPassword(HttpServletRequest request, @RequestBody String email) throws DataNotFoundException, MessagingException {
        String token = RandomString.make(30);
        userService.updateResetPasswordToken(token, email);

        String resetPasswordLink = getSiteURL(request) + "/reset_password?token=" + token;

        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("User not found"));
        String from = "ptt102002@gmail.com";
        String to = existingUser.getEmail();
        String subject = "Thông báo!";

        String body = "Highteequeen xin chào! Nhấp vào " + resetPasswordLink + " để thay đổi mật khẩu";
        MailInfo mail = new MailInfo(from, to, subject, body);
        mailer.send(mail);
        return "Check email để đổi mật khẩu ";
    }

    public static String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    public void sendEmail(){

    }


//    @GetMapping("/reset_password")
//    public String showResetPasswordForm(@Param(value = "token") String token) {
//        User customer = userService.getByResetPasswordToken(token);
//
//        model.addAttribute("token", token);
//
//        if (customer == null) {
//            model.addAttribute("message", "Invalid Token");
//            return "message";
//        }
//
//        return "reset_password_form";
//    }

    @PostMapping("/reset_password")
    public String processResetPassword() {
        return null;
    }
}
