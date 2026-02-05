import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
// 1. Import Firebase auth methods
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [localError, setLocalError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setLocalError(null);
  };

  // --- EMAIL/PASSWORD REGISTRATION ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    // Basic Validations
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Create the user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update the user's profile to include their name
      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      console.log("Registered:", userCredential.user);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle common Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        setLocalError('That email is already registered.');
      } else {
        setLocalError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // --- GOOGLE SIGN-IN ---
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      setLocalError("Google registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h2>
        <p className="text-gray-400 text-center mb-6">Join us today</p>

        {localError && (
          <div className="bg-red-600 bg-opacity-20 border border-red-500 text-red-200 p-3 rounded mb-4">
            {localError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text" name="name" placeholder="John Doe"
              value={formData.name} onChange={handleChange}
              required disabled={loading}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Email</label>
            <input
              type="email" name="email" placeholder="your@email.com"
              value={formData.email} onChange={handleChange}
              required disabled={loading}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Password</label>
              <input
                type="password" name="password" placeholder="******"
                value={formData.password} onChange={handleChange}
                required disabled={loading}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">Confirm</label>
              <input
                type="password" name="confirmPassword" placeholder="******"
                value={formData.confirmPassword} onChange={handleChange}
                required disabled={loading}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
              />
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          {/* Google Button */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-600"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-800 px-2 text-gray-400">Or continue with</span></div>
          </div>

          <button
            type="button" onClick={handleGoogleSignIn} disabled={loading}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition duration-200"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" className="w-5 h-5" />
            Google
          </button>
        </div>

        <p className="mt-6 text-center text-gray-400">
          Already have an account? <Link to="/login" className="text-blue-400 font-semibold">Sign in</Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;