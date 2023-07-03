package com.highteequeen.highteequeen_backend.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.highteequeen.highteequeen_backend.dto.CustomerDto;
import com.highteequeen.highteequeen_backend.dto.ProductDto;
import com.highteequeen.highteequeen_backend.dto.ProductOrderDto;
import com.highteequeen.highteequeen_backend.dto.UserDto;
import com.highteequeen.highteequeen_backend.model.*;
import com.highteequeen.highteequeen_backend.repository.CustomerRepository;
import com.highteequeen.highteequeen_backend.repository.UserRepository;
import com.highteequeen.highteequeen_backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collections;
import java.time.*;
import java.util.List;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    private final JwtUtils jwtUtils;


    @Autowired
    public UserService(UserRepository userRepository, CustomerRepository customerRepository, PasswordEncoder passwordEncoder,  JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public Customer registerUser(@Valid UserDto userDto) {
        if (userRepository.findByEmail(userDto.getEmail()) != null) {
            return null;
        }

        User user = new User();
        user.setFullName(userDto.getFullname());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(Role.CUSTOMER);

        Customer customer = new Customer(user,userDto.getEmail(), userDto.getFullname(), LocalDateTime.now());
        customer.setImage("avatar-default.jpg");
        userRepository.save(user);
        return customerRepository.save(customer);
    }

    public CustomerDto loginUser(UserDto userDto) throws ChangeSetPersister.NotFoundException {
        // Find user by email
        User user = userRepository.findByEmail(userDto.getEmail());
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + userDto.getEmail());
        }

        // Check password
        if (!passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        // Find customer by user
        Customer customer = customerRepository.findByUser(user);
        if (customer == null) {
            throw new ChangeSetPersister.NotFoundException();
        }

        // Create CustomerDto and populate it with data from Customer
        CustomerDto customerDto = new CustomerDto();
        customerDto.setCustomerId(customer.getCustomerId());
        customerDto.setEmail(customer.getEmail());
        customerDto.setFullName(customer.getFullName());
        customerDto.setAddress(customer.getAddress());
        customerDto.setPhone(customer.getPhone());
        customerDto.setImage(customer.getImage());
        customerDto.setRole(user.getRole());

        // Map associated orders
        List<ProductOrderDto> ordersDto = new ArrayList<>();
        for (ProductOrder order : customer.getOrders()) {
            ProductOrderDto orderDto = new ProductOrderDto();
            orderDto.setOrderId(order.getOrderId());

            List<ProductDto> productDtos = new ArrayList<>();
            for (OrderDetail detail : order.getOrderDetails()) {
                ProductDto productDto = new ProductDto();
                productDto.setId(detail.getProduct().getProductId());
                productDto.setName(detail.getProduct().getName());
                // Add other fields as required
                productDtos.add(productDto);
            }

            //orderDto.setProducts(productDtos);
            ordersDto.add(orderDto);
        }

        // Populate the orders to customerDto
        customerDto.setOrders(ordersDto);

        return customerDto;
    }

    public User login(String token) {
        GoogleIdToken.Payload payload = verify(token);
        User user = userRepository.findByEmail(payload.getEmail());

        if (user == null) {
            user = new User();
            user.setEmail(payload.getEmail());
            user.setFullName((String) payload.get("name"));
            userRepository.save(user);
        }

        return user;
    }

    public GoogleIdToken.Payload verify(String token) {
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList("325424392497-cbrjevbvt8t3jrrpm74gfp9lt2p8uvr1.apps.googleusercontent.com"))
                .build();

        try {
            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                return idToken.getPayload();
            } else {
                throw new RuntimeException("Invalid ID token.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to verify token", e);
        }
    }

    public User registerGoogleUser(String token) {
        GoogleIdToken.Payload payload = verify(token);
        String email = payload.getEmail();
        User user = userRepository.findByEmail(email);

        if (user != null) {
            // User already exists in the database
            return null;
        }

        user = new User();
        user.setEmail(email);
        user.setFullName((String) payload.get("name"));
        userRepository.save(user);

        return user;
    }
}
