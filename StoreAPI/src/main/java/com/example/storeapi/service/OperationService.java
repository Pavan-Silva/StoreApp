package com.example.storeapi.service;

import com.example.storeapi.dto.OperationDto;

import java.util.List;

public interface OperationService {

    List<OperationDto> getAllOperations();
}