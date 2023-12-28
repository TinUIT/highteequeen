package com.highteequeen.highteequeen_backend.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.highteequeen.highteequeen_backend.entity.Review;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewResponse {
    @JsonProperty("content")
    private String content;

    @JsonProperty("user")
    private UserResponse userResponse;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;
    public static ReviewResponse fromComment(Review review) {
        return ReviewResponse.builder()
                .content(review.getContent())
                .userResponse(UserResponse.fromUser(review.getUser()))
                .updatedAt(review.getUpdatedAt())
                .build();
    }
}
