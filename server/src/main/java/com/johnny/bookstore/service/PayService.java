package com.johnny.bookstore.service;

import org.springframework.stereotype.Service;
import com.johnny.bookstore.repository.BookRepository;
import com.johnny.bookstore.repository.OrderRepository;
import com.johnny.bookstore.repository.UserRepository;
import com.johnny.bookstore.model.Book;
import com.johnny.bookstore.model.Order;
import com.johnny.bookstore.model.OrderItem;
import com.johnny.bookstore.model.User;
import com.johnny.bookstore.payload.request.AddOrder;
import com.johnny.bookstore.payload.response.OrderHistory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
@Service
public class PayService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private EmailService emailService;

    public Order addOrder(AddOrder orderBody) {
        Order order = new Order();
        try {
            order.setAmount(orderBody.getAmount());
            Long[] bookIds = orderBody.getBookIds();
            List<Book> books = bookRepository.getBooksByIds(bookIds);
            Set<OrderItem> orderItems = new HashSet<>();
            books.stream().forEach(book -> {
                OrderItem orderItem = new OrderItem();
                orderItem.setBook(book);
                orderItem.setOrder(order);
                orderItems.add(orderItem);
            });
            order.setOrderItem(orderItems);
            User user = userRepository.findById(orderBody.getUserId()).orElseThrow(() -> new UsernameNotFoundException ("Add Order Error: User not found with userId - " + orderBody.getUserId()));
            order.setUser(user);
            Order newOrder = orderRepository.save(order);
            if (newOrder != null) {
                Map<String, Object> templateModel = new HashMap<>();
                templateModel.put("name", user.getName());
                templateModel.put("items", books);
                templateModel.put("amount", Double.toString(order.getAmount()));
                templateModel.put("sender", "Johnny Ho");
                // emailService.sendMessageUsingThymeleafTemplate(new String[]{user.getEmail()}, "Payment Confirmation", "payment_invoice.html", templateModel);
                emailService.sendMessageUsingFreemarkerTemplate(new String[]{user.getEmail()}, "Payment Confirmation", "payment_invoice.ftl", templateModel);
            }
            return newOrder;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<OrderHistory> getOrdersByUserId(String userId) {
        User user = userRepository.findById(Long.parseLong(userId)).orElseThrow(() -> new UsernameNotFoundException("getOrdersByUserId Error: User not found with userId - " + userId));
        List<Order> orders = orderRepository.getOrdersByUserId(user.getId());
        List<OrderHistory> orderHistory = orders.stream().map(order -> new OrderHistory(
            order.getId(),
            order.getAmount(),
            user.getId(),
            user.getUsername(),
            user.getName(),
            user.getEmail(),
            order.getOrderItem(),
            order.getCreatedAt(),
            order.getUpdatedAt()
        )).collect(Collectors.toList());
        return orderHistory;
    }
}
