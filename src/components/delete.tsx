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

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

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
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Initialize with some demo users in localStorage if not exists
  const initializeUsers = () => {
    const existingUsers = localStorage.getItem('henHavenUsers');
    if (!existingUsers) {
      const demoUsers = [
        {
          id: '1',
          email: 'john.doe@example.com',
          name: 'John Doe',
          password: 'password123'
        },
        {
          id: '2',
          email: 'jane.smith@example.com',
          name: 'Jane Smith',
          password: 'password123'

