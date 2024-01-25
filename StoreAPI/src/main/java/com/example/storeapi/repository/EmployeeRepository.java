package com.example.storeapi.repository;

import com.example.storeapi.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    Optional<Employee> findByEmpNo(String empNo);

    Optional<Employee> findByNic(String nic);
}