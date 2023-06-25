package com.highteequeen.highteequeen_backend.dto;

public class OrderDetailDto {
    private Long id;
    private ProductDto product;
    private Integer quantity;
    private Double subtotal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
