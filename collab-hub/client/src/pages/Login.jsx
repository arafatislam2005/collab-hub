import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleAuthAction = async (e) => {
    if (user) {
      await signOut(auth);
    } else {
      e.preventDefault();
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/');
      } catch (error) {
        setLocalError("Invalid credentials");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <motion.div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-700 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          {user ? "Session Active" : "Login"}
        </h2>

        {user ? (
          <>
            <p className="text-gray-400 mb-6">You are currently logged in as {user.email}</p>
            <button onClick={handleAuthAction} className="w-full bg-red-600 py-3 rounded-lg font-bold text-white">
              Logout
            </button>
          </>
        ) : (
          <form onSubmit={handleAuthAction} className="space-y-4">
            {localError && <div className="bg-red-600 text-white p-2 rounded">{localError}</div>}
            <input type="email" placeholder="Email" className="w-full p-3 bg-gray-700 text-white rounded" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <input type="password" placeholder="Password" className="w-full p-3 bg-gray-700 text-white rounded" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            <button type="submit" disabled={loading} className="w-full bg-blue-600 py-3 rounded font-bold text-white">
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <p className="text-gray-400">New? <Link to="/register" className="text-blue-400">Register</Link></p>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Login;