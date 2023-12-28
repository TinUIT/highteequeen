package com.highteequeen.highteequeen_backend.repositories;

import com.highteequeen.highteequeen_backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByUserIdAndProductId(@Param("userId") Long userId,
                                          @Param("productId") Long productId);
    List<Review> findByProductId(@Param("productId") Long productId);
}
