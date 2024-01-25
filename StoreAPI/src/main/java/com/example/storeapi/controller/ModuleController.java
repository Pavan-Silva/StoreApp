package com.example.storeapi.controller;

import com.example.storeapi.dto.ModuleDto;
import com.example.storeapi.service.ModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/modules")
public class ModuleController {

    private final ModuleService moduleService;

    @GetMapping
    @PreAuthorize("hasAuthority('Admin-Read')")
    public List<ModuleDto> getAllModules() {
        return moduleService.getAllModules();
    }
}
