package com.example.storeapi.service.impl;

import com.example.storeapi.dto.UserDto;
import com.example.storeapi.exception.ResourceAlreadyExistsException;
import com.example.storeapi.exception.ResourceNotFoundException;
import com.example.storeapi.model.User;
import com.example.storeapi.repository.UserRepository;
import com.example.storeapi.service.UserService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<UserDto> getAllUsers(HashMap<String, String> params) {
        List<User> users = userRepository.findAll();

        if (params.isEmpty()) return users.stream()
                .map(ObjectMapper.Map::userToDto)
                .collect(Collectors.toList());

        String name = params.get("name");

        Stream<User> ustream = users.stream();
        if (name != null) ustream = ustream.filter(u -> u.getUsername().toLowerCase().contains(name.toLowerCase()));

        return ustream.map(ObjectMapper.Map::userToDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exists for given username"));

        return ObjectMapper.Map.userToDto(user);
    }

    @Override
    public UserDto getUserByEmpNo(String empNo) {
        User user = userRepository.findByEmployeeEmpNo(empNo)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exists for given username"));

        return ObjectMapper.Map.userToDto(user);
    }

    @Override
    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exists for given username"));

        return ObjectMapper.Map.userToDto(user);
    }

    @Override
    public UserDto saveUser(UserDto userDto) {
        if (!userRepository.existsByUsername(userDto.getUsername()) && !userRepository.existsByPassword(userDto.getPassword())) {
            User user = ObjectMapper.Map.dtoToUser(userDto);

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setDoCreated(LocalDate.now());
            user.setToCreated(LocalTime.now());

            return ObjectMapper.Map.userToDto(userRepository.save(user));
        } else throw new ResourceAlreadyExistsException("User already exists");
    }

    @Override
    public UserDto updateUser(UserDto userDto) {
        Optional<User> userOpt = userRepository.findById(userDto.getId());

        if (userOpt.isPresent()) {
            User user = ObjectMapper.Map.dtoToUser(userDto);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setDoCreated(userOpt.get().getDoCreated());
            user.setToCreated(userOpt.get().getToCreated());
            return ObjectMapper.Map.userToDto(userRepository.save(user));

        } else throw new ResourceNotFoundException("User does not exists for given Id");
    }

    @Override
    public void deleteUserById(int id) {

        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);

        } else throw new ResourceNotFoundException("User does not exists for given Id");
    }
}
