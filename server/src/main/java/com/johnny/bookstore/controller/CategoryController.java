package com.johnny.bookstore.controller;

import java.util.List;

import com.johnny.bookstore.model.Category;
import com.johnny.bookstore.payload.response.ApiResponse;
import com.johnny.bookstore.repository.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public ApiResponse getAllCategories() {
        try {
            List<Category> categories = categoryRepository.findAll();
            return new ApiResponse(true, "", categories);       
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ApiResponse(false, "Something went wrong");
    }
}