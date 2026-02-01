# CollabHub - Complete Development Guide

## 📦 Project Overview

**CollabHub** is a full-stack real-time 3D design marketplace featuring:
- Live activity feeds with Socket.io
- Real-time notifications and presence indicators
- Multi-criteria marketplace filtering (Category, Material, Price)
- Shopping cart with Redux state management
- Responsive mobile-first UI with Tailwind CSS and Framer Motion animations
- JWT authentication and secure file uploads
- Cloudinary image hosting and AWS S3 for 3D models

## 🗂️ Complete Directory Structure

```
collab-hub/
│
├── client/                          # React Frontend (Vite)
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js            # Axios instance with auth interceptors
│   │   │   └── socket.js           # Socket.io client initialization
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx      # Navigation with user menu
│   │   │   │   └── Sidebar.jsx     # Filter sidebar (Category, Material, Price)
│   │   │   │
│   │   │   ├── common/
│   │   │   │   ├── SkeletonLoader.jsx  # Loading placeholders
│   │   │   │   └── Toast.jsx           # Notification toasts
│   │   │   │
│   │   │   └── marketplace/
│   │   │       ├── ProductCard.jsx     # Design card component
│   │   │       ├── UploadForm.jsx      # File upload form with drag-drop
│   │   │       ├── LiveFeed.jsx        # Real-time activity feed
│   │   │       └── PresenceIndicators.jsx  # Online users indicator
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js          # Authentication logic
│   │   │   ├── useDesigns.js       # Design fetching and filtering
│   │   │   └── useSocket.js        # Socket.io event hooks
│   │   │
│   │   ├── store/
│   │   │   ├── index.js            # Redux store configuration
│   │   │   ├── cartSlice.js        # Cart state management
│   │   │   └── notificationSlice.js # Notifications state
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Marketplace homepage
│   │   │   ├── Login.jsx           # User login page
│   │   │   ├── Register.jsx        # User registration page
│   │   │   ├── Upload.jsx          # Design upload page
│   │   │   ├── Cart.jsx            # Shopping cart
│   │   │   └── DesignDetails.jsx   # Design details page
│   │   │
│   │   ├── App.jsx                 # Main app component with routing
│   │   ├── main.jsx                # React DOM entry point
│   │   └── index.css               # Global styles with Tailwind
│   │
│   ├── index.html                  # HTML template
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   ├── postcss.config.js           # PostCSS configuration
│   └── .env.example                # Environment variables template
│
├── server/                          # Express Backend
│   ├── config/
│   │   ├── database.js             # MongoDB connection setup
│   │   └── cloudinary.js           # Cloudinary image service config
│   │
│   ├── controllers/
│   │   ├── authController.js       # Register, Login, Profile logic
│   │   └── designController.js     # Design CRUD and filtering
│   │
│   ├── middleware/
│   │   ├── auth.js                 # JWT authentication middleware
│   │   └── upload.js               # Multer file upload middleware
│   │
│   ├── models/
│   │   ├── User.js                 # User schema with auth methods
│   │   ├── Design.js               # Design schema with indexes
│   │   ├── Review.js               # Review schema
│   │   └── Notification.js         # Notification schema
│   │
│   ├── routes/
│   │   ├── auth.js                 # Authentication endpoints
│   │   └── designs.js              # Design CRUD endpoints
│   │
│   ├── sockets/
│   │   └── handlers.js             # Socket.io event handlers
│   │
│   ├── index.js                    # Server entry point
│   ├── package.json                # Backend dependencies
│   └── .env.example                # Environment variables template
│
├── .gitignore                       # Git ignore rules
├── package.json                     # Root package.json with scripts
├── README.md                        # Full documentation
├── QUICKSTART.md                    # Quick setup guide
└── PROJECT_STRUCTURE.txt            # This file

```

## 🚀 Key Features Breakdown

### 1. **Real-Time Engine**

#### Live Activity Feed (`components/marketplace/LiveFeed.jsx`)
- Displays recent uploads, purchases, and user activity
- Updates in real-time via Socket.io
- Shows timestamp and activity type with icons

#### Notifications (`hooks/useSocket.js`)
- Toast notifications for likes, comments, purchases
- Managed via Redux for state persistence
- Socket events: 'notification' triggers UI updates

#### Presence Indicators (`components/marketplace/PresenceIndicators.jsx`)
- Shows online users with green status indicator
- Socket events: 'user-online', 'user-offline'
- Updates instantly when users connect/disconnect

### 2. **Marketplace Logic**

#### Multi-Criteria Filtering (`components/layout/Sidebar.jsx`)
- **Category**: Miniatures, Mechanical, Jewelry, Functional, Art, Architecture, Gaming, Educational
- **Material**: PLA, ABS, Resin, Nylon, Metal, Other
- **Price Ranges**: Free, $0-10, $10-50, $50+
- Filtered via query params: `/designs?category=Miniatures&material=PLA&priceMin=0&priceMax=50`

#### Asset Management
- **Preview Images**: Uploaded to Cloudinary via multer
- **3D Models**: Uploaded to AWS S3 (.stl, .obj, .gltf files)
- File validation and size limits (100MB max)

#### Shopping Cart (`store/cartSlice.js`)
- Redux Toolkit state management
- Add/remove items, clear cart
- Persistent across sessions (localStorage)
- Calculate totals automatically

### 3. **User Experience**

#### Responsive Design
- Mobile-first Tailwind CSS
- Grid system: 1 col mobile → 2 col tablet → 3+ col desktop
- Sticky navbar with hamburger menu on mobile

#### Skeleton Loaders (`components/common/SkeletonLoader.jsx`)
- Framer Motion animated placeholders
- Improves perceived performance
- Shows during API calls

#### Smooth Animations (`components/common/Toast.jsx`)
- Framer Motion entrance/exit animations
- Hover effects on cards
- Loading state indicators

## 🔌 API Endpoints Reference

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
```

### Designs
```
GET    /api/designs?category=X&material=Y&priceMin=Z&priceMax=W&search=Q&page=1&limit=12
GET    /api/designs/:id
POST   /api/designs                 (multipart/form-data)
PUT    /api/designs/:id
DELETE /api/designs/:id
POST   /api/designs/:id/like
```

## 🔌 Socket.io Events

### Server Broadcasts
```
user-online                 // User joins
user-offline                // User disconnects
live-feed-update           // New upload/purchase
notification               // Toast notification
design-like-update         // Like count changed
design-comment-update      // Comment added
```

### Client Emits
```
join-room                  // Subscribe to user room
design-uploaded            // Broadcast new upload
design-liked               // Broadcast like
comment-posted             // Broadcast comment
purchase-completed         // Broadcast purchase
user-followed              // Broadcast follow
typing                     // Show typing indicator
```

## 📊 Database Schema

### User Collection
```javascript
{
  name, email, password, avatar, bio, isOnline, lastSeen,
  designs: [ObjectId],
  cart: [{design: ObjectId, addedAt: Date}],
  watchlist: [ObjectId],
  purchases: [{design: ObjectId, purchasedAt: Date}],
  followers: [ObjectId],
  following: [ObjectId],
  role: enum('user', 'designer', 'admin')
}
```

### Design Collection
```javascript
{
  title, description, category, material, price, currency,
  creator: ObjectId,
  previewImages: [{url, cloudinaryId}],
  modelFile: {url, s3Key, fileType},
  tags: [String],
  likes: [ObjectId],
  downloads: Number,
  likeCount: Number,
  reviews: [ObjectId],
  averageRating: Number,
  isPublished: Boolean
}
```

## 🛠️ Development Workflow

### 1. Server Development
```bash
cd server
npm run dev      # Runs with nodemon (auto-reload)
```
- Edit files in `controllers/`, `routes/`, `models/`
- Changes auto-reload via nodemon
- Test with Postman/Thunder Client

### 2. Client Development
```bash
cd client
npm run dev      # Runs Vite dev server
```
- Edit React components (hot reload)
- Changes visible instantly in browser
- Socket.io connects automatically

### 3. Socket.io Testing
- Open 2+ browser tabs
- Perform action in one tab (like, upload, etc.)
- Watch real-time updates in other tabs
- Check browser console for Socket events

## 🔐 Authentication Flow

1. User signs up/logs in via Auth pages
2. Server returns JWT token
3. Token stored in localStorage
4. Axios interceptor adds `Authorization: Bearer {token}` to requests
5. Socket.io connects with userId
6. Protected routes check for valid token

## 📝 Adding New Features

### Add New Design Category
1. Update enum in `server/models/Design.js`
2. Update select options in `client/components/layout/Sidebar.jsx`
3. Test filtering in UI

### Add New Notification Type
1. Create handler in `server/sockets/handlers.js`
2. Add Socket event in client `hooks/useSocket.js`
3. Add notification badge/toast in UI

### Add Cart Functionality
1. Dispatch Redux action: `dispatch(addToCart(design))`
2. Access cart in any component: `const cart = useSelector(state => state.cart)`
3. Update cart UI components

## 🐛 Common Debugging

### Socket.io Not Connecting
```javascript
// Check in browser console
io.connect()  // Should show connection status
// Check server console for connection logs
```

### API 401 Unauthorized
```javascript
// Verify token is stored
localStorage.getItem('token')
// Verify Authorization header in Network tab
```

### Cloudinary Upload Failing
- Check credentials in `.env`
- Verify file type and size
- Check upload quota

## 🚢 Production Deployment

### Server (Heroku example)
1. Set environment variables
2. Ensure `npm start` works
3. Deploy with `git push heroku main`

### Client (Vercel example)
1. Run `npm run build`
2. Deploy `dist/` folder
3. Set environment variables in dashboard

## 📚 Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Socket.io Docs](https://socket.io/docs)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

---

**Ready to start? See [QUICKSTART.md](./QUICKSTART.md) for immediate setup instructions!**
