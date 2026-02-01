import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState(null);
  const { login, loading, error, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setLocalError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setLocalError('Please fill in all fields');
      return;
    }

    try {
      setLocalError(null);
      await login(formData.email, formData.password);
    } catch (error) {
      console.error('Login failed:', error);
      setLocalError(error.message || 'Login failed');
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-6">Sign in to your account</p>

        {displayError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-600 bg-opacity-20 border border-red-500 text-red-200 p-3 rounded mb-4"
          >
            {displayError}
          </motion.div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>

        <div className="mt-6 space-y-3 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Create one
            </Link>
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
