package com.example.storeapi.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    String accessToken;
    String refreshToken;
    AuthUser authUser;
}
