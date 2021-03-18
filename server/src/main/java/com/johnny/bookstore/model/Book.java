package com.johnny.bookstore.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToMany
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
    @ManyToMany
    @JoinTable(
        name = "book_authors",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private Set<Author> authors = new HashSet<>();

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<OrderItem> orderItem = new HashSet<>();

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
}