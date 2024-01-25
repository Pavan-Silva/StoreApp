package com.example.storeapi.controller;

import com.example.storeapi.dto.ItemDto;
import com.example.storeapi.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/items")
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    @PreAuthorize("hasAuthority('Items-Read')")
    public List<ItemDto> getAllItems(@RequestParam HashMap<String, String> params) {
        return itemService.getAll(params);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('Items-Read')")
    public ItemDto getItemById(@PathVariable Integer id) {
        return itemService.findById(id);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('Items-Write')")
    public ItemDto saveItem(@RequestBody ItemDto itemDto) {
        return itemService.save(itemDto);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('Items-Update')")
    public ItemDto updateItem(@RequestBody ItemDto itemDto) {
        return itemService.update(itemDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('Items-Delete')")
    public void deleteItemById(@PathVariable Integer id) {
        itemService.deleteById(id);
    }
}
