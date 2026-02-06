import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(res.user, { displayName: formData.name });
      navigate('/');
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <motion.div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-700 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          {user ? "Account Ready" : "Create Account"}
        </h2>

        {user ? (
          <button onClick={() => signOut(auth)} className="w-full bg-red-600 py-3 rounded-lg font-bold text-white">
            Sign Out
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full p-3 bg-gray-700 text-white rounded" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <input type="email" placeholder="Email" className="w-full p-3 bg-gray-700 text-white rounded" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <input type="password" placeholder="Password" className="w-full p-3 bg-gray-700 text-white rounded" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            <button type="submit" className="w-full bg-blue-600 py-3 rounded font-bold text-white">Register</button>
            <p className="text-gray-400">Already have an account? <Link to="/login" className="text-blue-400">Login</Link></p>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Register;