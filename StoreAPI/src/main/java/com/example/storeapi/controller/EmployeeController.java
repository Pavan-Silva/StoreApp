package com.example.storeapi.controller;

import com.example.storeapi.dto.EmployeeDto;
import com.example.storeapi.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    @PreAuthorize("hasAuthority('Employees-Read')")
    public List<EmployeeDto> getAllEmployees(@RequestParam HashMap<String, String> params) {
        return employeeService.getAll(params);
    }

    @GetMapping("/{empNo}")
    @PreAuthorize("hasAuthority('Employees-Read')")
    public EmployeeDto getEmployeeByEmpNo(@PathVariable String empNo) {
        return employeeService.findByEmpNo(empNo);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('Employees-Write')")
    public EmployeeDto saveEmployee(@RequestBody EmployeeDto employeeDto) {
        return employeeService.save(employeeDto);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('Employees-Update')")
    public EmployeeDto updateEmployee(@RequestBody EmployeeDto employeeDto) {
        return employeeService.update(employeeDto);
    }

    @DeleteMapping("/{empNo}")
    @PreAuthorize("hasAuthority('Employees-Delete')")
    public void deleteEmployee(@PathVariable String empNo) {
        employeeService.deleteByEmpNo(empNo);
    }
}