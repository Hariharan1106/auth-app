import { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (e.g., from session)
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // You might need to implement a /me endpoint or use a session check
      // For now, we'll assume the user is not logged in initially
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await ApiService.post('/auth/signin', { email, password });
      setUser(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userName, email, password) => {
    try {
      const response = await ApiService.post('/auth/signup', { userName, email, password });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await ApiService.post('/auth/signout');
      setUser(null);
    } catch (error) {
      // Even if logout fails, clear local state
      setUser(null);
    }
  };

  const hasRole = (role) => {
    return user && user.role === role;
  };

  const hasAnyRole = (roles) => {
    return user && roles.includes(user.role);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    hasRole,
    hasAnyRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};