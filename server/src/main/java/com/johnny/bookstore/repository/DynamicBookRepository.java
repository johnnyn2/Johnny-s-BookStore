package com.johnny.bookstore.repository;

import java.util.List;

import com.johnny.bookstore.model.Book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DynamicBookRepository {
    Page<Book> searchBooksByFilter(String bookName, String authorName, Long categoryId, Pageable pageable);

    // List<Book> getBooksByIds(String[] ids);
}
