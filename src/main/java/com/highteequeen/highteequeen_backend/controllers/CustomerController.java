package com.highteequeen.highteequeen_backend.controllers;

import com.highteequeen.highteequeen_backend.dto.CustomerDto;
import com.highteequeen.highteequeen_backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PutMapping("/{id}")
    public ResponseEntity<CustomerDto> updateCustomer(@PathVariable Integer id, @Valid @RequestBody CustomerDto customerDto) throws ChangeSetPersister.NotFoundException {
        CustomerDto updatedCustomerDto = customerService.updateCustomer(id, customerDto);
        return new ResponseEntity<>(updatedCustomerDto, HttpStatus.OK);
    }
}
