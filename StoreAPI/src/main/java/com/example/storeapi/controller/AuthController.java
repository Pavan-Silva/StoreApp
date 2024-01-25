package com.example.storeapi.controller;

import com.example.storeapi.dto.request.LoginRequest;
import com.example.storeapi.dto.response.AuthResponse;
import com.example.storeapi.dto.response.AuthUser;
import com.example.storeapi.security.AuthService;
import com.example.storeapi.security.CookieProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${jwt.expiration.ms}")
    int jwtExpirationMs;

    @Value("${refresh.token.expiration.ms}")
    int refreshTokenExpirationMs;

    private final AuthService authService;
    private final CookieProvider cookieProvider;

    @PostMapping("/login")
    public ResponseEntity<AuthUser> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        AuthResponse auth = authService.login(request);
        response.addCookie(cookieProvider.createAuthCookie(auth.getAccessToken()));
        response.addCookie(cookieProvider.createRefreshCookie(auth.getRefreshToken()));

        return ResponseEntity.ok(auth.getAuthUser());
    }

    @GetMapping("/refresh")
    public void refresh(HttpServletRequest request, HttpServletResponse response) {
        Cookie refreshCookie = WebUtils.getCookie(request, "StoreApp-refreshToken");

        if (refreshCookie != null) {
            AuthResponse authResponse = authService.refreshToken(refreshCookie.getValue());
            response.addCookie(cookieProvider.createAuthCookie(authResponse.getAccessToken()));
        }
    }
}