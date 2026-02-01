import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UploadForm from '../components/marketplace/UploadForm';
import api from '../api/axios';

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = async (formData) => {
    try {
      setLoading(true);
      await api.post('/designs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12">
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Design uploaded successfully!
        </motion.div>
      )}
      <UploadForm onSubmit={handleUpload} loading={loading} />
    </div>
  );
};

export default Upload;
