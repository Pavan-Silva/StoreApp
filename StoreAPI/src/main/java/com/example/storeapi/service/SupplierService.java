package com.example.storeapi.service;

import com.example.storeapi.dto.SupplierDto;

import java.util.HashMap;
import java.util.List;

public interface SupplierService {

    List<SupplierDto> getAll(HashMap<String, String> params);

    SupplierDto findById(int id);

    SupplierDto update(SupplierDto supplierDto);

    SupplierDto save(SupplierDto supplierDto);

    void deleteById(int id);
}
