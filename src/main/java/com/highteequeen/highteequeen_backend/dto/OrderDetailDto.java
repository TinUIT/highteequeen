package com.highteequeen.highteequeen_backend.dto;

public class OrderDetailDto {
    private Long id;
    private Long productId;
    private String productName;
    private Integer quantity;
    private Double subtotal;
    private float price;
    private String image;

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public OrderDetailDto(Long productId, Integer quantity, Double subtotal) {
        this.productId = productId;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }

    public OrderDetailDto() {

    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
