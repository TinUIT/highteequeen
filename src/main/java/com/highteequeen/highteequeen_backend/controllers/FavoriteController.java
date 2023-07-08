package com.highteequeen.highteequeen_backend.controllers;

import com.highteequeen.highteequeen_backend.model.Favorite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/favorite")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping("/{customerId}/{productId}")
    public ResponseEntity<?> addFavorite(@PathVariable Integer customerId, @PathVariable Long productId) {
        try {
            Favorite favorite = favoriteService.addFavorite(customerId, productId);
            return new ResponseEntity<>(favorite, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

//    @GetMapping("/{customerId}")
//    public ResponseEntity<?> getFavorite(@PathVariable Integer customerId) {
//        try {
//            Favorite favorite = favoriteService.addFavorite(customerId, productId);
//            return new ResponseEntity<>(favorite, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
}
