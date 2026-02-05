import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/marketplace/ProductCard';
import Sidebar from '../components/layout/Sidebar';
import LiveFeed from '../components/marketplace/LiveFeed';
import PresenceIndicators from '../components/marketplace/PresenceIndicators';
import SkeletonLoader from '../components/common/SkeletonLoader';
import UserProfileCard from '../components/common/UserProfileCard';
import { useDesigns, useFilters } from '../hooks/useDesigns';
import { useLiveFeed, useOnlineUsers } from '../hooks/useSocket';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import api from '../api/axios';

const Home = () => {
  const { filters, updateFilter, resetFilters } = useFilters();
  const { designs, loading, error, pagination } = useDesigns(filters);
  const feed = useLiveFeed();
  const onlineUsers = useOnlineUsers();
  const { user } = useAuth();
  const dispatch = useDispatch();

  const handleAddToCart = (design) => {
    dispatch(addToCart(design));
  };

  const handleLike = async (designId) => {
    try {
      await api.post(`/designs/${designId}/like`);
    } catch (error) {
      console.error('Failed to like design:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">CollabHub</span>
          </h1>
          <p className="text-xl text-gray-400 mb-6">The ultimate marketplace for 3D designs and models</p>
          {user ? (
            <p className="text-lg text-green-400 mb-4">✓ Authenticated User</p>
          ) : null}
          <Link
            to="/upload"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition"
          >
            Start Uploading
          </Link>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with User Info */}
          <div className="lg:col-span-1 space-y-6">
            {user && <UserProfileCard user={user} />}
            <Sidebar filters={filters} onFilterChange={updateFilter} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* Designs Grid */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Featured Designs</h2>
                  <button
                    onClick={resetFilters}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Reset Filters
                  </button>
                </div>

                {loading ? (
                  <SkeletonLoader count={6} />
                ) : error && designs.length === 0 ? (
                  <div className="text-yellow-500 text-center py-8">{error} - Showing sample data</div>
                ) : designs.length === 0 ? (
                  <div className="text-gray-500 text-center py-8">No designs found</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {designs.map((design) => (
                      <ProductCard
                        key={design.id || design._id}
                        design={design}
                        onLike={handleLike}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {!loading && pagination.pages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: pagination.pages }).map((_, i) => (
                      <button
                        key={i + 1}
                        className={`px-3 py-1 rounded ${pagination.page === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </motion.section>

              {/* Live Feed & Presence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LiveFeed feed={feed} />
                <PresenceIndicators onlineUsers={onlineUsers} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
