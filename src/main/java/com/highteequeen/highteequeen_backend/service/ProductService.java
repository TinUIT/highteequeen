package com.highteequeen.highteequeen_backend.service;

import com.highteequeen.highteequeen_backend.dto.ProductDto;
import com.highteequeen.highteequeen_backend.model.Category;
import com.highteequeen.highteequeen_backend.model.Product;
import com.highteequeen.highteequeen_backend.repository.CategoryRepository;
import com.highteequeen.highteequeen_backend.repository.ProductRepository;
import com.highteequeen.highteequeen_backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ReviewRepository reviewRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, ReviewRepository reviewRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.categoryRepository = categoryRepository;
    }

//    public List<Product> findAll() {
//        return productRepository.findAll();
//    }

    public Page<Product> findByCategory(String category, Pageable pageable) {
        return productRepository.findByCategory(category, pageable);
    }

    public Page<Product> findByBestSellingProducts(Pageable pageable) {
        return productRepository.findTopSellProducts(pageable);
    }

    public List<Product> getTop8BestSellingProducts() {
        return productRepository.findTopSellProducts(PageRequest.of(0, 8)).getContent();
    }

    public Page<Product> findByTopSalesProducts(Pageable pageable) {
        return productRepository.findTopSalesProducts(pageable);
    }
    public List<Product> findTop8BySales() {
        return productRepository.findTopSalesProducts(PageRequest.of(0, 8)).getContent();
    }

    public Page<Product> findByHighPriceProducts(Pageable pageable) {
        return productRepository.findHighPriceProducts(pageable);
    }

    public Page<Product> findByLowPriceProducts(Pageable pageable) {
        return productRepository.findLowPriceProducts(pageable);
    }

    public List<Product> findBestBrandProduct() {
        return productRepository.findProductsOfTopTwoBrandsBySoldMost(PageRequest.of(0, 8)).getContent();
    }
    public List<Product> findByName(String name) {
        return productRepository.findByName(name, PageRequest.of(0, 4));
    }

    public Double getAverageRating(Long productId) {
        return reviewRepository.findAverageRatingByProductId(productId);
    }
    public ProductDto toDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getProductId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setImage(product.getImage());
        dto.setBrand(product.getBrand());
        dto.setOrigin(product.getOrigin());
        dto.setCategoryName(product.getCategory().getName());
        dto.setDescription(product.getDescription());
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

    public Product addProduct(ProductDto productDTO) {
        Category category = categoryRepository.findByName(productDTO.getCategoryName());
        if (category == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Category not found"
            );
        }
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setBrand(productDTO.getBrand());
        product.setImage(productDTO.getImage());
        product.setPrice(productDTO.getPrice());
        product.setDescription(productDTO.getDescription());
        product.setCategory(category);
        product.setOrigin(productDTO.getOrigin());
        return productRepository.save(product);
    }


    public Product updateProduct(Long id, Product updatedProduct) {
        // Fetch the product from the database
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (!optionalProduct.isPresent()) {
            // Handle case where product is not found
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Category not found"
            );
        }

        // Get the product from the Optional
        Product product = optionalProduct.get();

        // Update the product's fields
        product.setName(updatedProduct.getName());
        product.setBrand(updatedProduct.getBrand());
        product.setDescription(updatedProduct.getDescription());
        product.setImage(updatedProduct.getImage());
        product.setPrice(updatedProduct.getPrice());
        product.setOrigin(updatedProduct.getOrigin());

        // Save the updated product to the database
        productRepository.save(product);

        return product;
    }


    public void deleteProductByName(Long id) {
        Optional<Product> product = productRepository.findById(id);
        product.ifPresent(productRepository::delete);
    }
}
