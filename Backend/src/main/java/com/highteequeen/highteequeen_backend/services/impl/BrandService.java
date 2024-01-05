package com.highteequeen.highteequeen_backend.services.impl;

import com.highteequeen.highteequeen_backend.dtos.BrandDTO;
import com.highteequeen.highteequeen_backend.entity.Brand;
import com.highteequeen.highteequeen_backend.repositories.BrandRepository;
import com.highteequeen.highteequeen_backend.services.IBrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService implements IBrandService {
    private final BrandRepository brandRepository;
    @Override
    public Brand createBrand(BrandDTO brandDTO) {
        Brand newBrand = Brand
                .builder()
                .name(brandDTO.getName())
                .image("")
                .build();
        return brandRepository.save(newBrand);
    }

    @Override
    public Brand getBrandById(long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found"));
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public Brand updateBrand(long brandId,
                                   BrandDTO brandDTO) {
        Brand existingBrand = getBrandById(brandId);
        existingBrand.setName(brandDTO.getName());
        brandRepository.save(existingBrand);
        return existingBrand;
    }

    @Override
    public void deleteBrand(long id) {
        brandRepository.deleteById(id);
    }
}


