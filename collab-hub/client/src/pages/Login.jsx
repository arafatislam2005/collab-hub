import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// FIX: Added /config/ to the path
import { auth, googleProvider } from "../config/firebase";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setLocalError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setLocalError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      setLocalError("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <motion.form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
        {localError && <div className="bg-red-600 text-white p-3 rounded mb-4">{localError}</div>}
        <div className="space-y-4">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 bg-gray-700 text-white rounded" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 bg-gray-700 text-white rounded" />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 py-3 rounded font-bold text-white">Sign In</button>
          <button type="button" onClick={handleGoogleSignIn} className="w-full bg-white text-black py-3 rounded font-bold flex items-center justify-center gap-2">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="G" /> Google
          </button>
        </div>


      </motion.form>
    </div>
  );
};

export default Login;
