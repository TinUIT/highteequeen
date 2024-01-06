package com.highteequeen.highteequeen_backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("${api.prefix}/auth")
@RequiredArgsConstructor
public class ForgotPasswordController {

    @PostMapping("/forgot_password")
    public String processForgotPassword() {
    }

    public void sendEmail(){

    }


    @GetMapping("/reset_password")
    public String showResetPasswordForm() {

    }

    @PostMapping("/reset_password")
    public String processResetPassword() {

    }
}
