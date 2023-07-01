package com.highteequeen.highteequeen_backend.service;

import com.highteequeen.highteequeen_backend.dto.ReviewDto;
import com.highteequeen.highteequeen_backend.model.Customer;
import com.highteequeen.highteequeen_backend.model.Product;
import com.highteequeen.highteequeen_backend.model.Review;
import com.highteequeen.highteequeen_backend.repository.CustomerRepository;
import com.highteequeen.highteequeen_backend.repository.ProductRepository;
import com.highteequeen.highteequeen_backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private  CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ReviewRepository reviewRepository;
    public ReviewDto addReview(ReviewDto reviewDto) {

        Optional<Customer> customer = customerRepository.findById(reviewDto.getCustomerId());
        Optional<Product> product = productRepository.findById(reviewDto.getProductId());

        Review review = new Review();
        review.setCustomer(customer.get());
        review.setProduct(product.get());
        review.setRating(reviewDto.getRating());
        review.setComment(reviewDto.getComment());
        review.setReviewTime(new Date());

        review = reviewRepository.save(review);

        // After saving, you need to convert the saved Review entity back to ReviewDto
        return mapToDto(review);
    }

    public List<ReviewDto> findReviewByProductId(Long productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        List<ReviewDto> reviewDtos = new ArrayList<>();
        for(Review review: reviews) {
            ReviewDto dto = new ReviewDto();
            dto.setProductId(review.getProduct().getProductId());
            dto.setCustomerId(review.getCustomer().getCustomerId());
            dto.setRating(review.getRating());
            dto.setComment(review.getComment());
            dto.setCustomerFullName(review.getCustomer().getFullName());
            reviewDtos.add(dto);
        }
        return reviewDtos;
    }

    private ReviewDto mapToDto(Review review) {
        ReviewDto dto = new ReviewDto();
        dto.setProductId(review.getProduct().getProductId());
        dto.setCustomerId(review.getCustomer().getCustomerId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        // Map additional fields as necessary...

        return dto;
    }

}
