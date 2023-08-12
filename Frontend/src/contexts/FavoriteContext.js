import React, { createContext, useState } from 'react';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [FavoriteCart, setFavoriteCart] = useState([]);


  const addToFavoriteCart = (product) => {
    setFavoriteCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((p) => p.nameProduct === product.nameProduct);
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        const existingProduct = updatedCart[existingProductIndex];
        const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity + product.quantity };
        updatedCart[existingProductIndex] = updatedProduct;
        return updatedCart;
      } else {
        const newProduct = { ...product, quantity: product.quantity };
        return [...prevCart, newProduct];
      }
    });
      // if (existingProduct) {
      //   return prevCart.map((p) =>
      //     p.nameProduct === product.nameProduct
      //       ? { ...p, quantity: p.quantity + product.quantity }
      //       : p
      //   );
      // } else {
      //   return [...prevCart, product];
      // }
    // });
  };
  const removeFromFavortieCart = (index) => {
    setFavoriteCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart.splice(index, 1);
      return updatedCart;
    });
  };
  

  return (
    <FavoriteContext.Provider value={{ FavoriteCart, addToFavoriteCart,removeFromFavortieCart }}>
      {children}
    </FavoriteContext.Provider>
  );
};
