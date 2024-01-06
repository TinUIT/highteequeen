package com.highteequeen.highteequeen_backend.services.impl;

import com.highteequeen.highteequeen_backend.dtos.ProductDTO;
import com.highteequeen.highteequeen_backend.dtos.ProductImageDTO;
import com.highteequeen.highteequeen_backend.entity.Brand;
import com.highteequeen.highteequeen_backend.entity.Category;
import com.highteequeen.highteequeen_backend.entity.Product;
import com.highteequeen.highteequeen_backend.entity.ProductImage;
import com.highteequeen.highteequeen_backend.exeptions.DataNotFoundException;
import com.highteequeen.highteequeen_backend.exeptions.InvalidParamException;
import com.highteequeen.highteequeen_backend.repositories.BrandRepository;
import com.highteequeen.highteequeen_backend.repositories.CategoryRepository;
import com.highteequeen.highteequeen_backend.repositories.ProductImageRepository;
import com.highteequeen.highteequeen_backend.repositories.ProductRepository;
import com.highteequeen.highteequeen_backend.responses.ProductResponse;
import com.highteequeen.highteequeen_backend.services.IProductService;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final ProductImageRepository productImageRepository;
    private static String UPLOADS_FOLDER = "uploads";
    @Override
    @Transactional
    public Product createProduct(ProductDTO productDTO) throws DataNotFoundException {
        Category existingCategory = categoryRepository
                .findById(productDTO.getCategoryId())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find category with id: "+productDTO.getCategoryId()));
        Brand existingBrand = brandRepository
                .findById(productDTO.getBrandId())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find brand with id: "+productDTO.getBrandId()));

        Product newProduct = Product.builder()
                .name(productDTO.getName())
                .price(productDTO.getPrice())
                .salesCount(0L)
                .thumbnail(productDTO.getThumbnail())
                .description(productDTO.getDescription())
                .inStock(productDTO.getInStock())
                .category(existingCategory)
                .brand(existingBrand)
                .build();
        return productRepository.save(newProduct);
    }

    @Override
    public Product getProductById(long productId) throws Exception {
        Optional<Product> optionalProduct = productRepository.getDetailProduct(productId);
        if(optionalProduct.isPresent()) {
            return optionalProduct.get();
        }
        throw new DataNotFoundException("Cannot find product with id =" + productId);
    }

    @Override
    public Page<ProductResponse> getAllProducts(String keyword,
                                                Long categoryId, Long brandId, PageRequest pageRequest) {
        Page<Product> productsPage;
        productsPage = productRepository.searchProducts(categoryId, brandId, keyword, pageRequest);
        return productsPage.map(ProductResponse::fromProduct);
    }

    @Override
    @Transactional
    public Product updateProduct(
            long id,
            ProductDTO productDTO
    )
            throws Exception {
        Product existingProduct = getProductById(id);
        if(existingProduct != null) {
            Category existingCategory = categoryRepository
                    .findById(productDTO.getCategoryId())
                    .orElseThrow(() ->
                            new DataNotFoundException(
                                    "Cannot find category with id: "+productDTO.getCategoryId()));
            if(productDTO.getName() != null && !productDTO.getName().isEmpty()) {
                existingProduct.setName(productDTO.getName());
            }

            existingProduct.setCategory(existingCategory);
            if(productDTO.getPrice() >= 0) {
                existingProduct.setPrice(productDTO.getPrice());
            }
            if(productDTO.getDescription() != null &&
                    !productDTO.getDescription().isEmpty()) {
                existingProduct.setDescription(productDTO.getDescription());
            }
            if(productDTO.getThumbnail() != null &&
                    !productDTO.getThumbnail().isEmpty()) {
                existingProduct.setThumbnail(productDTO.getThumbnail());
            }
            if(productDTO.getInStock() >= 0) {
                existingProduct.setInStock(productDTO.getInStock());
            }
            return productRepository.save(existingProduct);
        }
        return null;
    }

    @Override
    @Transactional
    public void deleteProduct(long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        optionalProduct.ifPresent(productRepository::delete);
    }

    @Override
    public boolean existsByName(String name) {
        return productRepository.existsByName(name);
    }
    @Transactional
    public ProductImage createProductImage(
            Long productId,
            ProductImageDTO productImageDTO) throws Exception {
        Product existingProduct = productRepository
                .findById(productId)
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find product with id: "+productImageDTO.getProductId()));
        ProductImage newProductImage = ProductImage.builder()
                .product(existingProduct)
                .imageUrl(productImageDTO.getImageUrl())
                .build();
        int size = productImageRepository.findByProductId(productId).size();
        if(size >= ProductImage.MAXIMUM_IMAGES_PER_PRODUCT) {
            throw new InvalidParamException(
                    "Number of images must be <= "
                            +ProductImage.MAXIMUM_IMAGES_PER_PRODUCT);
        }
        if (existingProduct.getThumbnail() == null ) {
            existingProduct.setThumbnail(newProductImage.getImageUrl());
        }
        productRepository.save(existingProduct);
        return productImageRepository.save(newProductImage);
    }

    @Override
    public List<Product> findProductsByIds(List<Long> productIds) {
        return productRepository.findProductsByIds(productIds);
    }

    @Override
    public void deleteFile(String filename) throws IOException {
        java.nio.file.Path uploadDir = Paths.get(UPLOADS_FOLDER);
        java.nio.file.Path filePath = uploadDir.resolve(filename);

        if (Files.exists(filePath)) {
            Files.delete(filePath);
        } else {
            throw new FileNotFoundException("File not found: " + filename);
        }
    }

    @Override
    public Page<ProductResponse>  getBestSellingProducts(PageRequest pageRequest) {
        Page<Product> productsPage;
        productsPage = productRepository.searchBestSellingProducts(pageRequest);
        return productsPage.map(ProductResponse::fromProduct);
    }

    @Override
    public Page<ProductResponse> findProductsByDiscountPercentDesc(PageRequest pageRequest) {
        Page<Product> productsPage;
        productsPage = productRepository.findAllByOrderByDiscountPercentDesc(pageRequest);
        return productsPage.map(ProductResponse::fromProduct);
    }
    public Page<ProductResponse> findMostFavoritedProducts(PageRequest pageRequest) {
        Page<Product> productsPage;
        productsPage = productRepository.findProductsByMostFavorited(pageRequest);
        return productsPage.map(ProductResponse::fromProduct);
    }

    private boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image/");
    }

    @Override
    public String storeFile(MultipartFile file) throws IOException {
        if (!isImageFile(file) || file.getOriginalFilename() == null) {
            throw new IOException("Invalid image format");
        }
        String filename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String uniqueFilename = UUID.randomUUID().toString() + "_" + filename;
        java.nio.file.Path uploadDir = Paths.get(UPLOADS_FOLDER);
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        java.nio.file.Path destination = Paths.get(uploadDir.toString(), uniqueFilename);
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFilename;
    }

    @Override
    @Transactional
    public List<Product> createProductsFromExcel(MultipartFile file) throws IOException, DataNotFoundException {
        InputStream inputStream = file.getInputStream();
        Workbook workbook = new XSSFWorkbook(inputStream);

        Sheet sheet = workbook.getSheetAt(0);

        List<Product> products = new ArrayList<>();

        for (Row row : sheet) {
            // Bỏ qua hàng đầu tiên (tiêu đề)
            if (row.getRowNum() == 0) {
                continue;
            }

            ProductDTO productDTO = new ProductDTO();
            productDTO.setName(row.getCell(0).toString()); // Giả định rằng tên sản phẩm ở cột đầu tiên
            productDTO.setCategoryId((long) row.getCell(1).getNumericCellValue());
            productDTO.setPrice((float) row.getCell(2).getNumericCellValue()); // Giả định rằng giá ở cột thứ hai
            productDTO.setDescription(row.getCell(3).toString());
            productDTO.setThumbnail(row.getCell(4).toString());

            // Sử dụng phương thức hiện tại để tạo một sản phẩm
            Product newProduct = createProduct(productDTO);
            products.add(newProduct);
        }

        workbook.close();
        inputStream.close();

        return products;
    }
}