package com.highteequeen.highteequeen_backend.services;

import com.highteequeen.highteequeen_backend.dtos.BrandDTO;
import com.highteequeen.highteequeen_backend.entity.Brand;

import java.util.List;

public interface IBrandService {
    Brand createBrand(BrandDTO brand);
    Brand getBrandById(long id);
    List<Brand> getAllBrands();
    Brand updateBrand(long categoryId, BrandDTO category);
    void deleteBrand(long id);
}
