package com.example.storeapi.controller;

import com.example.storeapi.dto.GenderDto;
import com.example.storeapi.service.GenderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employees/genders")
public class GenderController {

    private final GenderService genderService;

    @GetMapping
    @PreAuthorize("hasAuthority('Employees-Read')")
    public List<GenderDto> getAll() {
        return genderService.getAllGenders();
    }
}
