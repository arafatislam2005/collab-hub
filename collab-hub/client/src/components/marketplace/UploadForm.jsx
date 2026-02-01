import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload } from 'react-icons/fi';

const UploadForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Miniatures',
    material: 'PLA',
    price: 0,
    tags: ''
  });
  const [files, setFiles] = useState({ previewImages: [], modelFile: null });
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    if (name === 'previewImages') {
      setFiles((prev) => ({ ...prev, previewImages: Array.from(fileList) }));
    } else {
      setFiles((prev) => ({ ...prev, modelFile: fileList[0] }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const { files: droppedFiles } = e.dataTransfer;
    setFiles((prev) => ({
      ...prev,
      modelFile: droppedFiles[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    files.previewImages.forEach((file) => {
      formDataToSend.append('previewImage', file);
    });

    if (files.modelFile) {
      formDataToSend.append('modelFile', files.modelFile);
    }

    onSubmit(formDataToSend);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-8"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Upload Design</h2>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-white mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-white mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Category & Material */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none"
            >
              <option>Miniatures</option>
              <option>Mechanical</option>
              <option>Jewelry</option>
              <option>Functional</option>
              <option>Art</option>
              <option>Architecture</option>
              <option>Gaming</option>
              <option>Educational</option>
            </select>
          </div>
          <div>
            <label className="block text-white mb-2">Material</label>
            <select
              name="material"
              value={formData.material}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none"
            >
              <option>PLA</option>
              <option>ABS</option>
              <option>Resin</option>
              <option>Nylon</option>
              <option>Metal</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-white mb-2">Price (USD) - 0 for Free</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-white mb-2">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="e.g. stl, miniature, rpg"
            className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none"
          />
        </div>

        {/* Preview Images */}
        <div>
          <label className="block text-white mb-2">Preview Images</label>
          <input
            type="file"
            name="previewImages"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="w-full"
          />
          {files.previewImages.length > 0 && (
            <p className="text-green-400 text-sm mt-2">{files.previewImages.length} images selected</p>
          )}
        </div>

        {/* Model File Drag & Drop */}
        <div>
          <label className="block text-white mb-2">Model File (.stl, .obj, .gltf)</label>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
              dragActive ? 'border-blue-400 bg-blue-900/20' : 'border-gray-600'
            }`}
          >
            <FiUpload className="mx-auto mb-2 text-gray-400" size={32} />
            <input
              type="file"
              name="modelFile"
              onChange={handleFileChange}
              accept=".stl,.obj,.gltf,.glb"
              className="hidden"
              id="modelFile"
            />
            <label htmlFor="modelFile" className="text-white cursor-pointer">
              Drag and drop or click to upload
            </label>
            {files.modelFile && <p className="text-green-400 text-sm mt-2">{files.modelFile.name}</p>}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-2 rounded transition"
        >
          {loading ? 'Uploading...' : 'Upload Design'}
        </button>
      </div>
    </motion.form>
  );
};

export default UploadForm;
