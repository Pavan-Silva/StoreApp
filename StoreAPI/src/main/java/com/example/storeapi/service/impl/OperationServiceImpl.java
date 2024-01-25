package com.example.storeapi.service.impl;

import com.example.storeapi.dto.OperationDto;
import com.example.storeapi.repository.OperationRepository;
import com.example.storeapi.service.OperationService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OperationServiceImpl implements OperationService {

    private final OperationRepository operationRepository;

    @Override
    public List<OperationDto> getAllOperations() {
        return operationRepository.findAll().stream()
                .map(ObjectMapper.Map::operationToDto)
                .collect(Collectors.toList());
    }
}
