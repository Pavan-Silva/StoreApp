package com.example.storeapi.controller;

import com.example.storeapi.dto.PorderItemDto;
import com.example.storeapi.service.PorderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/purchase-orders/items")
public class PorderItemController {

    private final PorderItemService porderItemService;

    @GetMapping
    @PreAuthorize("hasAuthority('PurchaseOrders-Read')")
    public List<PorderItemDto> getAllOrderItems(@RequestParam HashMap<String, String> params) {
        return porderItemService.getAll(params);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('PurchaseOrders-Read')")
    public PorderItemDto getOrderItemById(@PathVariable Integer id) {
        return porderItemService.findById(id);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('PurchaseOrders-Write')")
    public PorderItemDto saveOrder(@RequestBody PorderItemDto porderItemDto) {
        return porderItemService.save(porderItemDto);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('PurchaseOrders-Update')")
    public PorderItemDto updateOrder(@RequestBody PorderItemDto porderItemDto) {
        return porderItemService.update(porderItemDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('PurchaseOrders-Delete')")
    public void deleteOrderById(@PathVariable Integer id) {
        porderItemService.deleteById(id);
    }
}
