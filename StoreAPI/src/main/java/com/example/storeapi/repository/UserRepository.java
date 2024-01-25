package com.example.storeapi.repository;

import com.example.storeapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmployeeEmpNo(String username);

    boolean existsByUsername(String username);

    boolean existsByPassword(String password);
}