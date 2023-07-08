package com.highteequeen.highteequeen_backend.service;

import com.highteequeen.highteequeen_backend.model.Customer;
import com.highteequeen.highteequeen_backend.model.Favorite;
import com.highteequeen.highteequeen_backend.model.Product;
import com.highteequeen.highteequeen_backend.repository.CustomerRepository;
import com.highteequeen.highteequeen_backend.repository.FavoriteRepository;
import com.highteequeen.highteequeen_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private FavoriteRepository favoriteRepository;

    public Favorite addFavorite(Integer customerId, Long productId) {
        Favorite favorite = favoriteRepository.findByCustomerId(customerId);
        List<Product> products = new ArrayList<>();
        if(favorite == null){
            Optional<Customer> customer = customerRepository.findById(customerId);
            favorite = new Favorite();
            favorite.setCustomer(customer.get());
        } else {
            products = favorite.getProducts();
        }

        Optional<Product> product = productRepository.findById(productId);
        products.add(product.get());
        favorite.setProducts(products);
        favoriteRepository.save(favorite);
        return favorite;
    }
}

