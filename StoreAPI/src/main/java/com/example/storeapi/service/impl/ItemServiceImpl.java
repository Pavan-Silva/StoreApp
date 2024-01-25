package com.example.storeapi.service.impl;

import com.example.storeapi.dto.ItemDto;
import com.example.storeapi.exception.ResourceNotFoundException;
import com.example.storeapi.model.Item;
import com.example.storeapi.repository.ItemRepository;
import com.example.storeapi.service.ItemService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService  {

    private final ItemRepository itemRepository;

    @Override
    public List<ItemDto> getAll(HashMap<String, String> params) {
        return itemRepository.findAll().stream()
                .map(ObjectMapper.Map::itemToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ItemDto findById(int id) {
        return ObjectMapper.Map.itemToDto(itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found")));
    }

    @Override
    public ItemDto update(ItemDto itemDto) {
        itemRepository.findById(itemDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid item id"));

        Item item = ObjectMapper.Map.dtoToItem(itemDto);
        return ObjectMapper.Map.itemToDto(itemRepository.save(item));
    }

    @Override
    public ItemDto save(ItemDto itemDto) {
        Item item = ObjectMapper.Map.dtoToItem(itemDto);
        return ObjectMapper.Map.itemToDto(itemRepository.save(item));
    }

    @Override
    public void deleteById(int id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid item id"));

        itemRepository.delete(item);
    }
}
