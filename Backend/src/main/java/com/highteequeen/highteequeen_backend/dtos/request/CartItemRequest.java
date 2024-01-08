package com.highteequeen.highteequeen_backend.dtos.request;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartItemRequest {
    private Long productId;
    private int quantity;
}
