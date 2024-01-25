package com.example.storeapi.repository;

import com.example.storeapi.model.PorderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PorderStatusRepository extends JpaRepository<PorderStatus, Integer> {
}