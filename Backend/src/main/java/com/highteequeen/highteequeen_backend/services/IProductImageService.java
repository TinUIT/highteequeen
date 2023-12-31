package com.highteequeen.highteequeen_backend.services;

import com.highteequeen.highteequeen_backend.entity.ProductImage;

public interface IProductImageService {
    ProductImage deleteProductImage(Long id) throws Exception;
}
