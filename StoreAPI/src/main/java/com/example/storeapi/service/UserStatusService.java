package com.example.storeapi.service;

import com.example.storeapi.dto.UserStatusDto;

import java.util.List;

public interface UserStatusService {

    List<UserStatusDto> getAllUserStatuses();
}
