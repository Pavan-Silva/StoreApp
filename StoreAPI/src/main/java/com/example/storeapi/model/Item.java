package com.example.storeapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 45)
    @Column(name = "name", length = 45)
    private String name;

    @Column(name = "purchase_price", precision = 8, scale = 2)
    private BigDecimal purchasePrice;

    @Column(name = "sale_price", precision = 8, scale = 2)
    private BigDecimal salePrice;
}