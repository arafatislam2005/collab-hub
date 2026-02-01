import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/collab-hub', {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.log('⚠️  Running in demo mode without database persistence');
    return null;
  }
};
