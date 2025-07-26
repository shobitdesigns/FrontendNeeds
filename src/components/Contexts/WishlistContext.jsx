// context/WishlistContext.js
import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // const addToWishlist = (product) => {
  //   const exists = wishlist.find((item) => item.id === product.id);
  //   if (!exists) setWishlist([...wishlist, product]);
  // };
  const addToWishlist = (product) => {
  const exists = wishlist.find((item) => item.id === product.id);
  if (!exists) {
    const productWithQuantity = { ...product, quantity: 1 };
    setWishlist([...wishlist, productWithQuantity]);
  }
};

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);
  const clearWishlist = () => {
    setWishlist([]);
  };
  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
