package com.example.storeapi.service;

import com.example.storeapi.dto.ItemDto;

import java.util.HashMap;
import java.util.List;

public interface ItemService {

    List<ItemDto> getAll(HashMap<String, String> params);

    ItemDto findById(int id);

    ItemDto update(ItemDto itemDto);

    ItemDto save(ItemDto itemDto);

    void deleteById(int id);
}
