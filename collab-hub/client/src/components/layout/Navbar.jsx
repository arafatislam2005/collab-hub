import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiShoppingCart, FiBell, FiLogOut } from 'react-icons/fi';
import { onAuthStateChanged, signOut } from "firebase/auth";
// Updated path to correctly find firebase.js from src/components/layout/
import { auth } from "../../config/firebase";

const Navbar = ({ unreadNotifications }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Listen for login state changes to swap buttons
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            CollabHub
          </Link>

          {/* Desktop Menu - Marketplace and Upload have been deleted */}
          <div className="hidden md:flex items-center space-x-6">
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
                <Link to="/profile" className="hover:text-blue-400 transition font-medium">
                  {user.displayName || user.email.split('@')[0]}
                </Link>
                {/* AUTO-CONVERT: Login becomes Logout */}
                <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition flex items-center gap-1 font-bold">
                  <FiLogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-400 transition font-semibold">
                  Login
                </Link>
                {/* AUTO-CONVERT: Sign Up becomes Sign Out when user exists */}
                <Link to="/register" className="bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-700 transition font-bold">
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
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-700 pt-2">
            {user ? (
              <>
                <Link to="/profile" className="block hover:text-blue-400 py-2">Profile</Link>
                <button onClick={handleLogout} className="block w-full text-left text-red-400 py-2 font-bold">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:text-blue-400 py-2">Login</Link>
                <Link to="/register" className="block bg-blue-600 px-4 py-2 rounded text-center font-bold">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;