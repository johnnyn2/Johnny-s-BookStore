package com.johnny.bookstore.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

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
                Author author = null;
                if (!authorRepository.findByName(authorStr).isPresent()) {
                    Author newAuthor = new Author();
                    newAuthor.setName(authorStr);
                    newAuthor.setProfile("");
                    author = authorRepository.save(newAuthor); 
                } else {
                    author = authorRepository.findByName(authorStr).get();
                }
                authors.add(author);
            }
            book.setAuthors(authors);
            Set<Category> categories = new HashSet<>();
            for (String categoryStr: addBook.getCategories()) {
                Category category = null;
                if (!categoryRepository.findByName(categoryStr).isPresent()) {
                    Category newCategory = new Category();
                    newCategory.setName(categoryStr);
                    category = categoryRepository.save(newCategory);
                } else {
                    category = categoryRepository.findByName(categoryStr).get();
                }
                categories.add(category);
            }
            book.setCategories(categories);
            return bookRepository.save(book);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public PagedResponse<BookResponse> getBooksByCategory(Long categoryId, int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Book> books = bookRepository.findByCategory(categoryId, pageable);
            if (books.getNumberOfElements() == 0) {
                return new PagedResponse<>(Collections.emptyList(), books.getNumber(),
                    books.getSize(), books.getTotalElements(), books.getTotalPages(), books.isLast());
            }
            List<BookResponse> results = books.getContent().stream().map(book -> {
                return new BookResponse(
                    book.getId(),
                    book.getTitle(),
                    book.getDescription(),
                    book.getCategories().stream().map(category -> {
                        return category.getName();
                    }).collect(Collectors.toList()),
                    book.getAuthors().stream().map(author -> {
                        return author.getName();
                    }).collect(Collectors.toList())
                );
            }).collect(Collectors.toList());
            return new PagedResponse<>(results, books.getNumber(), books.getSize(), books.getTotalElements(), books.getTotalPages(), books.isLast());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new PagedResponse<BookResponse>();
    }

    public PagedResponse<BookResponse> searchBooksByFilter(String bookName, String authorName, Long categoryId, int page, int size) {
        return new PagedResponse<BookResponse>();
    }

    public PagedResponse<BookResponse> getAllBooks(int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Book> books = bookRepository.getAllBooks(pageable);
            if (books.getNumberOfElements() == 0) {
                return new PagedResponse<>(Collections.emptyList(), books.getNumber(), books.getSize(), books.getTotalElements(), books.getTotalPages(), books.isLast());
            }
            List<BookResponse> results = books.getContent().stream().map(book -> {
                return new BookResponse(
                    book.getId(),
                    book.getTitle(),
                    book.getDescription(),
                    book.getCategories().stream().map(category -> {
                        return category.getName();
                    }).collect(Collectors.toList()),
                    book.getAuthors().stream().map(author -> {
                        return author.getName();
                    }).collect(Collectors.toList())
                );
            }).collect(Collectors.toList());
            return new PagedResponse<>(results, books.getNumber(), books.getSize(), books.getTotalElements(), books.getTotalPages(), books.isLast());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new PagedResponse<BookResponse>();
    }

    public List<Book> getAll() {
        return bookRepository.getAll();
    }
}