package com.highteequeen.highteequeen_backend.services;

import com.highteequeen.highteequeen_backend.dtos.OrderDTO;
import com.highteequeen.highteequeen_backend.dtos.request.OrderUpdateRequest;
import com.highteequeen.highteequeen_backend.entity.Order;
import com.highteequeen.highteequeen_backend.exeptions.DataNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderService {
    Order createOrder(OrderDTO orderDTO) throws Exception;
    Order getOrder(Long id);
    Order updateOrder(Long id, OrderDTO orderDTO) throws DataNotFoundException;
    void deleteOrder(Long id);
    List<Order> findByUserId(Long userId);
    Page<Order> getOrdersByKeyword(String keyword, Pageable pageable);

    Order updateOrderStatus(Long id, OrderUpdateRequest statusUpdate) throws DataNotFoundException;
}
