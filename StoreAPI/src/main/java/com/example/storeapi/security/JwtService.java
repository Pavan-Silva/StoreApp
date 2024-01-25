package com.example.storeapi.security;

import com.example.storeapi.dto.TokenDto;
import com.example.storeapi.dto.UserDto;
import com.example.storeapi.exception.AuthenticationException;
import com.example.storeapi.model.RevokedToken;
import com.example.storeapi.repository.RevokedTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${jwt.secret.key}")
    String jwtSecretKey;

    @Value("${jwt.expiration.ms}")
    Long jwtExpirationMs;

    @Value("${refresh.token.expiration.ms}")
    Long refreshTokenExpirationMs;

    private final RevokedTokenRepository revokedTokenRepository;

    public boolean notRevokedToken(String token) {
        return !revokedTokenRepository.existsByToken(token);
    }

    public void revokeTokens(TokenDto tokens) {
        if (!tokens.getAccessToken().isEmpty()) {
            RevokedToken accessToken = RevokedToken.builder()
                    .token(tokens.getAccessToken())
                    .expirationDate(getTokenExpirationDate(tokens.getAccessToken()).toInstant())
                    .build();

            revokedTokenRepository.save(accessToken);
        }

        if (!tokens.getRefreshToken().isEmpty()) {
            RevokedToken refreshToken = RevokedToken.builder()
                    .token(tokens.getRefreshToken())
                    .expirationDate(getTokenExpirationDate(tokens.getRefreshToken()).toInstant())
                    .build();

            revokedTokenRepository.save(refreshToken);
        }
    }

    public void deleteExpiredRevokedTokens() {
        List<RevokedToken> expiredTokens = revokedTokenRepository.findAllByExpirationDateBefore(Instant.now());
        revokedTokenRepository.deleteAll(expiredTokens);
    }

    public String generateAccessToken(UserDto user) {
        return generateToken(jwtExpirationMs, new HashMap<>(), user);
    }

    public String generateRefreshToken(UserDto user) {
        return generateToken(refreshTokenExpirationMs, new HashMap<>(), user);
    }

    public boolean isTokenValid(String token, UserDto user) {
        final String userName = extractUsername(token);
        return (userName.equals(user.getUsername())) && !isTokenExpired(token);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        final Claims claims = extractAllClaims(token);
        return claimsResolvers.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts
                    .parser()
                    .verifyWith((SecretKey) getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

        } catch (SignatureException e) {
            throw new AuthenticationException(e.getMessage());
        }
    }

    private String generateToken(Long expiration,Map<String,Object> extraClaims, UserDto user) {
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();
    }

    private boolean isTokenExpired(String token) {
        return getTokenExpirationDate(token).before(new Date());
    }

    private Date getTokenExpirationDate(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
