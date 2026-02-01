# CollabHub - 3D Design Marketplace

A real-time marketplace platform for 3D designers to share, sell, and discover 3D models and designs. Built with React, Node.js, Express, MongoDB, and Socket.io.

## 🚀 Features

### Real-Time Engine
- **Live Activity Feed**: See uploads and purchases in real-time without page refreshes
- **Instant Notifications**: Socket.io notifications for likes, comments, and sales
- **Presence Indicators**: View which designers are currently online

### Marketplace Logic
- **Multi-Criteria Filtering**: Filter by Category (Miniatures/Mechanical/etc.), Material (PLA/Resin), and Price
- **Asset Management**: Upload preview images (Cloudinary) and 3D model files (.stl/.obj/.gltf) to AWS S3
- **Shopping Cart & Watchlist**: Built with Redux Toolkit for complex state management

### User Experience
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Skeleton Loaders**: Professional loading states for image-heavy grids
- **Smooth Transitions**: Framer Motion animations for fluid UI interactions

## 📁 Project Structure

```
collab-hub/
├── client/                 # React + Vite Frontend
│   ├── src/
│   │   ├── api/           # Axios instances & Socket.io config
│   │   ├── components/    
│   │   │   ├── layout/    # Navbar, Sidebar (Filters)
│   │   │   ├── common/    # Toasts, Loaders, Buttons
│   │   │   └── marketplace/ # ProductCard, LiveFeed, Upload
│   │   ├── hooks/         # useSocket, useAuth, useDesigns
│   │   ├── store/         # Redux slices (cart, notifications)
│   │   ├── pages/         # Home, ProductDetails, Cart, etc.
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
├── server/                # Node + Express Backend
│   ├── config/           # Database & Cloudinary config
│   ├── controllers/      # Business logic (auth, designs)
│   ├── middleware/       # Auth (JWT), Upload (Multer)
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express endpoints
│   ├── sockets/          # Socket.io event handlers
│   ├── package.json
│   ├── index.js          # Entry point
│   └── .env.example
│
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Redux Toolkit** - State management
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP requests

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Socket.io** - Real-time events
- **JWT** - Authentication
- **Multer** - File uploads
- **Cloudinary** - Image hosting
- **bcryptjs** - Password hashing

## 📋 Prerequisites

- Node.js v16+ and npm/yarn
- MongoDB running locally or MongoDB Atlas connection
- Cloudinary account (for image uploads)
- AWS S3 bucket (for 3D model files)

## 🚀 Getting Started

### Server Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`)
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` with your credentials**
   ```
   MONGODB_URI=mongodb://localhost:27017/collab-hub
   JWT_SECRET=your_jwt_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Client Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env`**
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_SOCKET_URL=http://localhost:5000
   ```

5. **Start dev server**
   ```bash
   npm run dev
   ```
   Client runs on `http://localhost:5173`

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update profile

### Designs
- `GET /api/designs` - Get all designs with filters
- `GET /api/designs/:id` - Get design details
- `POST /api/designs` - Upload new design (multipart/form-data)
- `PUT /api/designs/:id` - Update design
- `DELETE /api/designs/:id` - Delete design
- `POST /api/designs/:id/like` - Like/unlike design

## 🔌 Socket.io Events

### Client → Server
- `join-room` - Join user's notification room
- `design-uploaded` - Broadcast new upload
- `design-liked` - Broadcast like
- `comment-posted` - Broadcast comment
- `purchase-completed` - Broadcast purchase
- `user-followed` - Broadcast follow

### Server → Client
- `live-feed-update` - Activity feed update
- `notification` - Notification toast
- `user-online` - User comes online
- `user-offline` - User goes offline
- `design-like-update` - Like count updated
- `design-comment-update` - Comment count updated

## 🎨 Customization

### Add New Categories
Edit `server/models/Design.js` and `client/components/layout/Sidebar.jsx`:
```javascript
category: {
  type: String,
  enum: ['Miniatures', 'Mechanical', 'YourCategory'],
  required: true
}
```

### Customize Styling
- Edit `client/tailwind.config.js` for theme
- Modify color scheme in component classes

### Add More Fields
1. Update MongoDB schema in `server/models/`
2. Update controller logic
3. Update API endpoints
4. Update React components

## 📦 Build for Production

### Server
```bash
cd server
npm start
```

### Client
```bash
cd client
npm run build
npm run preview
```

## 🐛 Troubleshooting

**Socket.io connection issues?**
- Ensure server is running on correct port
- Check CORS settings in `server/index.js`
- Verify `VITE_SOCKET_URL` in client `.env`

**Image uploads failing?**
- Verify Cloudinary credentials
- Check file size limits in `server/middleware/upload.js`

**Database connection error?**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`

**CORS errors?**
- Update allowed origins in `server/index.js`

## 📝 Environment Variables Reference

### Server (.env)
```
MONGODB_URI              # MongoDB connection string
JWT_SECRET               # Secret for JWT tokens
CLOUDINARY_CLOUD_NAME    # Cloudinary account name
CLOUDINARY_API_KEY       # Cloudinary API key
CLOUDINARY_API_SECRET    # Cloudinary API secret
AWS_S3_BUCKET            # S3 bucket name
AWS_S3_REGION            # S3 region
AWS_ACCESS_KEY_ID        # AWS access key
AWS_SECRET_ACCESS_KEY    # AWS secret key
PORT                     # Server port (default: 5000)
NODE_ENV                 # Environment (development/production)
SOCKET_URL               # Socket.io URL for clients
```

### Client (.env)
```
VITE_API_URL             # Backend API URL
VITE_SOCKET_URL          # Socket.io server URL
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- [ ] Payment integration (Stripe)
- [ ] Design collaboration features
- [ ] Advanced 3D model viewer
- [ ] User reviews and ratings
- [ ] Email notifications
- [ ] Designer portfolio pages
- [ ] Advanced search with AI
- [ ] Design remixing
- [ ] Social features (messaging, comments)
- [ ] Mobile app (React Native)

## 📞 Support

For issues, questions, or suggestions, please create an issue in the repository.

---

Built with ❤️ for 3D Design Community
