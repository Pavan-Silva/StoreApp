package com.example.storeapi.service.impl;

import com.example.storeapi.dto.GenderDto;
import com.example.storeapi.repository.GenderRepository;
import com.example.storeapi.service.GenderService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GenderServiceImpl implements GenderService {

    private final GenderRepository genderRepository;

    @Override
    public List<GenderDto> getAllGenders() {
        return genderRepository.findAll().stream()
                .map(ObjectMapper.Map::genderToDto)
                .collect(Collectors.toList());
    }
}
