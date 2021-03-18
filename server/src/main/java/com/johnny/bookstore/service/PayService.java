package com.johnny.bookstore.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.johnny.bookstore.repository.BookRepository;
import com.johnny.bookstore.repository.OrderRepository;
import com.johnny.bookstore.repository.UserRepository;
import com.johnny.bookstore.model.Book;
import com.johnny.bookstore.model.Order;
import com.johnny.bookstore.model.OrderItem;
import com.johnny.bookstore.model.User;
import com.johnny.bookstore.payload.request.AddOrder;
import com.johnny.bookstore.payload.response.OrderHistory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Consumer;
import java.util.function.Function;
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

    @Autowired
    private PdfService pdfService;

    protected final Logger logger = LoggerFactory.getLogger(getClass());

    @Value("${mailSender.name}")
    private String mailSender;

    @Transactional
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
                try {
                    Map<String, Object> templateModel = new HashMap<>();
                    templateModel.put("name", user.getName());
                    templateModel.put("items", books);
                    templateModel.put("amount", Double.toString(order.getAmount()));
                    templateModel.put("sender", mailSender);
                    // emailService.sendMessageUsingThymeleafTemplate(new String[]{user.getEmail()}, "Payment Confirmation", "payment_invoice.html", templateModel);
                    // emailService.sendMessageUsingFreemarkerTemplate(new String[]{user.getEmail()}, "Payment Confirmation", "payment_invoice.ftl", templateModel);
                    
                    Map<String, Object> mailModel = new HashMap<>();
                    mailModel.put("name", user.getName());
                    mailModel.put("items", books);
                    mailModel.put("amount", Double.toString(order.getAmount()));
                    mailModel.put("sender", mailSender);
                    Instant createInstant = newOrder.getCreatedAt();
                    Date createDate = Date.from(createInstant);
                    String formattedDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.0").format(createDate);
                    mailModel.put("date", formattedDate);
                    String invoiceRefDatePart = new SimpleDateFormat("yyyyMMdd").format(createDate);
                    mailModel.put("refNo", "M" + invoiceRefDatePart+ Long.toString(newOrder.getId()));
                    ByteArrayOutputStream pdf = pdfService.exportInvoice(mailModel);
                    emailService.sendMessageUsingFreemarkerWithAttachment(new String[]{user.getEmail()}, "Payment Confirmation", "payment_invoice.ftl", templateModel, pdf, "invoice.pdf", "application/pdf");
                } catch (Exception e) {
                    logger.error("Fail to send payment invoice email to client: " + user.toString());
                    logger.error("Detailed Error Message: " + e.getMessage());
                }
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
