package com.highteequeen.highteequeen_backend.controllers;

import com.highteequeen.highteequeen_backend.dtos.ReviewDTO;
import com.highteequeen.highteequeen_backend.entity.User;
import com.highteequeen.highteequeen_backend.responses.ReviewResponse;
import com.highteequeen.highteequeen_backend.services.impl.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("${api.prefix}/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("")
    public ResponseEntity<List<ReviewResponse>> getAllComments(
            @RequestParam(value = "user_id", required = false) Long userId,
            @RequestParam("product_id") Long productId
    ) {
        List<ReviewResponse> reviewResponses;
        if (userId == null) {
            reviewResponses = reviewService.getCommentsByProduct(productId);
        } else {
            reviewResponses = reviewService.getCommentsByUserAndProduct(userId, productId);
        }
        return ResponseEntity.ok(reviewResponses);
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<?> updateComment(
            @PathVariable("id") Long commentId,
            @Valid @RequestBody ReviewDTO commentDTO
    ) {
        try {
            User loginUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (!Objects.equals(loginUser.getId(), commentDTO.getUserId())) {
                return ResponseEntity.badRequest().body("You cannot update another user's comment");
            }
            reviewService.updateComment(commentId, commentDTO);
            return ResponseEntity.ok("Update comment successfully");
        } catch (Exception e) {
            // Handle and log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during comment update.");
        }
    }
    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<?> insertComment(
            @Valid @RequestBody ReviewDTO reviewDTO
    ) {
        try {
            // Insert the new comment
            User loginUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(loginUser.getId() != reviewDTO.getUserId()) {
                return ResponseEntity.badRequest().body("You cannot comment as another user");
            }
            reviewService.insertComment(reviewDTO);
            return ResponseEntity.ok("Insert comment successfully");
        } catch (Exception e) {
            // Handle and log the exception
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("An error occurred during comment insertion.");
        }
    }
}
