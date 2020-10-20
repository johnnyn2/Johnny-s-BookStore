package com.johnny.bookstore.repository;

import java.util.List;
import java.util.Optional;

import com.johnny.bookstore.model.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
    Optional<Category> findByName(String String); 

    @Query("SELECT c FROM Book b JOIN b.categories c WHERE b.id = :bookId")
    List<Category> findByBookId(Long bookId);

    @Query("SELECT DISTINCT c.name FROM Category c")
    List<String> findAllCategoryNames();
}