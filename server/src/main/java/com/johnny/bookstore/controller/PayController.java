package com.johnny.bookstore.controller;

import java.util.List;

import com.johnny.bookstore.model.Order;
import com.johnny.bookstore.payload.request.AddOrder;
import com.johnny.bookstore.payload.response.OrderHistory;
import com.johnny.bookstore.service.PayService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pay")
public class PayController {
    @Autowired
    private PayService payService;

    @PostMapping("/addOrder")
    public Order addOrder(@RequestBody AddOrder orderBody) {
        return payService.addOrder(orderBody);        
    }

    @GetMapping("/getAllOrders")
    public List<Order> getAllOrders() {
        return payService.getAllOrders();
    }

    @PostMapping("/getOrdersByUserEmail")
    public List<OrderHistory> getOrdersByUserId(@RequestParam("email") String userEmail) {
        return payService.getOrdersByUserId(userEmail);
    }
}
