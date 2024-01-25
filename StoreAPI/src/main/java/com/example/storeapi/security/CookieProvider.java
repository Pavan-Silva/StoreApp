package com.example.storeapi.security;

import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CookieProvider {

    @Value("${jwt.expiration.ms}")
    int accessTokenExpirationMs;

    @Value("${refresh.token.expiration.ms}")
    int refreshTokenExpirationMs;

    public Cookie createAuthCookie(String token) {
        Cookie authCookie = new Cookie("StoreApp-accessToken", token);
        authCookie.setSecure(false);
        authCookie.setHttpOnly(true);
        authCookie.setPath("/");
        authCookie.setMaxAge(accessTokenExpirationMs / 1000);

        return authCookie;
    }

    public Cookie createRefreshCookie(String token) {
        Cookie refreshCookie = new Cookie("StoreApp-refreshToken", token);
        refreshCookie.setSecure(false);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/api/auth");
        refreshCookie.setMaxAge(refreshTokenExpirationMs / 1000);

        return refreshCookie;
    }
}
