package com.example.storeapi.dto.response;

import com.example.storeapi.dto.UserDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthUser {

    UserDto user;
    List<String> authorities;
}
