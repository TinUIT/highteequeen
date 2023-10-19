package com.highteequeen.highteequeen_backend.dtos;

import lombok.*;
import jakarta.validation.constraints.NotEmpty;

@Data//toString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {
    @NotEmpty(message = "Category's name cannot be empty")
    private String name;
}
