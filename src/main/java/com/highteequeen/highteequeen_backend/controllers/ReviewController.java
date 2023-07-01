package com.highteequeen.highteequeen_backend.controllers;

import com.highteequeen.highteequeen_backend.dto.ReviewDto;
import com.highteequeen.highteequeen_backend.model.Review;
import com.highteequeen.highteequeen_backend.repository.ReviewRepository;
import com.highteequeen.highteequeen_backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/addReview")
    public ResponseEntity<?> addReview(@Valid @RequestBody ReviewDto reviewDto) {
        ReviewDto savedReview = reviewService.addReview(reviewDto);
        if (savedReview != null) {
            return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Unable to add review", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewDto>> getAllReviewsByProductId(@PathVariable Long productId) {
        List<ReviewDto> reviews = reviewService.findReviewByProductId(productId);
        if (reviews.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(reviews);
        }
    }
}
