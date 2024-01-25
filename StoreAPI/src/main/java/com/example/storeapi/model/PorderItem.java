package com.example.storeapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "porder_item")
public class PorderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private PurchaseOrder order;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Column(name = "linetotal", precision = 9, scale = 2)
    private BigDecimal lineTotal;

    @Column(name = "quantity")
    private Integer quantity;
}