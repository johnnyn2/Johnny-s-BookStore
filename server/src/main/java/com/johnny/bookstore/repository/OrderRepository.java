package com.johnny.bookstore.repository;

import java.util.List;

import com.johnny.bookstore.model.Order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o JOIN o.user u WHERE u.id = :userId")
    public List<Order> getOrdersByUserId(Long userId);
}
