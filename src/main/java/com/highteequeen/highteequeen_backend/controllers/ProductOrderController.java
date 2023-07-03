package com.highteequeen.highteequeen_backend.controllers;

import com.highteequeen.highteequeen_backend.dto.ProductOrderDto;
import com.highteequeen.highteequeen_backend.model.ProductOrder;
import com.highteequeen.highteequeen_backend.service.ProductOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/orders")
public class ProductOrderController {

    @Autowired
    private ProductOrderService productOrderService;

    @PostMapping
    public ResponseEntity<ProductOrderDto> createOrder(@Valid @RequestBody ProductOrderDto productOrder) {
        ProductOrder createdOrder = productOrderService.createOrder(productOrder);
        ProductOrderDto order = new ProductOrderDto();
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }
}

