package com.highteequeen.highteequeen_backend.repository;

import com.highteequeen.highteequeen_backend.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrderDetail, Long> {
}
