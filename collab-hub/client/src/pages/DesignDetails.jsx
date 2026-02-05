import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useDesignById } from '../hooks/useDesigns';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { FiHeart, FiDownload, FiShare2, FiStar } from 'react-icons/fi';

const DesignDetails = () => {
  const { id } = useParams();
  const { design, loading, error } = useDesignById(id);
  const [mainImage, setMainImage] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (loading) return <SkeletonLoader count={1} />;

  if (error || !design) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <p>Design not found</p>
        </div>
      </div>
    );
  }

  const imageUrl = mainImage || design.image || 'https://via.placeholder.com/800x600';
  const creatorName = design.designer || design.creator?.name || 'Designer';
  const creatorAvatar = design.creator?.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
  const price = design.price || 0;
  const rating = design.rating || 4.5;
  const reviews = design.reviews || 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-gray-400 text-sm">
          <span className="hover:text-blue-400 cursor-pointer">Marketplace</span>
          <span className="mx-2">/</span>
          <span className="hover:text-blue-400 cursor-pointer">{design.category}</span>
          <span className="mx-2">/</span>
          <span className="text-blue-400">{design.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
            >
              <img
                src={imageUrl}
                alt={design.title}
                className="w-full h-auto object-cover rounded-lg max-h-96"
              />
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[design.image, ...([design.image, design.image, design.image].slice(0, 3))].map((img, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setMainImage(img)}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition ${mainImage === img ? 'border-blue-500' : 'border-gray-700 hover:border-gray-500'
                    }`}
                >
                  <img
                    src={img}
                    alt={`thumbnail-${idx}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {/* Specifications */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-400">File Format:</span>
                    <span className="font-semibold">{design.fileFormat || 'OBJ, FBX, BLEND'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">File Size:</span>
                    <span className="font-semibold">{design.fileSize || '150 MB'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Polygons:</span>
                    <span className="font-semibold">High Poly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rigged:</span>
                    <span className="font-semibold">No</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Textured:</span>
                    <span className="font-semibold">Yes</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <FiStar className="text-yellow-400" fill="currentColor" />
                    <span className="text-gray-300">{rating} ({reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiDownload className="text-blue-400" />
                    <span className="text-gray-300">{design.downloads?.toLocaleString()} downloads</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FiHeart className="text-red-400" />
                    <span className="text-gray-300">{design.likes?.toLocaleString()} likes</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-4">
                    Created {new Date(design.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">{design.description}</p>
            </div>

            {/* Tags */}
            {design.tags && design.tags.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {design.tags.map((tag) => (
                    <span key={tag} className="bg-blue-600 bg-opacity-30 text-blue-300 px-3 py-1 rounded-full text-sm hover:bg-opacity-50 cursor-pointer transition">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Price Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 border border-blue-500 sticky top-20"
            >
              <div className="text-white mb-6">
                <div className="text-sm text-blue-200 mb-2">Price</div>
                <div className="text-4xl font-bold">
                  {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-50 transition">
                  <FiDownload className="inline mr-2" />
                  {price === 0 ? 'Download' : 'Purchase Now'}
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-full py-3 rounded-lg font-bold transition flex items-center justify-center ${isWishlisted
                      ? 'bg-red-600 text-white'
                      : 'bg-blue-500 bg-opacity-50 text-white hover:bg-opacity-70'
                    }`}
                >
                  <FiHeart fill={isWishlisted ? 'currentColor' : 'none'} className="mr-2" />
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </button>
                <button className="w-full bg-blue-500 bg-opacity-30 text-white py-3 rounded-lg hover:bg-opacity-50 transition flex items-center justify-center font-semibold">
                  <FiShare2 className="mr-2" />
                  Share Design
                </button>
              </div>
            </motion.div>

            {/* Creator Card */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4">Creator</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={creatorAvatar}
                  alt={creatorName}
                  className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
                <div>
                  <p className="font-semibold text-white">{creatorName}</p>
                  <p className="text-sm text-gray-400">3D Designer</p>
                  <button className="text-blue-400 text-sm mt-2 hover:underline">View Profile</button>
                </div>
              </div>
            </div>

            {/* Category Badge */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between text-gray-300 space-y-2">
                <div>
                  <p className="text-sm text-gray-400">Category</p>
                  <p className="font-semibold text-blue-400">{design.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Rating</p>
                  <p className="font-semibold text-yellow-400">⭐ {rating}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DesignDetails;
