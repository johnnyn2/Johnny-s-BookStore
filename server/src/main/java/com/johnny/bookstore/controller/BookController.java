package com.johnny.bookstore.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import com.johnny.bookstore.model.Book;
import com.johnny.bookstore.payload.request.AddBook;
import com.johnny.bookstore.payload.request.GetBooksByCategory;
import com.johnny.bookstore.payload.response.ApiResponse;
import com.johnny.bookstore.payload.response.BookResponse;
import com.johnny.bookstore.payload.response.PagedResponse;
import com.johnny.bookstore.repository.BookRepository;
import com.johnny.bookstore.service.BookService;
import com.johnny.bookstore.util.AppConstants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService; 

    @GetMapping("/getBooksByCategory")
    public PagedResponse<BookResponse> getBooksByCategory(@Valid @RequestBody GetBooksByCategory payload) {
        return bookService.getBooksByCategory(payload.getCategoryId(), payload.getPage(), payload.getSize());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addBook(@Valid @RequestBody AddBook addBookRequest) {
        Book book = bookService.addBook(addBookRequest);

        URI location = ServletUriComponentsBuilder
                        .fromCurrentRequest().path("/{bookId}")
                        .buildAndExpand(book.getId()).toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true, "Book Added Successfully", book));
    }

    @GetMapping("/getAll")
    public List<Book> getAll() {
        return bookService.getAll();
    }
}