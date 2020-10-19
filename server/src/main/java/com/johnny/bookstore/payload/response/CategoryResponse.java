package com.johnny.bookstore.payload.response;

import com.johnny.bookstore.model.CategoryName;

public class CategoryResponse {
    private long id;
    private CategoryName categoryName;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public CategoryName getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(CategoryName categoryName) {
        this.categoryName = categoryName;
    }

    
}