package com.johnny.bookstore.repository;

import java.util.List;
import java.util.Optional;

import com.johnny.bookstore.model.Author;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    Optional<Author> findByName(String name);

    @Query("SELECT a FROM Book b JOIN b.authors a WHERE b.id = :bookId")
    List<Author> findByBookId(Long bookId);
}