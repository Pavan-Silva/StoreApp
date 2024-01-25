package com.example.storeapi.service.impl;

import com.example.storeapi.dto.SupplierDto;
import com.example.storeapi.exception.ResourceNotFoundException;
import com.example.storeapi.model.Supplier;
import com.example.storeapi.repository.SupplierRepository;
import com.example.storeapi.service.SupplierService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    @Override
    public List<SupplierDto> getAll(HashMap<String, String> params) {
        return supplierRepository.findAll().stream()
                .map(ObjectMapper.Map::supplierToDto)
                .collect(Collectors.toList());
    }

    @Override
    public SupplierDto findById(int id) {
        return ObjectMapper.Map.supplierToDto(supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found")));
    }

    @Override
    public SupplierDto update(SupplierDto supplierDto) {
        supplierRepository.findById(supplierDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid supplier id"));

        Supplier supplier = ObjectMapper.Map.dtoToSupplier(supplierDto);
        return ObjectMapper.Map.supplierToDto(supplierRepository.save(supplier));
    }

    @Override
    public SupplierDto save(SupplierDto supplierDto) {
        Supplier supplier = ObjectMapper.Map.dtoToSupplier(supplierDto);
        return ObjectMapper.Map.supplierToDto(supplierRepository.save(supplier));
    }

    @Override
    public void deleteById(int id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid supplier id"));

        supplierRepository.delete(supplier);
    }
}
