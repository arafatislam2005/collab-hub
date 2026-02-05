import { useState, useEffect } from 'react';
import api from '../api/axios';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setAuthLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
          // Try to get user info from backend
          const response = await api.get('/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);

      return {
        success: true,
        user: userData,
      };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);

      return {
        success: true,
        user: userData,
      };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('token');
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getMe = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;

      const response = await api.get('/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userData = response.data;
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    authLoading,
    register,
    login,
    logout,
    getMe,
  };
};

// Helper function to get user-friendly error messages
const getErrorMessage = (error) => {
  const errorMessages = {
    'user-not-found': 'User not found. Please check your email or register.',
    'wrong-password': 'Incorrect password. Please try again.',
    'email-already-in-use': 'Email is already in use. Please log in or use a different email.',
    'weak-password': 'Password is too weak. Please use at least 6 characters.',
    'invalid-email': 'Invalid email address.',
    'user-disabled': 'User account has been disabled.',
    'too-many-requests': 'Too many login attempts. Please try again later.',
    'network-request-failed': 'Network error. Please check your internet connection.',
  };

  return errorMessages[error] || 'Authentication failed. Please try again.';
};
