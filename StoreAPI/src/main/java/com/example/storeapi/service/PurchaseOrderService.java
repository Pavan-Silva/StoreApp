package com.example.storeapi.service;

import com.example.storeapi.dto.PurchaseOrderDto;

import java.util.HashMap;
import java.util.List;

public interface PurchaseOrderService {

    List<PurchaseOrderDto> getAll(HashMap<String, String> params);

    PurchaseOrderDto findById(int id);

    PurchaseOrderDto update(PurchaseOrderDto purchaseOrderDto);

    PurchaseOrderDto save(PurchaseOrderDto purchaseOrderDto);

    void deleteById(int id);
}
