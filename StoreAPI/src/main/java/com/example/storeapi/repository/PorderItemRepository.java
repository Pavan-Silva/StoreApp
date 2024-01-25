package com.example.storeapi.repository;

import com.example.storeapi.model.PorderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PorderItemRepository extends JpaRepository<PorderItem, Integer> {

    @Query("FROM PorderItem i where i.order.id = :orderId")
    List<PorderItem> findAllByOrderId(@Param("orderId") int orderId);
}