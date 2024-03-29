package com.highteequeen.highteequeen_backend.repositories;

import com.highteequeen.highteequeen_backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsByName(String name);
    Page<Product> findAll(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE " +
            "(:categoryId IS NULL OR :categoryId = 0 OR p.category.id = :categoryId) " +
            "AND (:brandId IS NULL OR :brandId = 0 OR p.brand.id = :brandId) " +
            "AND (:keyword IS NULL OR :keyword = '' OR p.name LIKE %:keyword% OR p.description LIKE %:keyword%)")
    Page<Product> searchProducts
            (@Param("categoryId") Long categoryId,
             @Param("brandId") Long brandId,
             @Param("keyword") String keyword, Pageable pageable);
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.productImages WHERE p.id = :productId")
    Optional<Product> getDetailProduct(@Param("productId") Long productId);

    @Query("SELECT p FROM Product p WHERE p.id IN :productIds")
    List<Product> findProductsByIds(@Param("productIds") List<Long> productIds);

    @Query("SELECT p FROM Product p ORDER BY p.salesCount DESC")
    Page<Product> searchBestSellingProducts(Pageable pageable);

    Page<Product> findAllByOrderByDiscountPercentDesc(Pageable pageable);
    @Query("SELECT p FROM Product p JOIN p.favoritedByUsers u GROUP BY p ORDER BY COUNT(u) DESC")
    Page<Product> findProductsByMostFavorited(Pageable pageable);
}
