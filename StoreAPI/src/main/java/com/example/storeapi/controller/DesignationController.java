package com.example.storeapi.controller;

import com.example.storeapi.dto.DesignationDto;
import com.example.storeapi.service.DesignationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employees/designations")
public class DesignationController {

    private final DesignationService designationService;

    @GetMapping
    @PreAuthorize("hasAuthority('Employees-Read')")
    public List<DesignationDto> getAllDesignations() {
        return designationService.getAllDesignations();
    }
}
