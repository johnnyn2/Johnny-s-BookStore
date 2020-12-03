package com.johnny.bookstore.payload.request;

import javax.validation.constraints.NotNull;

public class AddOrder {
    @NotNull
    private Long[] bookIds;

    @NotNull
    private double amount;

    @NotNull
    private Long userId;

    public Long[] getBookIds() {
        return bookIds;
    }

    public void setBookIds(Long[] bookIds) {
        this.bookIds = bookIds;
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
}
