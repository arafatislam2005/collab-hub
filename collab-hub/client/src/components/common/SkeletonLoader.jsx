import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="bg-gray-800 rounded-lg overflow-hidden h-96"
        >
          <div className="bg-gray-700 h-48 w-full" />
          <div className="p-4 space-y-3">
            <div className="bg-gray-700 h-4 rounded w-3/4" />
            <div className="bg-gray-700 h-3 rounded w-1/2" />
            <div className="bg-gray-700 h-3 rounded w-2/3" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
