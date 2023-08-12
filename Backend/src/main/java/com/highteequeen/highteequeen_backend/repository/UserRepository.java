package com.highteequeen.highteequeen_backend.repository;

import com.highteequeen.highteequeen_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom query methods

    Optional<User> findByEmail(String email);
}