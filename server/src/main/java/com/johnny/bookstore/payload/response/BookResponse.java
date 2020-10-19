package com.johnny.bookstore.payload.response;

import java.util.List;
import java.util.Set;

import com.johnny.bookstore.model.Author;
import com.johnny.bookstore.model.Category;

public class BookResponse {
    private Long id;
    private String title;
    private String description;
    private Set<Category> categories;
    private Set<Author> authors;

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

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Set<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<Author> authors) {
        this.authors = authors;
    }

    public BookResponse(Long id, String title, String description, Set<Category> categories, Set<Author> authors) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.categories = categories;
        this.authors = authors;
    }
}