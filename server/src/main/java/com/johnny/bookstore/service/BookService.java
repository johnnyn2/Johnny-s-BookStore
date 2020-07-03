package com.johnny.bookstore.service;

import java.util.Collections;

import com.johnny.bookstore.exception.ResourceNotFoundException;
import com.johnny.bookstore.model.Book;
import com.johnny.bookstore.model.Category;
import com.johnny.bookstore.model.CategoryName;
import com.johnny.bookstore.payload.request.AddBook;
import com.johnny.bookstore.repository.BookRepository;
import com.johnny.bookstore.repository.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;
    @Autowired
    CategoryRepository categoryRepository;

    public Book addBook(AddBook addBook) {
        Book book = new Book(addBook.getTitle(), addBook.getDescription(), addBook.getAuthor(), addBook.getPrice());
        CategoryName categoryName = CategoryName.valueOf(addBook.getCategory());
        Category category = categoryRepository.findByName(categoryName).orElseThrow(() -> new ResourceNotFoundException("Book", "book", book));
        book.setCategories(Collections.singleton(category));
        return bookRepository.save(book);
    }
}