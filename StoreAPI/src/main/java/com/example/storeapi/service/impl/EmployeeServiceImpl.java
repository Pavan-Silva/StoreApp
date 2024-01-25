package com.example.storeapi.service.impl;

import com.example.storeapi.dto.EmployeeDto;
import com.example.storeapi.exception.ResourceAlreadyExistsException;
import com.example.storeapi.exception.ResourceNotFoundException;
import com.example.storeapi.model.Employee;
import com.example.storeapi.repository.EmployeeRepository;
import com.example.storeapi.service.EmployeeService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public List<EmployeeDto> getAll(HashMap<String, String> params) {
        List<Employee> employees = employeeRepository.findAll();

        if (params.isEmpty()) return employees.stream()
                .map(ObjectMapper.Map::employeeToDto)
                .collect(Collectors.toList());

        String empNo = params.get("empno");
        String gender = params.get("gender");
        String name = params.get("name");
        String designation = params.get("designation");
        String nic = params.get("nic");

        Stream<Employee> estream = employees.stream();

        if (designation != null)
            estream = estream.filter(e -> e.getDesignation().getName().equalsIgnoreCase(designation));
        if (gender != null) estream = estream.filter(e -> e.getGender().getName().equalsIgnoreCase(gender));
        if (empNo != null) estream = estream.filter(e -> e.getEmpNo().equals(empNo));
        if (nic != null) estream = estream.filter(e -> e.getNic().contains(nic));
        if (name != null) estream = estream.filter(e -> e.getFullName().toLowerCase().contains(name.toLowerCase()));

        return estream.map(ObjectMapper.Map::employeeToDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto findByEmpNo(String empNo) {
        return ObjectMapper.Map.employeeToDto(employeeRepository.findByEmpNo(empNo).orElseThrow(() ->
                new ResourceNotFoundException("Employee not found")));
    }

    @Override
    public EmployeeDto update(EmployeeDto employeeDto) {
        employeeRepository.findById(employeeDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid EmpNo"));

        Employee employee = ObjectMapper.Map.dtoToEmployee(employeeDto);
        return ObjectMapper.Map.employeeToDto(employeeRepository.save(employee));
    }

    @Override
    public EmployeeDto save(EmployeeDto employeeDto) {
        List<String> errors = new LinkedList<>();

        if (employeeRepository.findByNic(employeeDto.getNic()).isPresent())
            errors.add("Nic is already in use");

        if (employeeRepository.findByEmpNo(employeeDto.getEmpNo()).isPresent())
            errors.add("EmpNo is already in use");

        if (errors.isEmpty()) {
            Employee employee = ObjectMapper.Map.dtoToEmployee(employeeDto);
            return ObjectMapper.Map.employeeToDto(employeeRepository.save(employee));

        } else {
            String message;

            if (errors.size() > 1) {
                message = errors.stream()
                        .map(String::valueOf)
                        .collect(Collectors.joining(", "));

            } else message = errors.get(0);

            throw new ResourceAlreadyExistsException(message);
        }
    }

    @Override
    public void deleteByEmpNo(String empNo) {
        Employee employee = employeeRepository.findByEmpNo(empNo)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid EmpNo"));

        employeeRepository.delete(employee);
    }
}
