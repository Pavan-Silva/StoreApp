package com.example.storeapi.service.impl;

import com.example.storeapi.dto.DesignationDto;
import com.example.storeapi.repository.DesignationRepository;
import com.example.storeapi.service.DesignationService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DesignationServiceImpl implements DesignationService {

    private final DesignationRepository designationRepository;

    @Override
    public List<DesignationDto> getAllDesignations() {
        return designationRepository.findAll().stream()
                .map(ObjectMapper.Map::designationToDto)
                .collect(Collectors.toList());
    }
}
