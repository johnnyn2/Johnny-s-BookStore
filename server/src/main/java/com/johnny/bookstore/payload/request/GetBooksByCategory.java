package com.johnny.bookstore.payload.request;

public class GetBooksByCategory {
    private Long categoryId;
    private int page;
    private int size;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public GetBooksByCategory(Long categoryId, int page, int size) {
        this.categoryId = categoryId;
        this.page = page;
        this.size = size;
    }

}
