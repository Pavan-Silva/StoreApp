package com.example.storeapi.service;

import com.example.storeapi.dto.EmployeeDto;

import java.util.HashMap;
import java.util.List;

public interface EmployeeService {

    List<EmployeeDto> getAll(HashMap<String, String> params);

    EmployeeDto findByEmpNo(String empNo);

    EmployeeDto update(EmployeeDto employeeDto);

    EmployeeDto save(EmployeeDto employeeDto);

    void deleteByEmpNo(String empNo);
}
