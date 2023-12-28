package com.highteequeen.highteequeen_backend.services;

import com.highteequeen.highteequeen_backend.entity.User;
import com.highteequeen.highteequeen_backend.exeptions.DataNotFoundException;

public interface IAuthenticationService {

    public Boolean activateUser(Long userId) throws DataNotFoundException;
    public String validatePasswordResetToken(Long user_id, String token);
    public Boolean resetPassword(Long user_id,String token, String newPass);

    public void createPasswordResetTokenForUser(User user, String token);
}
