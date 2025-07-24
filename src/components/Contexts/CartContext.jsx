import { createContext, useContext, useState, useEffect,useMemo } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // const addToCart = (product) => {
  //   setCartItems((prevItems) => {
  //     const existing = prevItems.find((item) => item.id === product.id);
  //     if (existing) {
  //       return prevItems.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     }
  //     return [...prevItems, { ...product, quantity: 1 }];
  //   });
  // };
const addToCart = (newItem) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find(item => item.id === newItem.id);
    if (existingItem) {
      // Update quantity (add or replace based on your use-case)
      return prevItems.map(item =>
        item.id === newItem.id
          ? { ...item, quantity: newItem.quantity }
          : item
      );
    } else {
      return [...prevItems, newItem];
    }
  });
};
//   const addToCart = (product, quantity = 1) => {
//   setCartItems((prevItems) => {
//     const exists = prevItems.some((item) => item.id === product.id);
//     if (exists) return prevItems; // Already in cart, do nothing
//     return [...prevItems, { ...product, quantity }];
//   });
// };
  const removeFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((items) =>
        items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const rawPrice = item.offer_price ?? item.price ?? "0";
      const cleanPrice = parseFloat(
        String(rawPrice).replace(/[^0-9.]/g, "")
      );
      const quantity = parseInt(item.quantity) || 1;
  
      if (isNaN(cleanPrice) || isNaN(quantity)) return total;
  
      return total + cleanPrice * quantity;
    }, 0);
  }, [cartItems]);

  const clearCart = () => setCartItems([]);
;



  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
         subtotal
      
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
