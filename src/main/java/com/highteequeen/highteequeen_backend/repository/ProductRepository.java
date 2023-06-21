package com.highteequeen.highteequeen_backend.repository;

import com.highteequeen.highteequeen_backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE p.category.name = ?1")
    public List<Product> findByCategory(String category);

    @Query("SELECT p FROM Product p WHERE p.sales > 0")
    public List<Product> findBySales();

    @Query("SELECT p FROM Product p ORDER BY p.sold DESC")
    Page<Product> findTopSellProducts(Pageable pageable);

    @Query("SELECT p FROM Product p ORDER BY p.sales DESC")
    Page<Product> findTopSalesProducts(Pageable pageable);

    @Query("SELECT p FROM Product p ORDER BY p.price DESC")
    Page<Product> findHighPriceProducts(Pageable pageable);

    @Query("SELECT p FROM Product p ORDER BY p.price ASC")
    Page<Product> findLowPriceProducts(Pageable pageable);
}
