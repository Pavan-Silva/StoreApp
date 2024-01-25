package com.example.storeapi.service;

import com.example.storeapi.dto.PorderStatusDto;

import java.util.HashMap;
import java.util.List;

public interface PorderStatusService {

    List<PorderStatusDto> getAll(HashMap<String, String> params);

    PorderStatusDto findById(int id);

    PorderStatusDto update(PorderStatusDto porderStatusDto);

    PorderStatusDto save(PorderStatusDto porderStatusDto);

    void deleteById(int id);
}
