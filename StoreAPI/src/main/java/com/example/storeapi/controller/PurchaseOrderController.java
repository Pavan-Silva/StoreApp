package com.example.storeapi.controller;

import com.example.storeapi.dto.PurchaseOrderDto;
import com.example.storeapi.service.PurchaseOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/purchase-orders")
public class PurchaseOrderController {

    private final PurchaseOrderService purchaseOrderService;

    @GetMapping
    @PreAuthorize("hasAuthority('PurchaseOrders-Read')")
    public List<PurchaseOrderDto> getAllOrders(@RequestParam HashMap<String, String> params) {
        return purchaseOrderService.getAll(params);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('PurchaseOrders-Read')")
    public PurchaseOrderDto getOrderById(@PathVariable Integer id) {
        return purchaseOrderService.findById(id);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('PurchaseOrders-Write')")
    public PurchaseOrderDto saveOrder(@RequestBody PurchaseOrderDto purchaseOrderDto) {
        return purchaseOrderService.save(purchaseOrderDto);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('PurchaseOrders-Update')")
    public PurchaseOrderDto updateOrder(@RequestBody PurchaseOrderDto purchaseOrderDto) {
        return purchaseOrderService.update(purchaseOrderDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('PurchaseOrders-Delete')")
    public void deleteOrderById(@PathVariable Integer id) {
        purchaseOrderService.deleteById(id);
    }
}
