package com.highteequeen.highteequeen_backend.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.highteequeen.highteequeen_backend.entity.Product;
import com.highteequeen.highteequeen_backend.entity.ProductImage;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse extends BaseResponse {
    private Long id;
    private String name;
    private Float price;
    private String thumbnail;
    private String description;
    private int inStock;
    private int totalPages;
    private long salesCount;
    private float discountPercent;

    @JsonProperty("product_images")
    private List<ProductImage> productImages = new ArrayList<>();

    @JsonProperty("category_id")
    private Long categoryId;

    @JsonProperty("brand_id")
    private Long brandId;
    public static ProductResponse fromProduct(Product product) {
        ProductResponse productResponse = ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .thumbnail(product.getThumbnail())
                .description(product.getDescription())
                .inStock(product.getInStock())
                .discountPercent(product.getDiscountPercent())
                .salesCount(product.getSalesCount() == null ? 0 : product.getSalesCount())
                .categoryId(product.getCategory().getId())
                .brandId(product.getBrand().getId())
                .productImages(product.getProductImages())
                .build();
        productResponse.setCreatedAt(product.getCreatedAt());
        productResponse.setUpdatedAt(product.getUpdatedAt());
        return productResponse;
    }
}
