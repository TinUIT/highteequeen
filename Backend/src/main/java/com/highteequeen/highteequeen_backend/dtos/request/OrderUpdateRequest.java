package com.highteequeen.highteequeen_backend.dtos.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.highteequeen.highteequeen_backend.dtos.CartItemDTO;
import jakarta.validation.constraints.Min;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderUpdateRequest {

    @JsonProperty("user_id")
    @Min(value = 1, message = "User's ID must be > 0")
    private Long userId;

    private String status;


}
