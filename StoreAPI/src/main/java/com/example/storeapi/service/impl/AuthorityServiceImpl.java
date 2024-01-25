package com.example.storeapi.service.impl;

import com.example.storeapi.dto.AuthorityDto;
import com.example.storeapi.exception.ResourceNotFoundException;
import com.example.storeapi.model.Authority;
import com.example.storeapi.repository.AuthorityRepository;
import com.example.storeapi.service.AuthorityService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthorityServiceImpl implements AuthorityService {

    private final AuthorityRepository authorityRepository;

    @Override
    public List<AuthorityDto> getAllAuthorities() {
        return authorityRepository.findAll().stream()
                .map(ObjectMapper.Map::authorityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public AuthorityDto saveAuthority(AuthorityDto authorityDto) {
        Authority authority = ObjectMapper.Map.dtoToAuthority(authorityDto);
        return ObjectMapper.Map.authorityToDto(authorityRepository.save(authority));
    }

    @Override
    public AuthorityDto updateAuthority(AuthorityDto authorityDto) {
        if (authorityRepository.findById(authorityDto.getId()).isPresent()) {
            Authority authority = ObjectMapper.Map.dtoToAuthority(authorityDto);
            return ObjectMapper.Map.authorityToDto(authorityRepository.save(authority));

        } else throw new ResourceNotFoundException("No matching authority for provided info");
    }

    @Override
    public void deleteAuthority(int id) {

        if (authorityRepository.findById(id).isPresent()) {
            authorityRepository.deleteById(id);

        } else throw new ResourceNotFoundException("No matching authority for provided info");
    }
}
