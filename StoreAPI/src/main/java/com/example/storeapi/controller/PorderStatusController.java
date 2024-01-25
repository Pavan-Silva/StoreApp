package com.example.storeapi.controller;

import com.example.storeapi.dto.PorderStatusDto;
import com.example.storeapi.service.PorderStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/purchase-orders/status")
public class PorderStatusController {

    private final PorderStatusService porderStatusService;

    @GetMapping
    @PreAuthorize("hasAuthority('PurchaseOrders-Read')")
    public List<PorderStatusDto> getAllOrders(@RequestParam HashMap<String, String> params) {
        return porderStatusService.getAll(params);
    }
}
