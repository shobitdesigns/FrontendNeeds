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


const addToCart = (product) => {
  setCartItems((prevItems) => {
    const exists = prevItems.some((item) => item.id === product.id);
    if (exists) return prevItems; 

    return [...prevItems, { ...product, quantity: 1 }];
  });
};
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
