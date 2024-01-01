package com.highteequeen.highteequeen_backend.services;

import com.highteequeen.highteequeen_backend.entity.Token;
import com.highteequeen.highteequeen_backend.entity.User;
import org.springframework.stereotype.Service;

@Service

public interface ITokenService {
    Token addToken(User user, String token, boolean isMobileDevice);
    Token refreshToken(String refreshToken, User user) throws Exception;
}
