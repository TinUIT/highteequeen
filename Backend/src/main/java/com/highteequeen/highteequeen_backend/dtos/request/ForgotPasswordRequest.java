package com.highteequeen.highteequeen_backend.dtos.request;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ForgotPasswordRequest {
    private String email;
}
