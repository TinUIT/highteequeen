package com.highteequeen.highteequeen_backend.services;

import com.highteequeen.highteequeen_backend.dtos.CategoryDTO;
import com.highteequeen.highteequeen_backend.entity.Category;

import java.util.List;

public interface ICategoryService {
    Category createCategory(CategoryDTO category);
    Category getCategoryById(long id);
    List<Category> getAllCategories();
    Category updateCategory(long categoryId, CategoryDTO category);
    void deleteCategory(long id);
}

