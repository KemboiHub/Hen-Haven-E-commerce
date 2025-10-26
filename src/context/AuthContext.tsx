import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: { name: string; email: string; password: string; phone: string }) => Promise<boolean>;
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
        }
      ];
      localStorage.setItem('henHavenUsers', JSON.stringify(demoUsers));
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    initializeUsers();
    const users = JSON.parse(localStorage.getItem('henHavenUsers') || '[]');

    // Check if user exists
    const foundUser = users.find((u: any) => u.email === email);

    if (!foundUser) {
      throw new Error('No account found with this email address. Please check your email or sign up for a new account.');
    }

    // Check if password matches
    if (foundUser.password !== password) {
      throw new Error('Incorrect password. Please try again or reset your password.');
    }

    // Successful login
    const userData: User = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
    };
    setUser(userData);
    // Store current user session
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return true;
  };

  const signup = async (userData: { name: string; email: string; password: string; phone: string }): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    initializeUsers();
    const users = JSON.parse(localStorage.getItem('henHavenUsers') || '[]');

    // Check if user already exists
    const existingUser = users.find((u: any) => u.email === userData.email);
    if (existingUser) {
      throw new Error('An account with this email already exists');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      password: userData.password,
      phone: userData.phone,
    };

    users.push(newUser);
    localStorage.setItem('henHavenUsers', JSON.stringify(users));

    const userDataToSet: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      phone: newUser.phone,
    };
    setUser(userDataToSet);
    localStorage.setItem('currentUser', JSON.stringify(userDataToSet));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
