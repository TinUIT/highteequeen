package com.highteequeen.highteequeen_backend.service;

import com.highteequeen.highteequeen_backend.dto.CustomerDto;
import com.highteequeen.highteequeen_backend.model.Customer;
import com.highteequeen.highteequeen_backend.model.User;
import com.highteequeen.highteequeen_backend.repository.CustomerRepository;
import com.highteequeen.highteequeen_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    public CustomerDto updateCustomer(Integer id, CustomerDto customerDto) throws ChangeSetPersister.NotFoundException {
        // Find the customer to be updated
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ChangeSetPersister.NotFoundException());

        // Update the customer's information
        customer.setFullName(customerDto.getFullName());
        customer.setAddress(customerDto.getAddress());
        customer.setEmail(customerDto.getEmail());
        customer.setPhone(customerDto.getPhone());
        if(customer.getImage() != "")
            customer.setImage(customerDto.getImage());

        // Save the updated customer
        Customer updatedCustomer = customerRepository.save(customer);

        Optional<User> user = userRepository.findById(customer.getUser().getUserId());
        User updatedUser = user.get();
        updatedUser.setEmail(customerDto.getEmail());
        userRepository.save(updatedUser);


        // Convert the updated customer entity to a DTO
        CustomerDto updatedCustomerDto = new CustomerDto();
        updatedCustomerDto.setCustomerId(updatedCustomer.getCustomerId());
        updatedCustomerDto.setEmail(updatedCustomer.getEmail());
        updatedCustomerDto.setFullName(updatedCustomer.getFullName());
        updatedCustomerDto.setAddress(updatedCustomer.getAddress());
        updatedCustomerDto.setPhone(updatedCustomer.getPhone());
        updatedCustomerDto.setImage(updatedCustomer.getImage());

        return updatedCustomerDto;
    }
}
