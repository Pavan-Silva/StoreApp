package com.example.storeapi.service;

import com.example.storeapi.dto.AuthorityDto;

import java.util.List;

public interface AuthorityService {

    List<AuthorityDto> getAllAuthorities();

    AuthorityDto saveAuthority(AuthorityDto authorityDto);

    AuthorityDto updateAuthority(AuthorityDto authorityDto);

    void deleteAuthority(int id);
}
