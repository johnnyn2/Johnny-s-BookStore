package com.johnny.bookstore.payload.response;

import java.time.Instant;
import java.util.Date;
import java.util.Set;

import com.johnny.bookstore.model.OrderItem;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderHistory {
    private Long orderId;
    private double amount;
    private Long userId;
    private String userName;
    private String name;
    private String userEmail;
    private Set<OrderItem> orderItems;
    private Instant createDate;
    private Instant updateDate; 
}
