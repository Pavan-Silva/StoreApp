package com.example.storeapi.service.impl;

import com.example.storeapi.dto.PorderStatusDto;
import com.example.storeapi.exception.ResourceNotFoundException;
import com.example.storeapi.model.PorderStatus;
import com.example.storeapi.repository.PorderStatusRepository;
import com.example.storeapi.service.PorderStatusService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PorderStatusServiceImpl implements PorderStatusService {

    private final PorderStatusRepository porderStatusRepository;

    @Override
    public List<PorderStatusDto> getAll(HashMap<String, String> params) {
        return porderStatusRepository.findAll().stream()
                .map(ObjectMapper.Map::porderStatusToDto)
                .collect(Collectors.toList());
    }

    @Override
    public PorderStatusDto findById(int id) {
        return ObjectMapper.Map.porderStatusToDto(porderStatusRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Purchase order status not found")));
    }

    @Override
    public PorderStatusDto update(PorderStatusDto porderStatusDto) {
        porderStatusRepository.findById(porderStatusDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid purchase order status id"));

        PorderStatus porderStatus = ObjectMapper.Map.dtoToPorderStatus(porderStatusDto);
        return ObjectMapper.Map.porderStatusToDto(porderStatusRepository.save(porderStatus));
    }

    @Override
    public PorderStatusDto save(PorderStatusDto porderStatusDto) {
        PorderStatus porderStatus = ObjectMapper.Map.dtoToPorderStatus(porderStatusDto);
        return ObjectMapper.Map.porderStatusToDto(porderStatusRepository.save(porderStatus));
    }

    @Override
    public void deleteById(int id) {
        PorderStatus porderStatus = porderStatusRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid purchase order status id"));

        porderStatusRepository.delete(porderStatus);
    }
}
