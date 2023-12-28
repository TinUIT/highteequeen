package com.highteequeen.highteequeen_backend.repositories;

import com.highteequeen.highteequeen_backend.entity.Token;
import com.highteequeen.highteequeen_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> findByUser(User user);
    Token findByToken(String token);
    Token findByRefreshToken(String token);
}
