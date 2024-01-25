package com.example.storeapi.repository;

import com.example.storeapi.model.RevokedToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface RevokedTokenRepository extends JpaRepository<RevokedToken, Integer> {

    boolean existsByToken(String token);

    List<RevokedToken> findAllByExpirationDateBefore(Instant now);
}