package com.highteequeen.highteequeen_backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ProductOrderDto {
    private Long orderId;
    private int customerId;

    private LocalDateTime orderDate;
    private String shippingAddress;
    private String recipientName;
    private String recipientPhone;
    private String paymentMethod;
    private Double total;
    private String status;
    private String email;
    private List<OrderDetailDto> orderDetails;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ProductOrderDto() {

    }

    public ProductOrderDto(int customerId, String shippingAddress, String recipientName, String recipientPhone, String paymentMethod, Double total, String status, List<OrderDetailDto> orderDetails) {
        this.customerId = customerId;
        this.shippingAddress = shippingAddress;
        this.recipientName = recipientName;
        this.recipientPhone = recipientPhone;
        this.paymentMethod = paymentMethod;
        this.total = total;
        this.status = status;
        this.orderDetails = orderDetails;
    }



    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getRecipientPhone() {
        return recipientPhone;
    }

    public void setRecipientPhone(String recipientPhone) {
        this.recipientPhone = recipientPhone;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<OrderDetailDto> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetailDto> orderDetails) {
        this.orderDetails = orderDetails;
    }
}
