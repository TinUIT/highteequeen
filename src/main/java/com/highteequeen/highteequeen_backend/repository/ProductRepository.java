package com.highteequeen.highteequeen_backend.repository;

import com.highteequeen.highteequeen_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE p.category.name = ?1")
    public List<Product> findByCategory(String category);
}
