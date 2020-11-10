package com.johnny.bookstore.payload.response;

import java.util.Date;
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
    private byte[] imageStream;
    private double price;
    private String format;
    private String dimensions;
    private Date publicationDate;
    private String publisher;
    private String publicanCountry;
    private String language;
    private String isbn10;
    private String isbn13;
    private float rank;

    

    public Long getId() {
        return id;
    }

    public byte[] getImageStream() {
        return imageStream;
    }

    public void setImageStream(byte[] imageStream) {
        this.imageStream = imageStream;
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

    public BookResponse(Long id, String title, String description, List<String> categories, List<String> authors) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.categories = categories;
        this.authors = authors;
    }

    public BookResponse(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    public BookResponse() {}

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

    public float getRank() {
        return rank;
    }

    public void setRank(float rank) {
        this.rank = rank;
    }

    public BookResponse(Long id, String title, String description, List<String> categories, List<String> authors,
            byte[] imageStream, double price, String format, String dimensions, Date publicationDate, String publisher,
            String publicanCountry, String language, String isbn10, String isbn13, float rank) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.categories = categories;
        this.authors = authors;
        this.imageStream = imageStream;
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