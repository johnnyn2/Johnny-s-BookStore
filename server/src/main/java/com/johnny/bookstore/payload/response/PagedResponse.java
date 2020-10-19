package com.johnny.bookstore.payload.response;

import java.util.List;

public class PagedResponse<T> {
    private List<T> content;
    private int page;
    private Long totalElements;
    private int totlaPages;
    private boolean last;

    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public Long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(Long totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotlaPages() {
        return totlaPages;
    }

    public void setTotlaPages(int totlaPages) {
        this.totlaPages = totlaPages;
    }

    public boolean isLast() {
        return last;
    }

    public void setLast(boolean last) {
        this.last = last;
    }

    public PagedResponse() {
    }

    public PagedResponse(List<T> content, int page, Long totalElements, int totlaPages, boolean last) {
        this.content = content;
        this.page = page;
        this.totalElements = totalElements;
        this.totlaPages = totlaPages;
        this.last = last;
    }

    
}