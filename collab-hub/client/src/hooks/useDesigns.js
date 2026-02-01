import { useEffect, useState } from 'react';
import api from '../api/axios';
import { sampleDesigns } from '../data/sampleDesigns';

export const useDesigns = (filters = {}) => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(filters).toString();
        try {
          const response = await api.get(`/designs?${params}`);
          setDesigns(response.data.designs);
          setPagination({
            page: response.data.page,
            pages: response.data.pages,
            total: response.data.total
          });
        } catch (apiErr) {
          // If backend fails, use sample data
          console.log('Using sample data:', apiErr.message);
          let filtered = [...sampleDesigns];
          
          // Apply filters
          if (filters.category && filters.category !== 'All') {
            filtered = filtered.filter(d => d.category === filters.category);
          }
          if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(d => 
              d.title.toLowerCase().includes(searchLower) ||
              d.description.toLowerCase().includes(searchLower)
            );
          }
          if (filters.priceMin) {
            filtered = filtered.filter(d => d.price >= parseFloat(filters.priceMin));
          }
          if (filters.priceMax) {
            filtered = filtered.filter(d => d.price <= parseFloat(filters.priceMax));
          }
          
          setDesigns(filtered);
          setPagination({
            page: 1,
            pages: 1,
            total: filtered.length
          });
        }
      } catch (err) {
        setError(err.message);
        setDesigns(sampleDesigns);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, [JSON.stringify(filters)]);

  return { designs, loading, error, pagination };
};

export const useDesignById = (id) => {
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDesign = async () => {
      try {
        setLoading(true);
        try {
          const response = await api.get(`/designs/${id}`);
          setDesign(response.data.design);
        } catch (apiErr) {
          // If backend fails, look in sample data
          const found = sampleDesigns.find(d => d.id === id);
          if (found) {
            setDesign(found);
          } else {
            throw apiErr;
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDesign();
  }, [id]);

  return { design, loading, error };
};

export const useFilters = () => {
  const [filters, setFilters] = useState({
    category: '',
    material: '',
    priceMin: '',
    priceMax: '',
    search: ''
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      material: '',
      priceMin: '',
      priceMax: '',
      search: ''
    });
  };

  return { filters, updateFilter, resetFilters };
};
