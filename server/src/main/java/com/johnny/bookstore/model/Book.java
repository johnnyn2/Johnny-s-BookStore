package com.johnny.bookstore.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "book_categories",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private Set<Category> categories = new HashSet<>();

    @NotBlank
    @Size(max = 1000)
    private String title;

    @NotBlank
    private String description;

    @NotNull
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "book_authors",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private Set<Author> authors = new HashSet<>();

    @NotNull
    private double price;

    @NotBlank
    private String format;

    @NotBlank
    private String dimensions;

    @NotNull
    private Date publicationDate;

    @NotBlank
    private String publisher;

    @NotBlank
    private String publicanCountry;

    @NotBlank
    private String language;

    @NotBlank
    private String isbn10;

    @NotBlank
    private String isbn13;

    @NotNull
    private float rank;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    public String getDimensions() {
        return dimensions;
    }

    public void setDimensions(String dimensions) {
        this.dimensions = dimensions;
    }

    public Date getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getPublicanCountry() {
        return publicanCountry;
    }

    public void setPublicanCountry(String publicanCountry) {
        this.publicanCountry = publicanCountry;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getIsbn10() {
        return isbn10;
    }

    public void setIsbn10(String isbn10) {
        this.isbn10 = isbn10;
    }

    public String getIsbn13() {
        return isbn13;
    }

    public void setIsbn13(String isbn13) {
        this.isbn13 = isbn13;
    }

    

    // public Book(@NotBlank @Size(max = 1000) String title,
    //         @NotBlank String description, @NotNull double price, @NotBlank String format,
    //         @NotBlank String dimensions, @NotNull Date publicationDate, @NotBlank String publisher,
    //         @NotBlank String publicanCountry, @NotBlank String language, @NotBlank String isbn10,
    //         @NotBlank String isbn13) {
    //     this.title = title;
    //     this.description = description;
    //     this.price = price;
    //     this.format = format;
    //     this.dimensions = dimensions;
    //     this.publicationDate = publicationDate;
    //     this.publisher = publisher;
    //     this.publicanCountry = publicanCountry;
    //     this.language = language;
    //     this.isbn10 = isbn10;
    //     this.isbn13 = isbn13;
    // }

    public Set<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<Author> authors) {
        this.authors = authors;
    }

    public float getRank() {
        return rank;
    }

    public void setRank(float rank) {
        this.rank = rank;
    }

    public Book(@NotBlank @Size(max = 1000) String title, @NotBlank String description, @NotNull double price,
            @NotBlank String format, @NotBlank String dimensions, @NotNull Date publicationDate,
            @NotBlank String publisher, @NotBlank String publicanCountry, @NotBlank String language,
            @NotBlank String isbn10, @NotBlank String isbn13, @NotNull float rank) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.format = format;
        this.dimensions = dimensions;
        this.publicationDate = publicationDate;
        this.publisher = publisher;
        this.publicanCountry = publicanCountry;
        this.language = language;
        this.isbn10 = isbn10;
        this.isbn13 = isbn13;
        this.rank = rank;
    }

    public Book(Long id) {
        this.id = id;
    }

    public Book(Long id, @NotNull Set<Category> categories, @NotBlank @Size(max = 1000) String title,
            @NotBlank String description, @NotNull Set<Author> authors, @NotNull double price, @NotBlank String format,
            @NotBlank String dimensions, @NotNull Date publicationDate, @NotBlank String publisher,
            @NotBlank String publicanCountry, @NotBlank String language, @NotBlank String isbn10,
            @NotBlank String isbn13, @NotNull float rank) {
        this.id = id;
        this.categories = categories;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.price = price;
        this.format = format;
        this.dimensions = dimensions;
        this.publicationDate = publicationDate;
        this.publisher = publisher;
        this.publicanCountry = publicanCountry;
        this.language = language;
        this.isbn10 = isbn10;
        this.isbn13 = isbn13;
        this.rank = rank;
    }

    public Book() {
    }
}