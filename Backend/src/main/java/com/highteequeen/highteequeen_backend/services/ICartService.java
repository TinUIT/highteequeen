package com.highteequeen.highteequeen_backend.services;

import com.highteequeen.highteequeen_backend.dtos.request.CartItemRequest;
import com.highteequeen.highteequeen_backend.entity.Cart;

public interface ICartService {
    void addToCart(Long userId, CartItemRequest cartItemRequest);

    Cart getCartByUserId(Long userId);
    void updateCartItem(Long userId, CartItemRequest cartItemRequest);
    void removeFromCart(Long userId, Long productId);
    void clearCart(Long userId);
}
