import React from 'react';
import { motion } from 'framer-motion';

const Sidebar = ({ filters, onFilterChange }) => {
  const categories = ['Miniatures', 'Mechanical', 'Jewelry', 'Functional', 'Art', 'Architecture', 'Gaming', 'Educational'];
  const materials = ['PLA', 'ABS', 'Resin', 'Nylon', 'Metal', 'Other'];
  const priceRanges = [
    { label: 'Free', min: 0, max: 0 },
    { label: '$0-$10', min: 0, max: 10 },
    { label: '$10-$50', min: 10, max: 50 },
    { label: '$50+', min: 50, max: null }
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full md:w-64 bg-gray-900 text-white p-6 rounded-lg"
    >
      <h2 className="text-xl font-bold mb-6 text-blue-400">Filters</h2>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Search</label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          placeholder="Search designs..."
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-300">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={Array.isArray(filters.category) ? filters.category.includes(cat) : false}
                onChange={() => onFilterChange('category', cat)}
                className="mr-2"
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Material */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-300">Material</h3>
        <div className="space-y-2">
          {materials.map((mat) => (
            <label key={mat} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={Array.isArray(filters.material) ? filters.material.includes(mat) : false}
                onChange={() => onFilterChange('material', mat)}
                className="mr-2"
              />
              <span className="text-sm">{mat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-300">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.priceMin === range.min && filters.priceMax === range.max}
                onChange={(e) => {
                  if (e.target.checked) {
                    onFilterChange('priceMin', range.min);
                    onFilterChange('priceMax', range.max);
                  } else {
                    onFilterChange('priceMin', '');
                    onFilterChange('priceMax', '');
                  }
                }}
                className="mr-2"
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
