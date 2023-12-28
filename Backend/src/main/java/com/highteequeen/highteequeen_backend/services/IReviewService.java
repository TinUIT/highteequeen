package com.highteequeen.highteequeen_backend.services;

import com.highteequeen.highteequeen_backend.dtos.ReviewDTO;
import com.highteequeen.highteequeen_backend.entity.Review;
import com.highteequeen.highteequeen_backend.exeptions.DataNotFoundException;
import com.highteequeen.highteequeen_backend.responses.ReviewResponse;

import java.util.List;

public interface IReviewService {
    Review insertComment(ReviewDTO comment);

    void deleteComment(Long commentId);
    void updateComment(Long id, ReviewDTO commentDTO) throws DataNotFoundException;

    List<ReviewResponse> getCommentsByUserAndProduct(Long userId, Long productId);
    List<ReviewResponse> getCommentsByProduct(Long productId);
}
