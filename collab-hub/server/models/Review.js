import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please add a review'],
      maxlength: [1000, 'Review cannot be more than 1000 characters']
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating'],
      min: 1,
      max: 5
    },
    design: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Design',
      required: true
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    helpful: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
