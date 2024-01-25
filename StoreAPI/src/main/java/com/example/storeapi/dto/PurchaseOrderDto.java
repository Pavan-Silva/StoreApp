package com.example.storeapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseOrderDto  {
    private Integer id;
    private LocalDate doCreate;
    private BigDecimal expectedTotal;
    private SupplierDto supplier;
    private PorderStatusDto orderStatus;
}