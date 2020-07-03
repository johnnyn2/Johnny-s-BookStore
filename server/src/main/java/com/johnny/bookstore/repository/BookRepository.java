package com.johnny.bookstore.repository;

import java.util.Optional;

import com.johnny.bookstore.model.Book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findById(Long bookId);
}