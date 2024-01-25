package com.example.storeapi.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PorderItemDto {
    private Integer id;
    @NotNull
    private PurchaseOrderDto order;
    @NotNull
    private ItemDto item;
    private BigDecimal lineTotal;
    private Integer quantity;
}