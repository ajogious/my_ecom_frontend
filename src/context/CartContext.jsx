import React, { createContext, useState, useEffect } from "react";

// Create the CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart data from localStorage on initial render
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // Save cart data to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const clearCart = () => {
    setCartItems([]);
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        // If the item is already in the cart, update its quantity
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity } // Add the selected quantity to existing one
            : i
        );
      }
      return [...prevItems, { ...item, quantity: item.quantity }]; // Add new item with selected quantity
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        clearCart,
        addToCart,
        removeFromCart,
        increaseQuantity, // Ensure these are included
        decreaseQuantity, // Ensure these are included
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
