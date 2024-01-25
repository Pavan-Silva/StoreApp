package com.example.storeapi.service.impl;

import com.example.storeapi.dto.RoleDto;
import com.example.storeapi.repository.RoleRepository;
import com.example.storeapi.service.RoleService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public List<RoleDto> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(ObjectMapper.Map::roleToDto)
                .collect(Collectors.toList());
    }
}
