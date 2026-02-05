import cloudinary from '../config/cloudinary.js';

// Demo data storage
const demoDesigns = [];
const demoCounter = { id: 0 };

export const getAllDesigns = async (req, res) => {
  try {
    const { category, material, priceMin, priceMax, search, page = 1, limit = 12 } = req.query;

    // Filter demo designs
    let filtered = [...demoDesigns];

    if (category) filtered = filtered.filter(d => d.category === category);
    if (material) filtered = filtered.filter(d => d.material === material);
    if (priceMin) filtered = filtered.filter(d => d.price >= parseFloat(priceMin));
    if (priceMax) filtered = filtered.filter(d => d.price <= parseFloat(priceMax));
    if (search) {
      const term = search.toLowerCase();
      filtered = filtered.filter(d =>
        d.title.toLowerCase().includes(term) ||
        d.description.toLowerCase().includes(term)
      );
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const designs = filtered.slice(skip, skip + parseInt(limit));
    const total = filtered.length;

    res.status(200).json({
      success: true,
      count: designs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      designs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getDesignById = async (req, res) => {
  try {
    const design = demoDesigns.find(d => d.id === req.params.id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    res.status(200).json({
      success: true,
      design
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDesign = async (req, res) => {
  try {
    const { title, description, category, material, price, tags } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Please provide title and description' });
    }

    const design = {
      id: 'design_' + (++demoCounter.id),
      title,
      description,
      category: category || 'general',
      material: material || 'plastic',
      price: parseFloat(price) || 0,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      creator: {
        id: req.user?.id || 'demo_user',
        name: req.user?.name || 'Demo User'
      },
      previewImages: [
        { url: `https://picsum.photos/400/300?random=${demoCounter.id}` }
      ],
      modelFile: {
        url: 'https://example.com/model.stl',
        fileType: 'STL'
      },
      likes: 0,
      views: 0,
      createdAt: new Date(),
      reviews: []
    };

    demoDesigns.push(design);

    res.status(201).json({
      success: true,
      design
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDesign = async (req, res) => {
  try {
    const design = demoDesigns.find(d => d.id === req.params.id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    if (design.creator.id !== req.user?.id) {
      return res.status(401).json({ message: 'Not authorized to update this design' });
    }

    Object.assign(design, req.body);

    res.status(200).json({
      success: true,
      design
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDesign = async (req, res) => {
  try {
    const index = demoDesigns.findIndex(d => d.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ message: 'Design not found' });
    }

    const design = demoDesigns[index];
    if (design.creator.id !== req.user?.id) {
      return res.status(401).json({ message: 'Not authorized to delete this design' });
    }

    demoDesigns.splice(index, 1);

    res.status(200).json({
      success: true,
      message: 'Design deleted'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeDesign = async (req, res) => {
  try {
    const design = demoDesigns.find(d => d.id === req.params.id);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    if (!design.likedBy) design.likedBy = [];

    const userId = req.user?.id || 'anonymous';
    const alreadyLiked = design.likedBy.includes(userId);

    if (alreadyLiked) {
      design.likedBy = design.likedBy.filter(id => id !== userId);
      design.likes = Math.max(0, design.likes - 1);
    } else {
      design.likedBy.push(userId);
      design.likes = (design.likes || 0) + 1;
    }

    res.status(200).json({
      success: true,
      design
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
