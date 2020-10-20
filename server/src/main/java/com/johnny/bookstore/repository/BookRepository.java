package com.johnny.bookstore.repository;

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

    @Query("SELECT NEW com.johnny.bookstore.payload.response.BookResponse(b.id, b.title, b.description) FROM Book b JOIN b.categories c WHERE c.id = :categoryId GROUP BY b.id")
    Page<BookResponse> findByCategory(@Param("categoryId") Long categoryId, Pageable pageable);
}