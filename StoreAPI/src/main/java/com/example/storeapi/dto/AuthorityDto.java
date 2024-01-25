package com.example.storeapi.dto;

import com.example.storeapi.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthorityDto {
    private Integer id;
    private Role role;
    private ModuleDto module;
    private OperationDto operation;
}