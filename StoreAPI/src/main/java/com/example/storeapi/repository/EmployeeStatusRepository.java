package com.example.storeapi.repository;

import com.example.storeapi.model.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeStatusRepository extends JpaRepository<EmployeeStatus, Integer> {
}