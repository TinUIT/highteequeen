package com.highteequeen.highteequeen_backend.dto;

import com.highteequeen.highteequeen_backend.model.Role;

import java.util.List;

public class CustomerDto {
    private int customerId;
    private String email;
    private String fullName;
    private String address;
    private String city;
    private String country;
    private String phone;
    private List<ProductOrderDto> orders;
    private Role role;
    private String image;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<ProductOrderDto> getOrders() {
        return orders;
    }

    public void setOrders(List<ProductOrderDto> orders) {
        this.orders = orders;
    }
}
