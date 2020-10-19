package com.johnny.bookstore.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.johnny.bookstore.exception.ResourceNotFoundException;
import com.johnny.bookstore.model.Author;
import com.johnny.bookstore.model.Book;
import com.johnny.bookstore.model.Category;
import com.johnny.bookstore.model.CategoryName;
import com.johnny.bookstore.payload.request.AddBook;
import com.johnny.bookstore.payload.response.BookResponse;
import com.johnny.bookstore.payload.response.PagedResponse;
import com.johnny.bookstore.repository.AuthorRepository;
import com.johnny.bookstore.repository.BookRepository;
import com.johnny.bookstore.repository.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    AuthorRepository authorRepository;

    public Book addBook(AddBook addBook) {
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        Book book;
        try {
            book = new Book(addBook.getTitle(), addBook.getDescription(), addBook.getPrice(),
                addBook.getFormat(), addBook.getDimensions(), format.parse(addBook.getPublicationDate()),
                addBook.getPublisher(), addBook.getPublicanCountry(), addBook.getLanguage(), addBook.getIsbn10(),
                addBook.getIsbn13(), addBook.getRank());
            Set<Author> authors = new HashSet<>();
            for (String authorStr: addBook.getAuthors()) {
                Author author = authorRepository.findByName(authorStr).orElseThrow(() -> new ResourceNotFoundException("Book Author", "Author", book));
                authors.add(author);
            }
            book.setAuthors(authors);
            Set<Category> categories = new HashSet<>();
            for (String categoryStr: addBook.getCategories()) {
                CategoryName categoryName = CategoryName.valueOf(categoryStr);
                Category category = categoryRepository.findByName(categoryName).orElseThrow(() -> new ResourceNotFoundException("Book Category", "category", book));
                categories.add(category); 
            }
            book.setCategories(categories);
            // CategoryName categoryName = CategoryName.valueOf(addBook.getCategory());
            // Category category = categoryRepository.findByName(categoryName).orElseThrow(() -> new ResourceNotFoundException("Book", "book", book));
            // book.setCategories(Collections.singleton(category));
            return bookRepository.save(book);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public PagedResponse<BookResponse> getBooksByCategory(String categoryName, int page, int size) {
        try {
            Category category = categoryRepository.findByName(CategoryName.valueOf(categoryName)).orElseThrow(() -> new ResourceNotFoundException("Book Category", "category", null));

            Pageable pageable = PageRequest.of(page, size);
            bookRepository.findByCategory(category.getId(), pageable);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new PagedResponse<BookResponse>();
    }
}