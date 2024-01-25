package com.example.storeapi.service;

import com.example.storeapi.dto.UserDto;

import java.util.List;

public interface UserService {

    List<UserDto> getAllUsers();

    UserDto getUserById(int id);

    UserDto getUserByEmpNo(String empNo);

    UserDto getUserByUsername(String username);

    UserDto saveUser(UserDto user);

    UserDto updateUser(UserDto user);

    void deleteUserById(int id);
}
