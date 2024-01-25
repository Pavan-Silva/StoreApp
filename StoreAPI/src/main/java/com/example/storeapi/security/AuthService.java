package com.example.storeapi.security;

import com.example.storeapi.dto.UserDto;
import com.example.storeapi.dto.request.LoginRequest;
import com.example.storeapi.dto.response.AuthResponse;
import com.example.storeapi.dto.response.AuthUser;
import com.example.storeapi.exception.AuthenticationException;
import com.example.storeapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtService jwtService;
    private final UserService userService;
    private final CustomUserDetailsService customUserDetailsService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        UserDto userDto = userService.getUserByUsername(request.getUsername());
        String accessToken = jwtService.generateAccessToken(userDto);
        String refreshToken = jwtService.generateRefreshToken(userDto);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .authUser(
                        AuthUser.builder()
                                .user(userDto)
                                .authorities(getUserAuthoritiesByUserName(request.getUsername()))
                                .build()
                )
                .build();
    }

    public AuthResponse refreshToken(String token) {
        UserDto userDto = userService.getUserByUsername(jwtService.extractUsername(token));

        if (
                jwtService.isTokenValid(token, userDto)
                && jwtService.notRevokedToken(token)
        ) {
            String accessToken = jwtService.generateAccessToken(userDto);

            return AuthResponse.builder()
                    .accessToken(accessToken)
                    .authUser(
                            AuthUser.builder()
                                    .user(userDto)
                                    .authorities(getUserAuthoritiesByUserName(userDto.getUsername()))
                                    .build()
                    )
                    .build();

        } else throw new AuthenticationException("Invalid refresh token");
    }

    private List<String> getUserAuthoritiesByUserName(String username) {
        UserDetails userDetails = customUserDetailsService.getUserDetails().loadUserByUsername(username);

        return userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();
    }
}
