package com.example.storeapi.security;

import com.example.storeapi.dto.TokenDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;

@Service
@RequiredArgsConstructor
public class CustomLogoutHandler implements org.springframework.security.web.authentication.logout.LogoutHandler {

    private final JwtService jwtService;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Cookie accessCookie = WebUtils.getCookie(request, "StoreApp-accessToken");
        Cookie refreshCookie = WebUtils.getCookie(request, "StoreApp-refreshToken");

        if (accessCookie != null && refreshCookie != null) {
            TokenDto tokens = TokenDto.builder()
                    .accessToken(accessCookie.getValue())
                    .refreshToken(refreshCookie.getValue())
                    .build();

            jwtService.revokeTokens(tokens);
        }
    }
}