import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiDownload } from 'react-icons/fi';

const LiveFeed = ({ feed }) => {
  const getActivityMessage = (activity) => {
    switch (activity.type) {
      case 'upload':
        return `${activity.user.name} just uploaded "${activity.design.title}"`;
      case 'purchase':
        return `${activity.buyer.name} purchased "${activity.design.title}"`;
      default:
        return 'New activity';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'upload':
        return <FiCheckCircle className="text-green-400" />;
      case 'purchase':
        return <FiDownload className="text-blue-400" />;
      default:
        return <FiCheckCircle className="text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 rounded-lg p-6 h-96 overflow-y-auto"
    >
      <h3 className="text-lg font-bold text-white mb-4">Live Activity Feed</h3>
      <div className="space-y-3">
        {feed.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent activity</p>
        ) : (
          feed.map((activity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-3 pb-3 border-b border-gray-700 last:border-0"
            >
              <div className="mt-1">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{getActivityMessage(activity)}</p>
                <p className="text-xs text-gray-500">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default LiveFeed;
