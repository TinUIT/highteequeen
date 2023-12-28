package com.highteequeen.highteequeen_backend.services.impl;

import com.highteequeen.highteequeen_backend.dtos.ReviewDTO;
import com.highteequeen.highteequeen_backend.entity.Product;
import com.highteequeen.highteequeen_backend.entity.Review;
import com.highteequeen.highteequeen_backend.entity.User;
import com.highteequeen.highteequeen_backend.exeptions.DataNotFoundException;
import com.highteequeen.highteequeen_backend.repositories.ProductRepository;
import com.highteequeen.highteequeen_backend.repositories.ReviewRepository;
import com.highteequeen.highteequeen_backend.repositories.UserRepository;
import com.highteequeen.highteequeen_backend.responses.ReviewResponse;
import com.highteequeen.highteequeen_backend.services.IReviewService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReviewService implements IReviewService{
    private final ReviewRepository commentRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    @Override
    @Transactional
    public Review insertComment(ReviewDTO commentDTO) {
        User user = userRepository.findById(commentDTO.getUserId()).orElse(null);
        Product product = productRepository.findById(commentDTO.getProductId()).orElse(null);
        if (user == null || product == null) {
            throw new IllegalArgumentException("User or product not found");
        }
        Review newComment = Review.builder()
                .user(user)
                .product(product)
                .content(commentDTO.getContent())
                .build();
        return commentRepository.save(newComment);
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    @Override
    @Transactional
    public void updateComment(Long id, ReviewDTO commentDTO) throws DataNotFoundException {
        Review existingComment = commentRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Review not found"));
        existingComment.setContent(commentDTO.getContent());
        commentRepository.save(existingComment);
    }

    @Override
    public List<ReviewResponse> getCommentsByUserAndProduct(Long userId, Long productId) {
        List<Review> comments = commentRepository.findByUserIdAndProductId(userId, productId);
        return comments.stream()
                .map(comment -> ReviewResponse.fromComment(comment))
                .collect(Collectors.toList());
    }

    @Override
    public List<ReviewResponse> getCommentsByProduct(Long productId) {
        List<Review> comments = commentRepository.findByProductId(productId);
        return comments.stream()
                .map(comment -> ReviewResponse.fromComment(comment))
                .collect(Collectors.toList());
    }

}