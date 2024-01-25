package com.example.storeapi.util;

import com.example.storeapi.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RevokedTokenCleanupTask {

    private final JwtService jwtService;

    @Scheduled(cron = "0 0 0 * * ?")
    public void cleanupExpiredTokens() {
        jwtService.deleteExpiredRevokedTokens();
    }
}