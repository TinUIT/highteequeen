package com.highteequeen.highteequeen_backend.repository;

import com.highteequeen.highteequeen_backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.product.productId = ?1")
    Double findAverageRatingByProductId(Long productId);

    @Query("SELECT r FROM Review r WHERE r.product.productId = ?1")
    List<Review> findByProductId(Long productId);
}
