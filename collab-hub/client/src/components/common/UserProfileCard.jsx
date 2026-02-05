import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiClock } from 'react-icons/fi';

const UserProfileCard = ({ user }) => {
  if (!user) return null;

  const formatDate = (date) => {
    if (!date) return 'N/A';
    if (date instanceof Date) {
      return date.toLocaleDateString();
    }
    return new Date(date).toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 shadow-lg"
    >
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={user.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
          alt={user.name}
          className="w-16 h-16 rounded-full border-2 border-blue-500"
        />
        <div>
          <h3 className="text-xl font-bold text-white">{user.name}</h3>
          <p className="text-blue-400">{user.role || 'Designer'}</p>
        </div>
      </div>

      <div className="space-y-2 text-gray-300">
        <div className="flex items-center space-x-2">
          <FiMail className="text-blue-400" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FiClock className="text-blue-400" />
          <span>Joined {formatDate(user.createdAt)}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">Authenticated User</p>
      </div>
    </motion.div>
  );
};

export default UserProfileCard;
