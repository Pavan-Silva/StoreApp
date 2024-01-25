package com.example.storeapi.controller;

import com.example.storeapi.dto.SupplierDto;
import com.example.storeapi.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/suppliers")
public class SupplierController {

    private final SupplierService supplierService;

    @GetMapping
    @PreAuthorize("hasAuthority('Suppliers-Read')")
    public List<SupplierDto> getAllOrders(@RequestParam HashMap<String, String> params) {
        return supplierService.getAll(params);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('Suppliers-Read')")
    public SupplierDto getOrderById(@PathVariable Integer id) {
        return supplierService.findById(id);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('Suppliers-Write')")
    public SupplierDto saveOrder(@RequestBody SupplierDto supplierDto) {
        return supplierService.save(supplierDto);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('Suppliers-Update')")
    public SupplierDto updateOrder(@RequestBody SupplierDto supplierDto) {
        return supplierService.update(supplierDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('Suppliers-Delete')")
    public void deleteOrderById(@PathVariable Integer id) {
        supplierService.deleteById(id);
    }
}
