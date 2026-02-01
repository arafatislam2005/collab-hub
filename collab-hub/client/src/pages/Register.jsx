import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [localError, setLocalError] = useState(null);
  const { register, loading, error, user } = useAuth();
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

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    // Validation
    if (!formData.name.trim()) {
      setLocalError('Name is required');
      return;
    }

    if (!formData.email) {
      setLocalError('Email is required');
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setLocalError(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
    } catch (error) {
      console.error('Registration failed:', error);
      setLocalError(error.message || 'Registration failed');
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
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h2>
        <p className="text-gray-400 text-center mb-6">Join us today</p>

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
            <label className="block text-gray-300 text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

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
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
            <p className="text-gray-500 text-xs mt-1">Minimum 6 characters required</p>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
              value={formData.confirmPassword}
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>

        <div className="mt-6 space-y-3 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition">
              Sign in
            </Link>
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default Register;
