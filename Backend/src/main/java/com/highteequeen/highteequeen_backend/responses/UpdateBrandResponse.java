package com.highteequeen.highteequeen_backend.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateBrandResponse {
    @JsonProperty("message")
    private String message;
}
