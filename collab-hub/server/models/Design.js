import mongoose from 'mongoose';

const designSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      enum: ['Miniatures', 'Mechanical', 'Jewelry', 'Functional', 'Art', 'Architecture', 'Gaming', 'Educational'],
      required: true
    },
    material: {
      type: String,
      enum: ['PLA', 'ABS', 'Resin', 'Nylon', 'Metal', 'Other'],
      default: 'PLA'
    },
    price: {
      type: Number,
      default: 0, // 0 means free
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    previewImages: [
      {
        url: String,
        cloudinaryId: String
      }
    ],
    modelFile: {
      url: String,
      s3Key: String,
      fileType: {
        type: String,
        enum: ['STL', 'OBJ', 'GLTF']
      }
    },
    tags: [String],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    downloads: {
      type: Number,
      default: 0
    },
    likeCount: {
      type: Number,
      default: 0
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
      }
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    isPublished: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Index for search and filtering
designSchema.index({ category: 1, material: 1, price: 1 });
designSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Design', designSchema);
