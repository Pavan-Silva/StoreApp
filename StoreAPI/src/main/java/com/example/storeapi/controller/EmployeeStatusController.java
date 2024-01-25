package com.example.storeapi.controller;

import com.example.storeapi.dto.EmployeeStatusDto;
import com.example.storeapi.service.EmployeeStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employees/status")
public class EmployeeStatusController {

    private final EmployeeStatusService employeeStatusService;

    @GetMapping
    @PreAuthorize("hasAuthority('Employees-Read')")
    public List<EmployeeStatusDto> getAll() {
        return employeeStatusService.getAll();
    }
}
