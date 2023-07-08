package com.highteequeen.highteequeen_backend.controllers;

import com.highteequeen.highteequeen_backend.dto.OrderDetailDto;
import com.highteequeen.highteequeen_backend.dto.ProductDto;
import com.highteequeen.highteequeen_backend.dto.ProductOrderDto;
import com.highteequeen.highteequeen_backend.model.ProductOrder;
import com.highteequeen.highteequeen_backend.service.ProductOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/orders")
public class ProductOrderController {

    @Autowired
    private ProductOrderService productOrderService;

    @PostMapping
    public ResponseEntity<ProductOrderDto> createOrder(@Valid @RequestBody ProductOrderDto productOrder) throws ChangeSetPersister.NotFoundException {
        ProductOrder createdOrder = productOrderService.createOrder(productOrder);

        List<OrderDetailDto> orderDetailDtos = createdOrder.getOrderDetails().stream()
                .map(orderDetail -> new OrderDetailDto(
                        orderDetail.getProduct().getProductId(),
                        orderDetail.getQuantity(),
                        orderDetail.getSubtotal()
                ))
                .collect(Collectors.toList());

        ProductOrderDto order = new ProductOrderDto();
        order.setCustomerId(createdOrder.getCustomer().getCustomerId());
        order.setShippingAddress(createdOrder.getShippingAddress());
        order.setRecipientName(createdOrder.getRecipientName());
        order.setRecipientPhone(createdOrder.getRecipientPhone());
        order.setPaymentMethod(createdOrder.getPaymentMethod());
        order.setTotal(createdOrder.getTotal());
        order.setStatus(createdOrder.getStatus());
        order.setOrderDate(createdOrder.getOrderDate());
        order.setOrderDetails(orderDetailDtos);

        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @GetMapping
    public List<ProductOrderDto> getAllOrders() {
        List<ProductOrderDto> productOrderDtos = new ArrayList<>();
        List<ProductOrder> productOrders = productOrderService.getAllOrders();

        productOrderDtos = productOrders.stream().map(
                productOrder -> {
                    ProductOrderDto productOrderDto = new ProductOrderDto();
                    productOrderDto.setOrderId(productOrder.getOrderId());
                    productOrderDto.setRecipientName(productOrder.getRecipientName());
                    productOrderDto.setEmail(productOrder.getCustomer().getEmail());
                    productOrderDto.setRecipientPhone(productOrder.getRecipientPhone());
                    productOrderDto.setShippingAddress(productOrder.getShippingAddress());
                    productOrderDto.setStatus(productOrder.getStatus());
                    productOrderDto.setTotal(productOrder.getTotal());
                    productOrderDto.setOrderDate(productOrder.getOrderDate());
                    productOrderDto.setOrderDetails(productOrder.getOrderDetails().stream()
                            .map(orderDetail -> {
                                OrderDetailDto orderDetailDto = new OrderDetailDto();
                                orderDetailDto.setProductName(orderDetail.getProduct().getName());
                                orderDetailDto.setProductId(orderDetail.getProduct().getProductId());
                                orderDetailDto.setQuantity(orderDetail.getQuantity());
                                orderDetailDto.setSubtotal(orderDetail.getSubtotal());
                                orderDetailDto.setPrice(orderDetail.getProduct().getPrice());
                                return orderDetailDto;
                            }).collect(Collectors.toList()));
                    return productOrderDto;
                }
        ).collect(Collectors.toList());

        return productOrderDtos;
    }

    @GetMapping("/{id}/{status}")
    public ResponseEntity<?> updateStatus (@PathVariable Long id,@PathVariable String status) throws ChangeSetPersister.NotFoundException {

        ProductOrderDto productOrderDto = productOrderService.updateStatus(id, status);
        return new ResponseEntity<>(productOrderDto, HttpStatus.CREATED);
    }
}

