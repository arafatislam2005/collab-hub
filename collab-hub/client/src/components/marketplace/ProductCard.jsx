import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiDownload, FiShoppingCart, FiStar } from 'react-icons/fi';

const ProductCard = ({ design, onLike, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(design.id || design._id);
  };

  const designId = design.id || design._id;
  const imageUrl = design.image || design.previewImages?.[0]?.url || 'https://via.placeholder.com/300x200';
  const creatorName = design.designer || design.creator?.name || 'Designer';
  const price = design.price || 0;
  const likes = design.likes || design.likeCount || 0;
  const downloads = design.downloads || 0;
  const rating = design.rating || 0;
  const category = design.category || 'Design';

  return (
    <motion.div
      whileHover={{ translateY: -8 }}
      className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-blue-500"
    >
      {/* Image Container */}
      <Link to={`/design/${designId}`} className="block relative h-48 bg-gray-700 overflow-hidden group">
        <img
          src={imageUrl}
          alt={design.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 animate-pulse" />
        )}

        {/* Category Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
            {category}
          </span>
        </div>

        {/* Rating Badge */}
        {rating > 0 && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded px-2 py-1 flex items-center space-x-1">
            <FiStar size={14} className="text-yellow-400" fill="currentColor" />
            <span className="text-white text-xs font-semibold">{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Download Count Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-2 text-white text-sm">
            <FiDownload size={16} />
            <span>{downloads.toLocaleString()} downloads</span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/design/${designId}`}>
          <h3 className="text-lg font-semibold text-white mb-1 hover:text-blue-400 truncate">
            {design.title}
          </h3>
        </Link>

        {/* Creator */}
        <p className="text-sm text-gray-400 mb-2 truncate">
          by <span className="text-blue-400 font-medium">{creatorName}</span>
        </p>

        {/* Description */}
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">
          {design.description}
        </p>

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-500 mb-3 px-2 py-2 bg-gray-700 bg-opacity-50 rounded">
          <span className="flex items-center space-x-1">
            <FiHeart size={14} />
            <span>{likes.toLocaleString()}</span>
          </span>
          <span className="flex items-center space-x-1">
            <FiDownload size={14} />
            <span>{downloads.toLocaleString()}</span>
          </span>
          {design.fileSize && (
            <span className="text-xs text-gray-400">
              {design.fileSize}
            </span>
          )}
        </div>

        {/* Tags */}
        {design.tags && design.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {design.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-700">
          <span className="text-lg font-bold text-blue-400">
            {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded transition ${isLiked ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white hover:bg-red-600'
                }`}
              title="Like this design"
            >
              <FiHeart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={() => onAddToCart?.(design)}
              className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              title="Add to cart"
            >
              <FiShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
