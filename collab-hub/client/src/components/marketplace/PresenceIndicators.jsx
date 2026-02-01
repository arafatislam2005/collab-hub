import React from 'react';
import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';

const PresenceIndicators = ({ onlineUsers }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 rounded-lg p-6"
    >
      <h3 className="text-lg font-bold text-white mb-4">Online Now ({onlineUsers.length})</h3>
      <div className="space-y-2">
        {onlineUsers.map((user) => (
          <motion.div
            key={user.userId}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded cursor-pointer transition"
          >
            <div className="relative">
              <FiUser className="text-gray-400" />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
            </div>
            <span className="text-sm text-white">{user.userId}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PresenceIndicators;
