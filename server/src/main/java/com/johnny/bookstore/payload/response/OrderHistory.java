package com.johnny.bookstore.payload.response;

import java.time.Instant;
import java.util.Set;

import com.johnny.bookstore.model.OrderItem;

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

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public Instant getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Instant updateDate) {
        this.updateDate = updateDate;
    }

    public OrderHistory(Long orderId, double amount, Long userId, String userName, String name, String userEmail,
            Set<OrderItem> orderItems, Instant createDate, Instant updateDate) {
        this.orderId = orderId;
        this.amount = amount;
        this.userId = userId;
        this.userName = userName;
        this.name = name;
        this.userEmail = userEmail;
        this.orderItems = orderItems;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }    
}
