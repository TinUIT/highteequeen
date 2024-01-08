package com.highteequeen.highteequeen_backend.services.impl;

import com.highteequeen.highteequeen_backend.dtos.request.CartItemRequest;
import com.highteequeen.highteequeen_backend.entity.Cart;
import com.highteequeen.highteequeen_backend.services.ICartService;

public class CartService implements ICartService {
    @Override
    public void addToCart(Long userId, CartItemRequest cartItemRequest) {

    }

    @Override
    public Cart getCartByUserId(Long userId) {
        return null;
    }

    @Override
    public void updateCartItem(Long userId, CartItemRequest cartItemRequest) {

    }

    @Override
    public void removeFromCart(Long userId, Long productId) {

    }

    @Override
    public void clearCart(Long userId) {

    }
}
