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
