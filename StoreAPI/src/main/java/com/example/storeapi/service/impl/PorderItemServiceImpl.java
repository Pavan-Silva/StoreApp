package com.example.storeapi.service.impl;

import com.example.storeapi.dto.PorderItemDto;
import com.example.storeapi.exception.ResourceAlreadyExistsException;
import com.example.storeapi.exception.ResourceNotFoundException;
import com.example.storeapi.model.PorderItem;
import com.example.storeapi.repository.PorderItemRepository;
import com.example.storeapi.service.PorderItemService;
import com.example.storeapi.util.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class PorderItemServiceImpl implements PorderItemService {

    private final PorderItemRepository porderItemRepository;

    @Override
    public List<PorderItemDto> getAll(HashMap<String, String> params) {
        List<PorderItem> itemList = porderItemRepository.findAll();

        if (params.isEmpty()) return itemList.stream()
                .map(ObjectMapper.Map::porderItemToDto)
                .collect(Collectors.toList());

        String orderId = params.get("orderid");

        Stream<PorderItem> stream = itemList.stream();
        if (orderId != null) stream = stream.filter(i -> i.getOrder().getId() == Integer.parseInt(orderId));

        return stream.map(ObjectMapper.Map::porderItemToDto)
                .collect(Collectors.toList());
    }

    @Override
    public PorderItemDto findById(int id) {
        return ObjectMapper.Map.porderItemToDto(porderItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Purchase order item not found")));
    }

    @Override
    public PorderItemDto update(PorderItemDto porderItemDto) {
        PorderItem item = porderItemRepository.findById(porderItemDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid purchase order item id"));

        if (item.getOrder().getOrderStatus().getName().equals("Completed"))
            throw new ResourceAlreadyExistsException("Completed orders cannot be modified");

        if (porderItemDto.getItem() != null) {
            porderItemDto.setLineTotal(
                    porderItemDto.getItem()
                            .getPurchasePrice().multiply(BigDecimal.valueOf(porderItemDto.getQuantity()))
            );
        } else throw new ResourceNotFoundException("Invalid purchase order");

        PorderItem porderItem = ObjectMapper.Map.dtoToPorderItem(porderItemDto);
        return ObjectMapper.Map.porderItemToDto(porderItemRepository.save(porderItem));
    }

    @Override
    public PorderItemDto save(PorderItemDto porderItemDto) {
        if (porderItemDto.getItem() != null) {
            porderItemDto.setLineTotal(
                    porderItemDto.getItem()
                            .getPurchasePrice().multiply(BigDecimal.valueOf(porderItemDto.getQuantity()))
            );
        } else throw new ResourceNotFoundException("Invalid purchase order provided");

        PorderItem porderItem = ObjectMapper.Map.dtoToPorderItem(porderItemDto);
        return ObjectMapper.Map.porderItemToDto(porderItemRepository.save(porderItem));
    }

    @Override
    public void deleteById(int id) {
        PorderItem porderItem = porderItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid purchase order item id"));

        porderItemRepository.delete(porderItem);
    }
}
