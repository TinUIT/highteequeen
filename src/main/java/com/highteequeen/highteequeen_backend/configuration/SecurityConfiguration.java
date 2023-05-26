package com.highteequeen.highteequeen_backend.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf().disable()
                .authorizeHttpRequests()
                .anyRequest()
                .permitAll();;
//                .antMatchers("/users/**", "/settings/**").hasAuthority("Admin")
//                .hasAnyAuthority("Admin", "Editor", "Salesperson")
//                .hasAnyAuthority("Admin", "Editor", "Salesperson", "Shipper")
//                .anyRequest().authenticated()
//                .and().formLogin()
//                .loginPage("/login")
//                .usernameParameter("email")
//                .permitAll()
//                .and()
//                .rememberMe().key("AbcdEfghIjklmNopQrsTuvXyz_0123456789")
//                .and()
//                .logout().permitAll();

//        http.headers().frameOptions().sameOrigin();

        return http.build();
    }
}
