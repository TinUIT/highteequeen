package com.highteequeen.highteequeen_backend.service;

import com.highteequeen.highteequeen_backend.dto.CustomerDto;
import com.highteequeen.highteequeen_backend.dto.OrderDetailDto;
import com.highteequeen.highteequeen_backend.dto.ProductOrderDto;
import com.highteequeen.highteequeen_backend.model.Customer;
import com.highteequeen.highteequeen_backend.model.OrderDetail;
import com.highteequeen.highteequeen_backend.model.ProductOrder;
import com.highteequeen.highteequeen_backend.model.User;
import com.highteequeen.highteequeen_backend.repository.CustomerRepository;
import com.highteequeen.highteequeen_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    public CustomerDto updateCustomer(Integer id, CustomerDto customerDto) throws ChangeSetPersister.NotFoundException {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ChangeSetPersister.NotFoundException());

        customer.setFullName(customerDto.getFullName());
        customer.setAddress(customerDto.getAddress());
        customer.setEmail(customerDto.getEmail());
        customer.setPhone(customerDto.getPhone());
        if((customerDto.getImage() != "")&&(customerDto.getImage() != null))
            customer.setImage(customerDto.getImage());

        Customer updatedCustomer = customerRepository.save(customer);

        Optional<User> user = userRepository.findById(customer.getUser().getUserId());
        User updatedUser = user.get();
        updatedUser.setEmail(customerDto.getEmail());
        userRepository.save(updatedUser);

        CustomerDto updatedCustomerDto = new CustomerDto();
        updatedCustomerDto.setCustomerId(updatedCustomer.getCustomerId());
        updatedCustomerDto.setEmail(updatedCustomer.getEmail());
        updatedCustomerDto.setFullName(updatedCustomer.getFullName());
        updatedCustomerDto.setAddress(updatedCustomer.getAddress());
        updatedCustomerDto.setPhone(updatedCustomer.getPhone());
        updatedCustomerDto.setImage(updatedCustomer.getImage());

        List<ProductOrderDto> ordersDto = new ArrayList<>();
        for (ProductOrder order : updatedCustomer.getOrders()) {
            ProductOrderDto orderDto = new ProductOrderDto();

            List<OrderDetailDto> details = new ArrayList<>();
            for (OrderDetail detail : order.getOrderDetails()) {
                OrderDetailDto orderDetailDto = new OrderDetailDto();
                orderDetailDto.setProductName(detail.getProduct().getName());
                orderDetailDto.setQuantity(detail.getQuantity());
                orderDetailDto.setImage(detail.getProduct().getImage());
                orderDetailDto.setSubtotal(detail.getSubtotal());

                details.add(orderDetailDto);
            }

            orderDto.setOrderDetails(details);
            ordersDto.add(orderDto);
        }

        updatedCustomerDto.setOrders(ordersDto);

        return updatedCustomerDto;
    }
}
