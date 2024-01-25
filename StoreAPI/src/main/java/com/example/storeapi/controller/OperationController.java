package com.example.storeapi.controller;

import com.example.storeapi.dto.OperationDto;
import com.example.storeapi.service.OperationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/operations")
public class OperationController {

    private final OperationService operationService;

    @GetMapping
    @PreAuthorize("hasAuthority('Admin-Read')")
    public List<OperationDto> getAllOperations() {
        return operationService.getAllOperations();
    }
}
