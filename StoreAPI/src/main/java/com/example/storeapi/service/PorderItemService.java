package com.example.storeapi.service;

import com.example.storeapi.dto.PorderItemDto;

import java.util.HashMap;
import java.util.List;

public interface PorderItemService {

    List<PorderItemDto> getAll(HashMap<String, String> params);

    PorderItemDto findById(int id);

    PorderItemDto update(PorderItemDto porderItemDto);

    PorderItemDto save(PorderItemDto porderItemDto);

    void deleteById(int id);
}
