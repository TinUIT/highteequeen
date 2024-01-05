package com.highteequeen.highteequeen_backend.controllers;

import com.highteequeen.highteequeen_backend.components.LocalizationUtils;
import com.highteequeen.highteequeen_backend.dtos.BrandDTO;
import com.highteequeen.highteequeen_backend.entity.Brand;
import com.highteequeen.highteequeen_backend.responses.BrandResponse;
import com.highteequeen.highteequeen_backend.responses.UpdateBrandResponse;
import com.highteequeen.highteequeen_backend.services.impl.BrandService;
import com.highteequeen.highteequeen_backend.utils.MessageKeys;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/brands")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService brandService;
    private final LocalizationUtils localizationUtils;
    @PostMapping("")
    public ResponseEntity<BrandResponse> createBrand(
            @Valid @RequestBody BrandDTO brandDTO,
            BindingResult result) {
        BrandResponse brandResponse = new BrandResponse();
        if(result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            brandResponse.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.INSERT_BRAND_FAILED));
            brandResponse.setErrors(errorMessages);
            return ResponseEntity.badRequest().body(brandResponse);
        }
        Brand brand = brandService.createBrand(brandDTO);
        brandResponse.setBrand(brand);
        return ResponseEntity.ok(brandResponse);
    }

    @GetMapping("")
    public ResponseEntity<List<Brand>> getAllBrands(
            @RequestParam("page")     int page,
            @RequestParam("limit")    int limit
    ) {
        List<Brand> brands = brandService.getAllBrands();
        return ResponseEntity.ok(brands);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UpdateBrandResponse> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody BrandDTO brandDTO
    ) {
        UpdateBrandResponse updateBrandResponse = new UpdateBrandResponse();
        brandService.updateBrand(id, brandDTO);
        updateBrandResponse.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.UPDATE_BRAND_SUCCESSFULLY));
        return ResponseEntity.ok(updateBrandResponse);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBrand(@PathVariable Long id) {
        brandService.deleteBrand(id);
        return ResponseEntity.ok(localizationUtils.getLocalizedMessage(MessageKeys.DELETE_BRAND_SUCCESSFULLY));
    }
}

