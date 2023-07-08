package com.highteequeen.highteequeen_backend.service;

import com.highteequeen.highteequeen_backend.dto.FavoriteDto;
import com.highteequeen.highteequeen_backend.dto.ProductDto;
import com.highteequeen.highteequeen_backend.model.Customer;
import com.highteequeen.highteequeen_backend.model.Favorite;
import com.highteequeen.highteequeen_backend.model.Product;
import com.highteequeen.highteequeen_backend.repository.CustomerRepository;
import com.highteequeen.highteequeen_backend.repository.FavoriteRepository;
import com.highteequeen.highteequeen_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private FavoriteRepository favoriteRepository;

    public Favorite addFavorite(Integer customerId, Long productId) {
        Favorite favorite = favoriteRepository.findByCustomerId(customerId);
        List<Product> products = new ArrayList<>();
        if(favorite == null){
            Optional<Customer> customer = customerRepository.findById(customerId);
            favorite = new Favorite();
            favorite.setCustomer(customer.get());
        } else {
            products = favorite.getProducts();
        }

        Optional<Product> product = productRepository.findById(productId);
        products.add(product.get());
        favorite.setProducts(products);
        favoriteRepository.save(favorite);
        return favorite;
    }

    public FavoriteDto getFavorite(Integer customerId) {
        Favorite favorite = favoriteRepository.findByCustomerId(customerId);
        return convertFavoriteToFavoriteDto(favorite);
    }


    public FavoriteDto convertFavoriteToFavoriteDto(Favorite favorite) {
        FavoriteDto favoriteDto = new FavoriteDto();
        favoriteDto.setCustomerId(favorite.getCustomer().getCustomerId());

        List<ProductDto> productDtos = new ArrayList<>();
        for(Product product : favorite.getProducts()){
            productDtos.add(convertProductToProductDto(product));
        }
        favoriteDto.setProducts(productDtos);

        return favoriteDto;
    }

    public ProductDto convertProductToProductDto(Product product){
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getProductId());
        productDto.setName(product.getName());
        productDto.setPrice(product.getPrice());
        productDto.setCategoryName(product.getCategory().getName());
        productDto.setSales(product.getSales());
        productDto.setSold(product.getSold());
        productDto.setImage(product.getImage());
        productDto.setBrand(product.getBrand());
        productDto.setOrigin(product.getOrigin());
        productDto.setDescription(product.getDescription());

        return productDto;
    }

}

