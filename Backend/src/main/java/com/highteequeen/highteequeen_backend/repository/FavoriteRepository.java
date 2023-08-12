package com.highteequeen.highteequeen_backend.repository;

import com.highteequeen.highteequeen_backend.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    @Query("SELECT f FROM Favorite f WHERE f.customer.customerId = ?1")
    Favorite findByCustomerId(Integer customerId);
}
