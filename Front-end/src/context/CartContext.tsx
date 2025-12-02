import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  total: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}


  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Robust price parser: strips currency symbols, commas and spaces, supports decimals
  const parsePrice = (price: string | number) => {
    if (typeof price === 'number') return price;
    if (!price) return 0;
    const cleaned = String(price).replace(/[^0-9.-]+/g, '');
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
  };

  // Use useMemo so total recalculates only when cart changes
  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = parsePrice(item.price);
      const qty = item.quantity ?? 0;
      return sum + price * qty;
    }, 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
