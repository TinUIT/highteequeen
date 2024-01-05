package com.highteequeen.highteequeen_backend.repositories;


import com.highteequeen.highteequeen_backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByPhoneNumber(String phoneNumber);

    Optional<User> findByEmail(String email);

    @Query("SELECT o FROM User o WHERE (:keyword IS NULL OR :keyword = '' OR " +
            "o.fullName LIKE %:keyword% " +
            "OR o.address LIKE %:keyword% " +
            "OR o.phoneNumber LIKE %:keyword%) " +
            "AND LOWER(o.role.name) = 'user'")
    Page<User> findAll(@Param("keyword") String keyword, Pageable pageable);
}
