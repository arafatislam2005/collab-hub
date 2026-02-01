import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

const Toast = ({ id, type = 'info', message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: <FiCheckCircle />,
    error: <FiAlertCircle />,
    info: <FiInfo />
  };

  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3`}
    >
      {icons[type]}
      <span>{message}</span>
      <button onClick={() => onClose(id)} className="ml-auto">
        <FiX />
      </button>
    </motion.div>
  );
};

const ToastContainer = ({ toasts, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
