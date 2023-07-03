package com.highteequeen.highteequeen_backend.service;

import com.highteequeen.highteequeen_backend.dto.ProductOrderDto;
import com.highteequeen.highteequeen_backend.model.ProductOrder;
import com.highteequeen.highteequeen_backend.repository.ProductOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductOrderService {

    @Autowired
    private ProductOrderRepository productOrderRepository;

    public ProductOrder createOrder(ProductOrderDto productOrder) {

        ProductOrder productOrder1 = new ProductOrder();
        return productOrder1;
        //return productOrderRepository.save(productOrder);
    }
}

