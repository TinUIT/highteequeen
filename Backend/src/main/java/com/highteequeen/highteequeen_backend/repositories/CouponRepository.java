package com.highteequeen.highteequeen_backend.repositories;

import com.highteequeen.highteequeen_backend.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
    Optional<Coupon> findByCode(String couponCode);
}
