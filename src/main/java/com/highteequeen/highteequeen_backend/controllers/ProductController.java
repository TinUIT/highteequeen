package com.highteequeen.highteequeen_backend.controllers;

import com.highteequeen.highteequeen_backend.dto.ProductDto;
import com.highteequeen.highteequeen_backend.model.Product;
import com.highteequeen.highteequeen_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

//    @GetMapping
//    public ResponseEntity<List<Product>> getAllProducts() {
//        List<Product> products = productService.findAll();
//        return new ResponseEntity<>(products, HttpStatus.OK);
//    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductDto>> getProductsByCategory(@PathVariable("category") String category) {
        List<Product> products = productService.findByCategory(category);
        List<ProductDto> productDtos = products.stream()
                .map(product -> {
                    ProductDto dto = new ProductDto();
                    dto.setId(product.getProductId());
                    dto.setName(product.getName());
                    dto.setPrice(product.getPrice());
                    dto.setCategoryName(product.getCategory().getName());
                    return dto;
                })
                .collect(Collectors.toList());
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @GetMapping("/best-brand")
    public ResponseEntity<List<ProductDto>> getBestBrandProduct() {
        List<Product> products = productService.findBestBrandProduct();
        List<ProductDto> productDtos = products.stream()
                .map(product -> {
                    ProductDto dto = new ProductDto();
                    dto.setId(product.getProductId());
                    dto.setName(product.getName());
                    dto.setPrice(product.getPrice());
                    dto.setCategoryName(product.getCategory().getName());
                    dto.setSold(product.getSold());
                    dto.setImage(product.getImage());
                    //dto.setRating(productService.getAverageRating(product.getProductId()));
                    return dto;
                })
                .collect(Collectors.toList());
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @GetMapping("/best-sellers")
    public ResponseEntity<Page<ProductDto>> getBestSellingProducts(@PageableDefault(size = 5) Pageable pageable) {
        Page<Product> products = productService.findByBestSellingProducts(pageable);
        Page<ProductDto> productDtos = products.map(productService::toDto);
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }
    @GetMapping("/best-sellers/top4")
    public ResponseEntity<List<ProductDto>> getTop4BestSellingProduct() {
        List<Product> products = productService.getTop4BestSellingProducts();
        List<ProductDto> productDtos = products.stream()
                .map(product -> {
                    ProductDto dto = new ProductDto();
                    dto.setId(product.getProductId());
                    dto.setName(product.getName());
                    dto.setPrice(product.getPrice());
                    dto.setCategoryName(product.getCategory().getName());
                    dto.setSold(product.getSold());
                    dto.setImage(product.getImage());
                    //dto.setRating(productService.getAverageRating(product.getProductId()));
                    return dto;
                })
                .collect(Collectors.toList());
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }
    @GetMapping("/sales/top4")
    public ResponseEntity<List<ProductDto>> getTop4ProductsBySales() {
        List<Product> products = productService.findTop4BySales();
        List<ProductDto> productDtos = products.stream()
                .map(product -> {
                    ProductDto dto = new ProductDto();
                    dto.setId(product.getProductId());
                    dto.setName(product.getName());
                    dto.setPrice(product.getPrice());
                    dto.setCategoryName(product.getCategory().getName());
                    dto.setSales(product.getSales());
                    dto.setImage(product.getImage());
                    return dto;
                })
                .collect(Collectors.toList());
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @GetMapping("/sales")
    public ResponseEntity<Page<ProductDto>> getProductsBySales(@PageableDefault(size = 5) Pageable pageable) {
        Page<Product> products = productService.findByTopSalesProducts(pageable);
        Page<ProductDto> productDtos = products.map(productService::toDto);
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @GetMapping("/high-price")
    public ResponseEntity<Page<ProductDto>> getProductsByHighPrice(@PageableDefault(size = 5) Pageable pageable) {
        Page<Product> products = productService.findByHighPriceProducts(pageable);
        Page<ProductDto> productDtos = products.map(productService::toDto);
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @GetMapping("/low-price")
    public ResponseEntity<Page<ProductDto>> getProductsByLowPrice(@PageableDefault(size = 5) Pageable pageable) {
        Page<Product> products = productService.findByLowPriceProducts(pageable);
        Page<ProductDto> productDtos = products.map(productService::toDto);
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

    @GetMapping("/search/autocomplete")
    public ResponseEntity<List<ProductDto>> autocomplete(@RequestParam String name) {
        List<Product> products = productService.findByName(name);
        List<ProductDto> productDtos = products.stream()
                .map(product -> {
                    ProductDto dto = new ProductDto();
                    dto.setId(product.getProductId());
                    dto.setName(product.getName());
                    dto.setPrice(product.getPrice());
                    dto.setCategoryName(product.getCategory().getName());
                    dto.setSales(product.getSales());
                    dto.setImage(product.getImage());
                    return dto;
                })
                .collect(Collectors.toList());
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<Page<ProductDto>> getAllProducts(@PageableDefault(size = 5) Pageable pageable) {
        Page<Product> products = productService.findAll(pageable);
        Page<ProductDto> productDtos = products.map(productService::toDto);
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id) {
        Product product = productService.findById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product newProduct = productService.save(product);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") Long id, @RequestBody Product product) {
        Product updatedProduct = productService.update(id, product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long id) {
        productService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}