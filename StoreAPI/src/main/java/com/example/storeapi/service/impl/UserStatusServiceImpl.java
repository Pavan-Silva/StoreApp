package com.example.storeapi.service.impl;

import com.example.storeapi.dto.UserStatusDto;
import com.example.storeapi.repository.UserStatusRepository;
import com.example.storeapi.service.UserStatusService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserStatusServiceImpl implements UserStatusService {

    private final UserStatusRepository userStatusRepository;

    @Override
    public List<UserStatusDto> getAllUserStatuses() {
        return userStatusRepository.findAll().stream()
                .map(ObjectMapper.Map::userStatusToDto)
                .collect(Collectors.toList());
    }
}
