package com.example.storeapi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "porder")
public class PurchaseOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "docreate")
    private LocalDate doCreate;

    @Column(name = "expected_total", precision = 9, scale = 2)
    private BigDecimal expectedTotal;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "orderstatus_id", nullable = false)
    private PorderStatus orderStatus;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;
}