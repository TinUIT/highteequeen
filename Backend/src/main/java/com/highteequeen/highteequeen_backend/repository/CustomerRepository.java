package com.highteequeen.highteequeen_backend.repository;

import com.highteequeen.highteequeen_backend.entity.Customer;
import com.highteequeen.highteequeen_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    // Custom query methods

    Customer findByUser(User user);
}
