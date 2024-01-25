package com.example.storeapi.controller;

import com.example.storeapi.dto.UserStatusDto;
import com.example.storeapi.service.UserStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/status")
public class UserStatusController {

    private final UserStatusService userStatusService;

    @GetMapping
    @PreAuthorize("hasAuthority('Users-Read')")
    public List<UserStatusDto> getAllUserStatuses() {
        return userStatusService.getAllUserStatuses();
    }
}
