package com.highteequeen.highteequeen_backend.services;

import com.highteequeen.highteequeen_backend.dtos.OrderDetailDTO;
import com.highteequeen.highteequeen_backend.entity.OrderDetail;
import com.highteequeen.highteequeen_backend.exeptions.DataNotFoundException;

import java.util.List;

public interface IOrderDetailService {
    OrderDetail createOrderDetail(OrderDetailDTO newOrderDetail) throws Exception;
    OrderDetail getOrderDetail(Long id) throws DataNotFoundException;
    OrderDetail updateOrderDetail(Long id, OrderDetailDTO newOrderDetailData)
            throws DataNotFoundException;
    void deleteById(Long id);
    List<OrderDetail> findByOrderId(Long orderId);


}

