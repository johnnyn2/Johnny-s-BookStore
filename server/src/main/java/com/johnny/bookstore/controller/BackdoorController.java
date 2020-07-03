package com.johnny.bookstore.controller;

import java.net.URI;

import javax.validation.Valid;

import com.johnny.bookstore.model.Book;
import com.johnny.bookstore.payload.request.AddBook;
import com.johnny.bookstore.payload.response.ApiResponse;
import com.johnny.bookstore.service.BookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/backdoor")
public class BackdoorController {
    @Autowired
    BookService bookService;

    @PostMapping("/book/add")
    public ResponseEntity<?> addBook(@Valid @RequestBody AddBook addBookRequest) {
        Book book = bookService.addBook(addBookRequest);

        URI location = ServletUriComponentsBuilder
                        .fromCurrentRequest().path("/{bookId}")
                        .buildAndExpand(book.getId()).toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true, "Book Added Successfully"));
    }
}