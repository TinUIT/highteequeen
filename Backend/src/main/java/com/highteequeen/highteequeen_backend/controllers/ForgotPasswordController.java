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
@RequiredArgsConstructor
public class ForgotPasswordController {
    private final IUserService userService;
    @GetMapping("/reset_password")
    public String showResetPasswordForm(@Param(value = "token") String token, Model model) {
        User customer = userService.getByResetPasswordToken(token);

        model.addAttribute("token", token);

        if (customer == null) {
            model.addAttribute("message", "Invalid Token");
            return "message";
        }

        return "reset_password_form";
    }

    @PostMapping("/reset_password")
    public String processResetPassword(HttpServletRequest request) {
        try {
            String token = request.getParameter("token");
            String password = request.getParameter("password");

            User customer = userService.getByResetPasswordToken(token);

            if (customer == null) {
                return "message";
            } else {
                userService.updatePassword(customer, password);

            }

            return "message";
        } catch (Exception e) {
            return "message";
        }

    }
}
