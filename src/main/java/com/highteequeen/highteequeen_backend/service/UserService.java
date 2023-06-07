package com.highteequeen.highteequeen_backend.service;

import com.highteequeen.highteequeen_backend.dto.ProductDto;
import com.highteequeen.highteequeen_backend.dto.UserDto;
import com.highteequeen.highteequeen_backend.model.Product;
import com.highteequeen.highteequeen_backend.model.Role;
import com.highteequeen.highteequeen_backend.model.User;
import com.highteequeen.highteequeen_backend.repository.UserRepository;
import com.highteequeen.highteequeen_backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.Valid;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;


    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,  JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public User registerUser(@Valid UserDto userDto) {
        if (userRepository.findByEmail(userDto.getEmail()) != null) {
            return null;
        }

        User user = new User();
        user.setFullName(userDto.getFullname());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(Role.CUSTOMER);

        return userRepository.save(user);
    }

    public UserDto loginUser(UserDto userDto) {
        User user = userRepository.findByEmail(userDto.getEmail());

        if (user != null && passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
             userDto.setToken(jwtUtils.generateToken(user.getEmail(), user.getRole()));
             userDto.setFullname(user.getFullName());
             return userDto;
        }

        return null;
    }
}
