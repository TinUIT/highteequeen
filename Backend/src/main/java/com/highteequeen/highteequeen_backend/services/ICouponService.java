package com.highteequeen.highteequeen_backend.services;

public interface ICouponService {
    double calculateCouponValue(String couponCode, double totalAmount);
}
