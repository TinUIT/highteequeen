package com.highteequeen.highteequeen_backend.repository;

import com.highteequeen.highteequeen_backend.model.ProductOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductOrderRepository extends JpaRepository<ProductOrder, Long> {
}

