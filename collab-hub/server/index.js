import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.js';
import designRoutes from './routes/designs.js';
import { handleConnection } from './sockets/handlers.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database
try {
  await connectDB();
} catch (error) {
  console.warn('⚠️  MongoDB connection failed. Running in demo mode.');
  console.warn('   To use MongoDB:');
  console.warn('   1. Install MongoDB Community: https://www.mongodb.com/try/download/community');
  console.warn('   2. Run: mongod');
  console.warn('   3. Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas');
}

// Socket.io Connection
io.on('connection', (socket) => {
  handleConnection(io, socket);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/designs', designRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
