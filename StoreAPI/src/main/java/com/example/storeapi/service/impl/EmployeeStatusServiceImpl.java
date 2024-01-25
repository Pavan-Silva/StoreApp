package com.example.storeapi.service.impl;

import com.example.storeapi.dto.EmployeeStatusDto;
import com.example.storeapi.repository.EmployeeStatusRepository;
import com.example.storeapi.service.EmployeeStatusService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeStatusServiceImpl implements EmployeeStatusService {

    private final EmployeeStatusRepository employeeStatusRepository;

    @Override
    public List<EmployeeStatusDto> getAll() {
        return employeeStatusRepository.findAll().stream()
                .map(ObjectMapper.Map::employeeStatusToDto)
                .collect(Collectors.toList());
    }
}
