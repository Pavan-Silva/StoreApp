package com.example.storeapi.controller;

import com.example.storeapi.dto.AuthorityDto;
import com.example.storeapi.service.AuthorityService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/authorities")
public class AuthorityController {

    private final AuthorityService authorityService;

    @GetMapping
    @PreAuthorize("hasAuthority('Admin-Read')")
    public List<AuthorityDto> getAllAuthorities() {
        return authorityService.getAllAuthorities();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('Admin-Write')")
    public AuthorityDto saveAuthority(@RequestBody AuthorityDto authorityDto) {
        return authorityService.saveAuthority(authorityDto);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('Admin-Update')")
    public AuthorityDto updateAuthority(@RequestBody AuthorityDto authorityDto) {
        return authorityService.updateAuthority(authorityDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('Admin-Delete')")
    public void deleteAuthorityById(@PathVariable int id) {
        authorityService.deleteAuthority(id);
    }
}
