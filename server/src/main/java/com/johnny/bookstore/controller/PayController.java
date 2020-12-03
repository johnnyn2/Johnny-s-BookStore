package com.johnny.bookstore.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public Map<String, String> addOrder(@RequestBody AddOrder orderBody) {
        Map<String, String> result = new HashMap<>();
        Order order = payService.addOrder(orderBody);
        if (order != null) {
            result.put("status", "success");
        } else {
            result.put("status", "fail");
        }
        return result;
    }

    @GetMapping("/getAllOrders")
    public List<Order> getAllOrders() {
        return payService.getAllOrders();
    }

    @PostMapping("/getOrdersByUserId")
    public Map<String, Object> getOrdersByUserId(@RequestParam("userId") String userId) {
        Map<String, Object> result = new HashMap<>();
        List<OrderHistory> history =  payService.getOrdersByUserId(userId);
        if (history != null) {
            result.put("status", "success");
            result.put("history", history);
        } else {
            result.put("status", "fail");
            result.put("history", new HashMap<>());
        }
        return result;
    }
}
