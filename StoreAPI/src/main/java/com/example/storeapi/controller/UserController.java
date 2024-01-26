package com.example.storeapi.controller;

import com.example.storeapi.dto.UserDto;
import com.example.storeapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasAuthority('Users-Read')")
    public List<UserDto> getUsers(@RequestParam HashMap<String, String> params) {
        return userService.getAllUsers(params);
    }

    @GetMapping("/emp/{empNo}")
    @PreAuthorize("hasAuthority('Users-Read')")
    public UserDto getUserById(@PathVariable String empNo) {
        return userService.getUserByEmpNo(empNo);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('Users-Read')")
    public UserDto getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('Users-Write')")
    public UserDto save(@RequestBody UserDto userDto) {
        return userService.saveUser(userDto);
    }

    @PutMapping
    @PreAuthorize("hasAuthority('Users-Update')")
    public UserDto updateUser(@RequestBody UserDto userDto) {
        return userService.updateUser(userDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('Users-Delete')")
    public void deleteUserById(@PathVariable int id) {
        userService.deleteUserById(id);
    }
}
