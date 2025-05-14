
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name?: string;
  subscription?: 'free' | 'premium' | 'enterprise';
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@cybercrew.com',
    password: 'admin123', // In a real app, this would be hashed
    role: 'admin' as const,
    name: 'Admin User',
    subscription: 'enterprise' as const,
  },
  {
    id: '2',
    email: 'demo@cybercrew.com',
    password: 'demo123', // In a real app, this would be hashed
    role: 'user' as const,
    name: 'Demo User',
    subscription: 'premium' as const,
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Error parsing stored user:', err);
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Mock API call
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Remove password from user object before storing
      const { password: _, ...secureUser } = user;
      localStorage.setItem('currentUser', JSON.stringify(secureUser));
      setCurrentUser(secureUser);
      setIsAuthenticated(true);
      toast({
        title: "Login successful",
        description: `Welcome back, ${secureUser.name || secureUser.email}!`,
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      // In a real app, we would make an API call to create the user
      const newUser = {
        id: String(MOCK_USERS.length + 1),
        email,
        name,
        role: 'user' as const,
        subscription: 'free' as const,
      };
      
      // For this demo, we'll log instead of storing
      console.log('New user would be created:', { ...newUser, password: '***' });
      
      // Store and set the new user
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      
      toast({
        title: "Account created",
        description: `Welcome to Cyber Crew Scanner, ${name}!`,
      });
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "An error occurred during signup",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      
      // Check if email exists
      const user = MOCK_USERS.find(u => u.email === email);
      if (!user) {
        throw new Error('Email not found');
      }
      
      // In a real app, we would send a password reset email
      console.log('Password reset would be sent to:', email);
      
      toast({
        title: "Password reset",
        description: "If your email exists in our system, you will receive a password reset link shortly.",
      });
    } catch (error: any) {
      // For security reasons, we don't show specific errors
      toast({
        title: "Password reset",
        description: "If your email exists in our system, you will receive a password reset link shortly.",
      });
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
