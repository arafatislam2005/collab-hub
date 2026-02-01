import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['like', 'comment', 'purchase', 'follow', 'sale'],
      required: true
    },
    design: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Design'
    },
    message: String,
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
