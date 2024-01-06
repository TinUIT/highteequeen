package com.highteequeen.highteequeen_backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.highteequeen.highteequeen_backend.components.LocalizationUtils;
import com.highteequeen.highteequeen_backend.dtos.ProductDTO;
import com.highteequeen.highteequeen_backend.dtos.ProductImageDTO;
import com.highteequeen.highteequeen_backend.dtos.request.ProductRequest;
import com.highteequeen.highteequeen_backend.entity.Product;
import com.highteequeen.highteequeen_backend.entity.ProductImage;
import com.highteequeen.highteequeen_backend.exeptions.DataNotFoundException;
import com.highteequeen.highteequeen_backend.responses.ProductListResponse;
import com.highteequeen.highteequeen_backend.responses.ProductResponse;
import com.highteequeen.highteequeen_backend.services.IProductService;
import com.highteequeen.highteequeen_backend.services.IUserService;
import com.highteequeen.highteequeen_backend.utils.MessageKeys;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${api.prefix}/products")
@RequiredArgsConstructor
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    private final IProductService productService;
    private final IUserService userService;
    private final LocalizationUtils localizationUtils;
    @PostMapping(value = "", consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createProduct(
            @Valid @ModelAttribute ProductRequest productRequest,
            BindingResult result
    ) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            ProductDTO productDTO = convertToProductDTO(productRequest);
            Product newProduct = productService.createProduct(productDTO);
            for (MultipartFile file : productRequest.getImages()) {
                if(file.getSize() == 0) {
                    continue;
                }
                if(file.getSize() > 10 * 1024 * 1024) {
                    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                            .body(localizationUtils
                                    .getLocalizedMessage(MessageKeys.UPLOAD_IMAGES_FILE_LARGE));
                }
                String contentType = file.getContentType();
                if(contentType == null || !contentType.startsWith("image/")) {
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                            .body(localizationUtils.getLocalizedMessage(MessageKeys.UPLOAD_IMAGES_FILE_MUST_BE_IMAGE));
                }
                String filename = productService.storeFile(file);
                ProductImage productImage = productService.createProductImage(
                        newProduct.getId(),
                        ProductImageDTO.builder()
                                .imageUrl(filename)
                                .build()
                );
            }

            return ResponseEntity.ok(newProduct);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    private ProductDTO convertToProductDTO(ProductRequest productRequest) {
        return ProductDTO.builder()
                .name(productRequest.getName())
                .price(productRequest.getPrice())
                .inStock(productRequest.getInStock())
                .description(productRequest.getDescription())
                .categoryId(productRequest.getCategoryId())
                .brandId(productRequest.getBrandId())
                .discountPercent(0)
                .build();
    }
    @PostMapping(value = "uploads/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> uploadImages(
            @PathVariable("id") Long productId,
            @ModelAttribute("files") List<MultipartFile> files
    ){
        try {
            Product existingProduct = productService.getProductById(productId);
            files = files == null ? new ArrayList<MultipartFile>() : files;
            if(files.size() > ProductImage.MAXIMUM_IMAGES_PER_PRODUCT) {
                return ResponseEntity.badRequest().body(localizationUtils
                        .getLocalizedMessage(MessageKeys.UPLOAD_IMAGES_MAX_5));
            }
            List<ProductImage> productImages = new ArrayList<>();
            for (MultipartFile file : files) {
                if(file.getSize() == 0) {
                    continue;
                }
                if(file.getSize() > 10 * 1024 * 1024) {
                    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                            .body(localizationUtils
                                    .getLocalizedMessage(MessageKeys.UPLOAD_IMAGES_FILE_LARGE));
                }
                String contentType = file.getContentType();
                if(contentType == null || !contentType.startsWith("image/")) {
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                            .body(localizationUtils.getLocalizedMessage(MessageKeys.UPLOAD_IMAGES_FILE_MUST_BE_IMAGE));
                }
                String filename = productService.storeFile(file);
                ProductImage productImage = productService.createProductImage(
                        existingProduct.getId(),
                        ProductImageDTO.builder()
                                .imageUrl(filename)
                                .build()
                );
                productImages.add(productImage);
            }
            return ResponseEntity.ok().body(productImages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/images/{imageName}")
    public ResponseEntity<?> viewImage(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get("uploads/"+imageName);
            UrlResource resource = new UrlResource(imagePath.toUri());
            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(new UrlResource(Paths.get("uploads/notfound.jpeg").toUri()));
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("")
    public ResponseEntity<ProductListResponse> getProducts(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0", name = "category_id") Long categoryId,
            @RequestParam(defaultValue = "0", name = "brand_id") Long brandId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String priceSort
    ) {
        PageRequest pageRequest = createPageRequest(page, limit, priceSort);

        logger.info(String.format("keyword = %s, category_id = %d, brand_id = %d, page = %d, limit = %d",
                keyword, categoryId, brandId, page, limit));

        Page<ProductResponse> productPage = productService
                .getAllProducts(keyword, categoryId, brandId, pageRequest);

        List<ProductResponse> productResponses = productPage.getContent();
        int totalPages = productPage.getTotalPages();

        return ResponseEntity.ok(ProductListResponse
                .builder()
                .products(productResponses)
                .totalPages(totalPages)
                .build());
    }

    private PageRequest createPageRequest(int page, int limit, String priceSort) {
        if (priceSort.equalsIgnoreCase("asc")) {
            return PageRequest.of(page, limit, Sort.by("price").ascending());
        } else if (priceSort.equalsIgnoreCase("des")) {
            return PageRequest.of(page, limit, Sort.by("price").descending());
        }
        return PageRequest.of(page, limit, Sort.by("id").ascending());
    }

    @GetMapping("/best-sellers")
    public ResponseEntity<?> getBestSellingProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit
    ) {
        try {
            int totalPages = 0;
            PageRequest pageRequest = PageRequest.of(
                    page, limit,
                    Sort.by("salesCount").descending()
            );
            Page<ProductResponse> productPage = productService
                    .getBestSellingProducts(pageRequest);
            totalPages = productPage.getTotalPages();
            List<ProductResponse> productResponses = productPage.getContent();
            for (ProductResponse product : productResponses) {
                product.setTotalPages(totalPages);
            }
            return ResponseEntity.ok(ProductListResponse
                    .builder()
                    .products(productResponses)
                    .totalPages(totalPages)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    @GetMapping("/discounted")
    public ResponseEntity<ProductListResponse> getDiscountedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit
    ) {
        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by("discountPercent").descending());
        Page<ProductResponse> productPage = productService.findProductsByDiscountPercentDesc(pageRequest);
        int totalPages = productPage.getTotalPages();
        List<ProductResponse> productResponses = productPage.getContent();
        for (ProductResponse product : productResponses) {
            product.setTotalPages(totalPages);
        }
        return ResponseEntity.ok(ProductListResponse.builder()
                .products(productResponses)
                .totalPages(totalPages)
                .build());
    }

    @GetMapping("/most-favorite")
    public ResponseEntity<ProductListResponse> getMostFavoritedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit
    ) {
        PageRequest pageRequest = PageRequest.of(page, limit);
        Page<ProductResponse> productPage = productService.findMostFavoritedProducts(pageRequest);
        int totalPages = productPage.getTotalPages();
        List<ProductResponse> productResponses = productPage.getContent();
        for (ProductResponse product : productResponses) {
            product.setTotalPages(totalPages);
        }
        return ResponseEntity.ok(ProductListResponse.builder()
                .products(productResponses)
                .totalPages(totalPages)
                .build());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(
            @PathVariable("id") Long productId
    ) {
        try {
            Product existingProduct = productService.getProductById(productId);
            return ResponseEntity.ok(ProductResponse.fromProduct(existingProduct));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    @GetMapping("/by-ids")
    public ResponseEntity<?> getProductsByIds(@RequestParam("ids") String ids) {
        try {
            List<Long> productIds = Arrays.stream(ids.split(","))
                    .map(Long::parseLong)
                    .collect(Collectors.toList());
            List<Product> products = productService.findProductsByIds(productIds);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<String> deleteProduct(@PathVariable long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok(String.format("Product with id = %d deleted successfully", id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateProduct(
            @PathVariable long id,
            @RequestBody ProductDTO productDTO) {
        try {
            Product updatedProduct = productService.updateProduct(id, productDTO);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PostMapping("/upload-excel")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseBody
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "Vui lòng chọn một tệp để tải lên.");
            return ResponseEntity.badRequest().body("Vui lòng chọn một tệp để tải lên.");
        }
        try {
            List<Product> products = productService.createProductsFromExcel(file);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Lỗi khi xử lý tệp Excel: " + e.getMessage());
        }
    }

    @PutMapping("/favorites/add")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<String> addFavorite(@RequestParam Long userId, @RequestParam Long productId) throws DataNotFoundException {
        userService.addProductToFavorites(userId, productId);
        return ResponseEntity.ok("Product added to favorites");
    }
}
