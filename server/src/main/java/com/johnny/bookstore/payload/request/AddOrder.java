package com.johnny.bookstore.payload.request;

import java.util.List;

import javax.validation.constraints.NotNull;

public class AddOrder {
    @NotNull
    private Long[] bookIds;

    @NotNull
    private double amount;

    @NotNull
    private String userEmail;

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

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
