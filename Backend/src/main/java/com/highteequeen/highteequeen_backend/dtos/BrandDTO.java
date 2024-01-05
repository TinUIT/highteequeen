package com.highteequeen.highteequeen_backend.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BrandDTO {
    @NotEmpty(message = "Brand's name cannot be empty")
    private String name;
}
