package com.example.storeapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Integer id;
    private String username;
    private LocalDate doCreated;
    private LocalTime toCreated;
    private EmployeeDto employee;
    private String description;
    private UserStatusDto userStatus;
    private Set<RoleDto> roles;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
}