package com.johnny.bookstore.payload.response;

import java.util.List;
import java.util.Set;

import com.johnny.bookstore.model.Author;
import com.johnny.bookstore.model.Category;

public class BookResponse {
    private Long id;
    private String title;
    private String description;
    private List<String> categories;
    private List<String> authors;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }

    public List<String> getAuthors() {
        return authors;
    }

    public void setAuthors(List<String> authors) {
        this.authors = authors;
    }

    public BookResponse(Long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }    
}