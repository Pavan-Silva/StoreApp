package com.example.storeapi.service;

import com.example.storeapi.dto.UserDto;

import java.util.HashMap;
import java.util.List;

public interface UserService {

    List<UserDto> getAllUsers(HashMap<String, String> params);

    UserDto getUserById(int id);

    UserDto getUserByEmpNo(String empNo);

    UserDto getUserByUsername(String username);

    UserDto saveUser(UserDto user);

    UserDto updateUser(UserDto user);

    void deleteUserById(int id);
}
