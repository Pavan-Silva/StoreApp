package com.example.storeapi.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemDto  {

    private Integer id;
    @Size(max = 45)
    private String name;
    private BigDecimal purchasePrice;
    private BigDecimal salePrice;
}