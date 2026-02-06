import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiShoppingCart, FiBell, FiLogOut } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = ({ user, onLogout, unreadNotifications }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        CollabHub
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/marketplace" className="hover:text-blue-400 transition">
                            Marketplace
                        </Link>
                        <Link to="/upload" className="hover:text-blue-400 transition">
                            Upload
                        </Link>

                        {user ? (
                            <>
                                <div className="relative">
                                    <Link to="/notifications" className="relative hover:text-blue-400 transition">
                                        <FiBell size={20} />
                                        {unreadNotifications > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {unreadNotifications}
                                            </span>
                                        )}
                                    </Link>
                                </div>
                                <Link to="/cart" className="relative hover:text-blue-400 transition">
                                    <FiShoppingCart size={20} />
                                </Link>
                                <Link to="/profile" className="hover:text-blue-400 transition">
                                    {user.name}
                                </Link>
                                <button onClick={onLogout} className="hover:text-red-400 transition">
                                    <FiLogOut size={20} />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:text-blue-400 transition">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                        <FiMenu size={24} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden pb-4 space-y-2">
                        <Link to="/marketplace" className="block hover:text-blue-400 py-2">
                            Marketplace
                        </Link>
                        <Link to="/upload" className="block hover:text-blue-400 py-2">
                            Upload
                        </Link>
                        {user ? (
                            <>
                                <Link to="/profile" className="block hover:text-blue-400 py-2">
                                    Profile
                                </Link>
                                <button onClick={onLogout} className="block w-full text-left hover:text-red-400 py-2">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block hover:text-blue-400 py-2">
                                    Login
                                </Link>
                                <Link to="/register" className="block bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;


// **************************************** NavBar 





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

    // Monitor Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

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

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            setLocalError("Logout failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-900 flex items-center justify-center p-4">
            <motion.div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-700">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    {user ? "Welcome Back" : "Login"}
                </h2>

                {user ? (
                    <div className="text-center">
                        <p className="text-gray-300 mb-6">Signed in as: <span className="text-blue-400 font-bold">{user.email}</span></p>
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {localError && <div className="bg-red-600 text-white p-3 rounded mb-4">{localError}</div>}
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 bg-gray-700 text-white rounded focus:ring-2 focus:ring-blue-500 outline-none" required />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 bg-gray-700 text-white rounded focus:ring-2 focus:ring-blue-500 outline-none" required />
                        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-bold text-white transition">
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                        <button type="button" onClick={handleGoogleSignIn} className="w-full bg-white hover:bg-gray-100 text-black py-3 rounded font-bold flex items-center justify-center gap-2 transition">
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="G" /> Google
                        </button>
                        <p className="text-center text-gray-400 mt-4">New here? <Link to="/register" className="text-blue-400">Create account</Link></p>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Login;











// ***************************** Login 





import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setLocalError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) return setLocalError('Passwords do not match');

        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            await updateProfile(res.user, { displayName: formData.name });
            navigate('/');
        } catch (error) {
            setLocalError(error.code === 'auth/email-already-in-use' ? 'Email already exists' : error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/register');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
            <motion.div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-700">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    {user ? "Account Active" : "Create Account"}
                </h2>

                {user ? (
                    <div className="text-center">
                        <p className="text-gray-300 mb-6 font-bold">Welcome, {user.displayName || user.email}!</p>
                        <button onClick={handleSignOut} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition">
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {localError && <div className="bg-red-600 text-white p-3 rounded mb-4">{localError}</div>}
                        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 bg-gray-700 text-white rounded outline-none" required />
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 bg-gray-700 text-white rounded outline-none" required />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 bg-gray-700 text-white rounded outline-none" required />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full p-3 bg-gray-700 text-white rounded outline-none" required />
                        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-bold text-white transition">
                            {loading ? "Processing..." : "Create Account"}
                        </button>
                        <p className="text-center text-gray-400 mt-4">Already registered? <Link to="/login" className="text-blue-400">Sign in</Link></p>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Register;




// ******************************** Registion 







import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCuot4TjRqfaCONtsJ77nCJ0_6D9LXdC8s",
    authDomain: "dev-tool-d8260.firebaseapp.com",
    projectId: "dev-tool-d8260",
    storageBucket: "dev-tool-d8260.firebasestorage.app",
    messagingSenderId: "383367145772",
    appId: "1:383367145772:web:1bc7950df69bdb0b8c2489",
    measurementId: "G-VJ4G6VR5WM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export these so your Login and Register pages can use them
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();




// *************************Firebase