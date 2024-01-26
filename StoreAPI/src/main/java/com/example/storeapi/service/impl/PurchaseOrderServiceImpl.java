package com.example.storeapi.service.impl;

import com.example.storeapi.dto.PurchaseOrderDto;
import com.example.storeapi.exception.ResourceAlreadyExistsException;
import com.example.storeapi.exception.ResourceNotFoundException;
import com.example.storeapi.model.PurchaseOrder;
import com.example.storeapi.repository.PurchaseOrderRepository;
import com.example.storeapi.service.PurchaseOrderService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    private final PurchaseOrderRepository purchaseOrderRepository;

    @Override
    public List<PurchaseOrderDto> getAll(HashMap<String, String> params) {
        List<PurchaseOrder> purchaseOrders = purchaseOrderRepository.findAll();

        if (params.isEmpty()) return purchaseOrders.stream()
                .map(ObjectMapper.Map::purchaseOrderToDto)
                .collect(Collectors.toList());

        String name = params.get("name");
        String supplier = params.get("supplier");

        return purchaseOrderRepository.findAll().stream()
                .map(ObjectMapper.Map::purchaseOrderToDto)
                .collect(Collectors.toList());
    }

    @Override
    public PurchaseOrderDto findById(int id) {
        return ObjectMapper.Map.purchaseOrderToDto(purchaseOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Purchase order not found")));
    }

    @Override
    public PurchaseOrderDto update(PurchaseOrderDto purchaseOrderDto) {
        PurchaseOrder order = purchaseOrderRepository.findById(purchaseOrderDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid purchase order id"));

        if (order.getOrderStatus().getName().equals("Completed"))
            throw new ResourceAlreadyExistsException("Completed orders cannot be modified");

        PurchaseOrder purchaseOrder = ObjectMapper.Map.dtoToPurchaseOrder(purchaseOrderDto);
        return ObjectMapper.Map.purchaseOrderToDto(purchaseOrderRepository.save(purchaseOrder));
    }

    @Override
    public PurchaseOrderDto save(PurchaseOrderDto purchaseOrderDto) {
        PurchaseOrder purchaseOrder = ObjectMapper.Map.dtoToPurchaseOrder(purchaseOrderDto);
        return ObjectMapper.Map.purchaseOrderToDto(purchaseOrderRepository.save(purchaseOrder));
    }

    @Override
    public void deleteById(int id) {
        PurchaseOrder purchaseOrder = purchaseOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid purchase order id"));

        purchaseOrderRepository.delete(purchaseOrder);
    }
}
