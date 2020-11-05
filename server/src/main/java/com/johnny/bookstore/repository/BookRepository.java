package com.johnny.bookstore.repository;

import java.util.List;
import java.util.Optional;

import com.johnny.bookstore.model.Book;
import com.johnny.bookstore.model.Category;
import com.johnny.bookstore.payload.response.BookResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findById(Long bookId);

    @Query("SELECT b FROM Book b JOIN b.categories c WHERE c.id = :categoryId")
    Page<Book> findByCategory(@Param("categoryId") Long categoryId, Pageable pageable);

    @Query("SELECT b FROM Book b")
    Page<Book> getAllBooks(Pageable pageable);

    @Query("SELECT NEW com.johnny.bookstore.payload.response.BookResponse(b.id, b.title) FROM Book b")
    Page<BookResponse> getBookBriefInfo(Pageable pageable);

    @Query("SELECT b FROM Book b")
    List<Book> getAll();
}