package com.johnny.bookstore.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Metamodel;

import com.johnny.bookstore.model.Author;
import com.johnny.bookstore.model.Book;
import com.johnny.bookstore.model.Category;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class DynamicBookRepositoryImpl implements DynamicBookRepository {
    private static final Logger logger = LoggerFactory.getLogger(DynamicBookRepositoryImpl.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Book> searchBooksByFilter(String title, String authorName, Long categoryId, Pageable pageable) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Book> query = cb.createQuery(Book.class);
        Root<Book> books = query.from(Book.class);
        Join<Book, Category> categories = books.join("categories");
        Join<Book, Author> authors = books.join("authors");

        List<Predicate> predicates = new ArrayList<>();
        if (title != "") {
            predicates.add(cb.equal(books.get("title"), title));
        }
        if (authorName != "") {
            predicates.add(cb.equal(authors.get("name"), authorName));
        }
        if (categoryId != -1) {
            predicates.add(cb.equal(categories.get("id"), categoryId));
        }

        query.distinct(true).select(books).where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
        Query typedQuery = entityManager.createQuery(query);
        typedQuery.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        typedQuery.setMaxResults(pageable.getPageSize());
  
        List<Book> results = typedQuery.getResultList();
        Page<Book> bookPage = new PageImpl<Book>(results, pageable, results.size());
        return bookPage;
    }
    
}
