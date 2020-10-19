package com.johnny.bookstore.repository;

import java.util.Optional;

import com.johnny.bookstore.model.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
    Optional<Category> findByName(String String); 
}