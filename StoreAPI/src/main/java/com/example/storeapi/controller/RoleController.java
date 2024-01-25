package com.example.storeapi.controller;

import com.example.storeapi.dto.RoleDto;
import com.example.storeapi.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/roles")
public class RoleController {

    private final RoleService roleService;

    @GetMapping
    @PreAuthorize("hasAuthority('Users-Read')")
    public List<RoleDto> getAllRoles() {
        return roleService.getAllRoles();
    }
}
