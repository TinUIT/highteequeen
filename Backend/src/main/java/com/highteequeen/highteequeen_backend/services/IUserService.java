package com.highteequeen.highteequeen_backend.services;

import com.highteequeen.highteequeen_backend.dtos.UpdateUserDTO;
import com.highteequeen.highteequeen_backend.dtos.UserDTO;
import com.highteequeen.highteequeen_backend.entity.User;
import com.highteequeen.highteequeen_backend.exeptions.DataNotFoundException;
import com.highteequeen.highteequeen_backend.exeptions.InvalidPasswordException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;
    String login(String phoneNumber, String password) throws Exception;
    User getUserDetailsFromToken(String token) throws Exception;
    User getUserDetailsFromRefreshToken(String token) throws Exception;
    User updateUser(Long userId, UpdateUserDTO updatedUserDTO) throws Exception;

    void removeProductToFavorites(Long userId, Long productId) throws DataNotFoundException;

    void resetPassword(Long userId, String newPassword)
            throws InvalidPasswordException, DataNotFoundException ;
    public void blockOrEnable(Long userId, Boolean active) throws DataNotFoundException;
    Page<User> findAll(String keyword, Pageable pageable) throws Exception;

    void addProductToFavorites(Long userId, Long productId) throws DataNotFoundException;

    String storeFile(MultipartFile file) throws IOException;

    void updateResetPasswordToken(String token, String email) throws DataNotFoundException;

    User getByResetPasswordToken(String token);

    void updatePassword(User customer, String newPassword);
}
