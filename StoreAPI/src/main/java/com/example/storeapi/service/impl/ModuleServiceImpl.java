package com.example.storeapi.service.impl;

import com.example.storeapi.dto.ModuleDto;
import com.example.storeapi.repository.ModuleRepository;
import com.example.storeapi.service.ModuleService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModuleServiceImpl implements ModuleService {

    private final ModuleRepository moduleRepository;

    @Override
    public List<ModuleDto> getAllModules() {
        return moduleRepository.findAll().stream()
                .map(ObjectMapper.Map::moduleToDto)
                .collect(Collectors.toList());
    }
}
