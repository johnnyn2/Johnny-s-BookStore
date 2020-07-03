package com.johnny.bookstore.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;

import com.johnny.bookstore.exception.ResourceNotFoundException;
import com.johnny.bookstore.model.Book;
import com.johnny.bookstore.model.Category;
import com.johnny.bookstore.model.CategoryName;
import com.johnny.bookstore.payload.request.AddBook;
import com.johnny.bookstore.payload.response.ApiResponse;
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
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        Book book;
        try {
            book = new Book(addBook.getTitle(), addBook.getDescription(), addBook.getAuthor(), addBook.getPrice(),
                addBook.getFormat(), addBook.getDimensions(), format.parse(addBook.getPublicationDate()),
                addBook.getPublisher(), addBook.getPublicanCountry(), addBook.getLanguage(), addBook.getIsbn10(),
                addBook.getIsbn13());
            CategoryName categoryName = CategoryName.valueOf(addBook.getCategory());
            Category category = categoryRepository.findByName(categoryName).orElseThrow(() -> new ResourceNotFoundException("Book", "book", book));
            book.setCategories(Collections.singleton(category));
            return bookRepository.save(book);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}