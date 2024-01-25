package com.example.storeapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {

    private Integer id;
    private String empNo;
    private String fullName;
    private String callingName;
    private byte[] photo;
    private GenderDto gender;
    private LocalDate doBirth;
    private String nic;
    private String address;
    private String mobile;
    private String land;
    private LocalDate doAssignment;
    private DesignationDto designation;
    private EmployeeStatusDto employeeStatus;
    private String description;
}