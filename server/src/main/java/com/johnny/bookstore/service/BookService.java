package com.johnny.bookstore.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

import com.johnny.bookstore.model.Author;
import com.johnny.bookstore.model.Book;
import com.johnny.bookstore.model.Category;
import com.johnny.bookstore.model.CategoryName;
import com.johnny.bookstore.payload.request.AddBook;
import com.johnny.bookstore.payload.response.BookResponse;
import com.johnny.bookstore.payload.response.PagedResponse;
import com.johnny.bookstore.payload.response.PaymentBookItem;
import com.johnny.bookstore.repository.AuthorRepository;
import com.johnny.bookstore.repository.BookRepository;
import com.johnny.bookstore.repository.CategoryRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    AuthorRepository authorRepository;

    private final String BOOK_GALLERY_COVER = "D:/work/spring-react-app/images";
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    public Book addBook(AddBook addBook) {
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");
        Book book;
        try {
            book = new Book(addBook.getTitle(), addBook.getDescription(), addBook.getPrice(), addBook.getFormat(),
                    addBook.getDimensions(), format.parse(addBook.getPublicationDate()), addBook.getPublisher(),
                    addBook.getPublicanCountry(), addBook.getLanguage(), addBook.getIsbn10(), addBook.getIsbn13(),
                    addBook.getRank());
            Set<Author> authors = new HashSet<>();
            for (String authorStr : addBook.getAuthors()) {
                Author author = null;
                if (!authorRepository.findByName(authorStr).isPresent()) {
                    Author newAuthor = new Author();
                    newAuthor.setName(authorStr);
                    newAuthor.setProfile("");
                    author = authorRepository.save(newAuthor);
                } else {
                    author = authorRepository.findByName(authorStr).get();
                }
                authors.add(author);
            }
            book.setAuthors(authors);
            Set<Category> categories = new HashSet<>();
            for (String categoryStr : addBook.getCategories()) {
                Category category = null;
                if (!categoryRepository.findByName(categoryStr).isPresent()) {
                    Category newCategory = new Category();
                    newCategory.setName(categoryStr);
                    category = categoryRepository.save(newCategory);
                } else {
                    category = categoryRepository.findByName(categoryStr).get();
                }
                categories.add(category);
            }
            book.setCategories(categories);
            return bookRepository.save(book);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public PagedResponse<BookResponse> getBooksByCategory(Long categoryId, int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Book> books = bookRepository.findByCategory(categoryId, pageable);
            if (books.getNumberOfElements() == 0) {
                return new PagedResponse<>(Collections.emptyList(), books.getNumber(), books.getSize(),
                        books.getTotalElements(), books.getTotalPages(), books.isLast());
            }
            List<BookResponse> results = books.getContent().stream().map(book -> {
                return new BookResponse(book.getId(), book.getTitle(), book.getDescription(),
                        book.getCategories().stream().map(category -> {
                            return category.getName();
                        }).collect(Collectors.toList()), book.getAuthors().stream().map(author -> {
                            return author.getName();
                        }).collect(Collectors.toList()));
            }).collect(Collectors.toList());
            return new PagedResponse<>(results, books.getNumber(), books.getSize(), books.getTotalElements(),
                    books.getTotalPages(), books.isLast());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new PagedResponse<BookResponse>();
    }

    public PagedResponse<BookResponse> searchBooksByFilter(String bookName, String authorName, Long categoryId,
            int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Book> books = bookRepository.searchBooksByFilter(bookName, authorName, categoryId, pageable);
            if (books.getNumberOfElements() == 0) {
                return new PagedResponse<>(Collections.emptyList(), books.getNumber(), books.getSize(),
                        books.getTotalElements(), books.getTotalPages(), books.isLast());
            }
            List<BookResponse> results = books.getContent().stream().map(book -> {
                logger.info("image path: " + BOOK_GALLERY_COVER + "/" + book.getId().toString() + "/gallery_cover.jpg");
                BookResponse res =  new BookResponse(book.getId(), book.getTitle(), book.getDescription(),
                book.getCategories().stream().map(category -> {
                    return category.getName();
                }).collect(Collectors.toList()), book.getAuthors().stream().map(author -> {
                    return author.getName();
                }).collect(Collectors.toList()));
                try {
                    Path path = Paths.get(BOOK_GALLERY_COVER + "/" + book.getId().toString() + "/gallery_cover.jpg");
                    byte[] imageStream = Files.readAllBytes(path);
                    res.setImageStream(imageStream);
                    logger.info("image stream: " + Integer.toString(imageStream.length));
                    return res;
                } catch (IOException e) {
                    e.printStackTrace();
                    logger.error("Read gallery cover error");
                }
                return res;
            }).collect(Collectors.toList());
            return new PagedResponse<>(results, books.getNumber(), books.getSize(), books.getTotalElements(),
                    books.getTotalPages(), books.isLast());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new PagedResponse<BookResponse>();
    }

    public PagedResponse<BookResponse> getAllBooks(int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Book> books = bookRepository.getAllBooks(pageable);
            if (books.getNumberOfElements() == 0) {
                return new PagedResponse<>(Collections.emptyList(), books.getNumber(), books.getSize(), books.getTotalElements(), books.getTotalPages(), books.isLast());
            }
            List<BookResponse> results = books.getContent().stream().map(book -> {
                return new BookResponse(
                    book.getId(),
                    book.getTitle(),
                    book.getDescription(),
                    book.getCategories().stream().map(category -> {
                        return category.getName();
                    }).collect(Collectors.toList()),
                    book.getAuthors().stream().map(author -> {
                        return author.getName();
                    }).collect(Collectors.toList())
                );
            }).collect(Collectors.toList());
            return new PagedResponse<>(results, books.getNumber(), books.getSize(), books.getTotalElements(), books.getTotalPages(), books.isLast());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new PagedResponse<BookResponse>();
    }

    public List<Book> getAll() {
        return bookRepository.getAll();
    }

    public BookResponse getBookById(String id) {
        Book book = bookRepository.findById(Long.parseLong(id)).get();
        BookResponse res = new BookResponse();
        try {
            Path path = Paths.get(BOOK_GALLERY_COVER + "/" + book.getId().toString() + "/gallery_cover.jpg");
            byte[] imageStream = Files.readAllBytes(path);
            List<String> categories = book.getCategories().stream().map(c -> c.getName()).collect(Collectors.toList());
            List<String> authors = book.getAuthors().stream().map(b -> b.getName()).collect(Collectors.toList());
            res = new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getDescription(),
                categories,
                authors,
                imageStream,
                book.getPrice(),
                book.getFormat(),
                book.getDimensions(),
                book.getPublicationDate(),
                book.getPublisher(),
                book.getPublicanCountry(),
                book.getLanguage(),
                book.getIsbn10(),
                book.getIsbn13(),
                book.getRank()
            );
        } catch(Exception e) {
            e.printStackTrace();
            logger.error("Get book error: (BookId) " + book.getId());
        }
        return res;
    }

    public List<PaymentBookItem> getBooksByIds(Long[] ids) {
        List<PaymentBookItem> paymentBookItems = null;
        try {
            List<Book> books = bookRepository.getBooksByIds(ids);
            paymentBookItems = books.stream().map(book -> {
                List<String> categories = book.getCategories().stream().map(c -> c.getName()).collect(Collectors.toList());
                List<String> authors = book.getAuthors().stream().map(b -> b.getName()).collect(Collectors.toList());
                PaymentBookItem paymentBookItem = new PaymentBookItem();
                paymentBookItem.setId(book.getId());
                paymentBookItem.setAuthors(authors);
                paymentBookItem.setCategories(categories);
                paymentBookItem.setLanguage(book.getLanguage());
                paymentBookItem.setPrice(book.getPrice());
                paymentBookItem.setTitle(book.getTitle());
                return paymentBookItem;
            }).collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return paymentBookItems;
    }
}