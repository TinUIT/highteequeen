package com.highteequeen.highteequeen_backend.service;

import com.highteequeen.highteequeen_backend.dto.OrderDetailDto;
import com.highteequeen.highteequeen_backend.dto.ProductOrderDto;
import com.highteequeen.highteequeen_backend.model.Customer;
import com.highteequeen.highteequeen_backend.model.OrderDetail;
import com.highteequeen.highteequeen_backend.model.Product;
import com.highteequeen.highteequeen_backend.model.ProductOrder;
import com.highteequeen.highteequeen_backend.repository.CustomerRepository;
import com.highteequeen.highteequeen_backend.repository.OrderRepository;
import com.highteequeen.highteequeen_backend.repository.ProductOrderRepository;
import com.highteequeen.highteequeen_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ProductOrderService {

    @Autowired
    private ProductOrderRepository productOrderRepository;
    @Autowired
    private  ProductRepository productRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private OrderRepository orderRepository;

    public ProductOrder createOrder(ProductOrderDto productOrderDto) throws ChangeSetPersister.NotFoundException {
        Double total = 0.0;
        Customer customer = customerRepository.findById(productOrderDto.getCustomerId())
                .orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        List<OrderDetail> orderDetails = new ArrayList<>();
        ProductOrder productOrder = new ProductOrder();
        productOrder.setCustomer(customer);
        productOrder.setPaymentMethod(productOrderDto.getPaymentMethod());
        productOrder.setRecipientPhone(productOrderDto.getRecipientPhone());
        productOrder.setStatus(productOrderDto.getStatus());
        productOrder.setShippingAddress(productOrderDto.getShippingAddress());
        productOrder.setRecipientName(customer.getFullName());
        productOrder.setOrderDate(LocalDateTime.now());

        ProductOrder productOrderSave = productOrderRepository.save(productOrder);

        for(OrderDetailDto orderDetailDto: productOrderDto.getOrderDetails()) {
            Product product = productRepository.findById(orderDetailDto.getProductId())
                    .orElseThrow(() -> new ChangeSetPersister.NotFoundException());
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setProduct(product);
            orderDetail.setQuantity(orderDetailDto.getQuantity());
            orderDetail.setSubtotal(orderDetailDto.getSubtotal());
            orderDetail.setOrder(productOrder);
            orderDetails.add(orderDetail);
            orderRepository.save(orderDetail);
            total += orderDetailDto.getSubtotal();
        }
        productOrderSave.setOrderDetails(orderDetails);
        productOrderSave.setTotal(total);
        productOrderRepository.save(productOrderSave);
        return productOrder;
    }

    public List<ProductOrder> getAllOrders() {
        return productOrderRepository.findAll();
    }

    public ProductOrderDto updateStatus (Long id, String status) throws ChangeSetPersister.NotFoundException {
        ProductOrderDto productOrderDto = new ProductOrderDto();
        ProductOrder productOrder = productOrderRepository.findById(id)
                .orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        productOrder.setStatus(status);
        productOrderRepository.save(productOrder);
        return productOrderDto;
    }
}

