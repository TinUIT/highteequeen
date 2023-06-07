package com.highteequeen.highteequeen_backend.service;

import com.highteequeen.highteequeen_backend.dto.ProductDto;
import com.highteequeen.highteequeen_backend.model.Product;
import com.highteequeen.highteequeen_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

//    public List<Product> findAll() {
//        return productRepository.findAll();
//    }

    public List<Product> findByCategory(String category) {
        return productRepository.findByCategory(category);
    }
    public ProductDto toDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getProductId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        return dto;
    }
    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Product findById(Long id) {
        Optional<Product> product = productRepository.findById(id);

        if (product.isPresent()) {
            return product.get();
        } else {
            // Handle the case where the product is not found.
            // You might want to throw an exception or return null.
            return null;
        }
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public Product update(Long id, Product newProductData) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();

            // Update the existing product with the new product data.
            // You'll need to add the relevant setters to your Product class.
            // For example: existingProduct.setName(newProductData.getName());

            return productRepository.save(existingProduct);
        } else {
            // Handle the case where the product is not found.
            // You might want to throw an exception or return null.
            return null;
        }
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}
