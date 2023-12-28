package com.highteequeen.highteequeen_backend.services.impl;

import com.highteequeen.highteequeen_backend.entity.User;
import com.highteequeen.highteequeen_backend.exeptions.DataNotFoundException;
import com.highteequeen.highteequeen_backend.repositories.UserRepository;
import com.highteequeen.highteequeen_backend.services.IAuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {
    private final UserRepository userRepository;
    @Override
    public Boolean activateUser(Long userId) throws DataNotFoundException {
        Timestamp now = Timestamp.valueOf(LocalDateTime.now());
        User foundUser = userRepository.findById(userId).orElseThrow();
        if(foundUser!=null){
            foundUser.setActive(true);
            foundUser.setUpdate_at(now);
            User saved = userRepository.save(foundUser);
            if(saved!=null)
                return true;
            else return false;
        } else {
            throw new DataNotFoundException("User not found!");
        }
    }

    @Override
    public String validatePasswordResetToken(Long user_id, String token) {
        return null;
    }

    @Override
    public Boolean resetPassword(Long user_id, String token, String newPass) {
        return null;
    }

    @Override
    public void createPasswordResetTokenForUser(User user, String token) {

    }
}
