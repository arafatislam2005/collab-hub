import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false
    },
    avatar: {
      type: String,
      default: 'https://via.placeholder.com/150'
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot be more than 500 characters']
    },
    isOnline: {
      type: Boolean,
      default: false
    },
    lastSeen: Date,
    designs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Design'
      }
    ],
    cart: [
      {
        design: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Design'
        },
        addedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    watchlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Design'
      }
    ],
    purchases: [
      {
        design: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Design'
        },
        purchasedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    role: {
      type: String,
      enum: ['user', 'designer', 'admin'],
      default: 'user'
    }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
