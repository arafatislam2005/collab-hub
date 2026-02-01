# CollabHub - Sample Data & Testing Guide

## 📊 Sample Test Data

### Test User Accounts

Use these after creating accounts through signup:

```javascript
// Test User 1
{
  name: "Alice Designer",
  email: "alice@example.com",
  password: "password123"
}

// Test User 2
{
  name: "Bob Creator",
  email: "bob@example.com",
  password: "password123"
}

// Test User 3
{
  name: "Carol Artist",
  email: "carol@example.com",
  password: "password123"
}
```

### Sample Design Objects

These show what a typical design looks like in the database:

```javascript
{
  _id: "507f1f77bcf86cd799439011",
  title: "Dragon Figurine STL",
  description: "High-quality 3D printable dragon miniature, perfect for tabletop gaming. Includes supports.",
  creator: {
    _id: "507f191e810c19729de860ea",
    name: "Alice Designer",
    avatar: "https://via.placeholder.com/150"
  },
  category: "Miniatures",
  material: "PLA",
  price: 4.99,
  currency: "USD",
  previewImages: [
    {
      url: "https://res.cloudinary.com/demo/image/upload/dragon1.jpg",
      cloudinaryId: "collab-hub/designs/dragon1"
    }
  ],
  modelFile: {
    url: "https://s3.amazonaws.com/collab-hub/dragon-final.stl",
    s3Key: "designs/1643892300000-dragon-final.stl",
    fileType: "STL"
  },
  tags: ["dragon", "miniature", "stl", "gaming"],
  likes: ["507f191e810c19729de860eb"],
  downloads: 234,
  likeCount: 47,
  reviews: [],
  averageRating: 4.8,
  isPublished: true,
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-20T14:22:30Z"
}
```

### Sample Notification

```javascript
{
  _id: "507f1f77bcf86cd799439012",
  recipient: "507f191e810c19729de860ea",
  actor: {
    _id: "507f191e810c19729de860eb",
    name: "Bob Creator"
  },
  type: "like",
  design: {
    _id: "507f1f77bcf86cd799439011",
    title: "Dragon Figurine STL"
  },
  message: "Bob Creator liked your design 'Dragon Figurine STL'",
  isRead: false,
  createdAt: "2024-01-21T09:15:00Z"
}
```

---

## 🧪 Testing Scenarios

### 1. Authentication Flow
```
1. Visit http://localhost:5173
2. Click "Sign Up"
3. Enter: name, email, password
4. Click "Create Account"
5. Should redirect to homepage
6. Check localStorage: "token" should exist
```

### 2. Upload Design
```
1. Click "Upload" in navbar
2. Fill form:
   - Title: "My Cool Model"
   - Description: "A test model"
   - Category: Miniatures
   - Material: PLA
   - Price: 5.99
   - Tags: test, model
3. Select preview images (PNG, JPG)
4. Drag & drop or select .stl/.obj file
5. Click "Upload Design"
6. Should see success toast
7. Model appears in home feed
```

### 3. Real-Time Updates (2 Browsers)
```
1. Open http://localhost:5173 in Browser A
2. Open same URL in Browser B (new user)
3. In Browser A: Upload a design
4. Watch Browser B: Should see it in Live Feed instantly
5. In Browser B: Like the design
6. In Browser A: Should see notification toast
7. Like count should update instantly
```

### 4. Filtering
```
1. On home page, use sidebar filters
2. Select Category: "Mechanical"
3. Select Material: "Resin"
4. Select Price: "$10-$50"
5. Enter search: "robot"
6. Should see filtered results
7. Change filters - results update
8. Click "Reset Filters" - clears all
```

### 5. Shopping Cart
```
1. Click product card shopping cart icon
2. Item added to cart (toast notification)
3. Click "Cart" in navbar
4. See all items with prices
5. Click trash icon to remove item
6. Click "Clear Cart" to empty
7. Total price updates automatically
```

### 6. Design Details
```
1. Click on product card (not cart icon)
2. See full design page with:
   - Large preview image
   - All preview thumbnails
   - Creator info
   - Rating and stats
   - Download button (or purchase if paid)
   - Wishlist button
3. Scroll down to see reviews section
```

### 7. Online Presence
```
1. User A opens app
2. Check "Online Now" widget
3. User A should appear as online
4. User A closes browser/logs out
5. User A should disappear from online list
6. "User offline" event broadcasts
```

### 8. Notifications
```
1. User A: Like User B's design
2. User B: Should get toast notification
3. "User A liked your design 'Title'"
4. Toast disappears after 3 seconds
5. Check notification badge in navbar
```

---

## 🔍 API Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get All Designs
```bash
curl -X GET "http://localhost:5000/api/designs?category=Miniatures&material=PLA&priceMin=0&priceMax=50&page=1&limit=12"
```

### Get Design Details
```bash
curl -X GET http://localhost:5000/api/designs/{design_id}
```

### Like a Design
```bash
curl -X POST http://localhost:5000/api/designs/{design_id}/like \
  -H "Authorization: Bearer {your_token}"
```

---

## 📊 Database Query Examples

### Using MongoDB Compass

#### Count total designs
```javascript
db.designs.countDocuments({})
```

#### Find designs by category
```javascript
db.designs.find({ category: "Miniatures" })
```

#### Find designs sorted by likes
```javascript
db.designs.find({}).sort({ likeCount: -1 }).limit(10)
```

#### Get average price by material
```javascript
db.designs.aggregate([
  { $group: { _id: "$material", avgPrice: { $avg: "$price" } } }
])
```

#### Find most downloaded designs
```javascript
db.designs.find({}).sort({ downloads: -1 }).limit(5)
```

#### Get user with most designs
```javascript
db.users.aggregate([
  { $addFields: { designCount: { $size: "$designs" } } },
  { $sort: { designCount: -1 } },
  { $limit: 1 }
])
```

---

## 🔌 Socket.io Testing

### Using Browser Console

```javascript
// Check socket connection
io.connect()

// Listen for events
socket.on('notification', (data) => console.log('Notification:', data))
socket.on('live-feed-update', (data) => console.log('Feed:', data))
socket.on('user-online', (data) => console.log('Online:', data))

// Emit events
socket.emit('design-uploaded', { 
  user: { id: '123', name: 'John' },
  design: { _id: '456', title: 'Dragon' }
})
```

---

## 📈 Performance Testing

### Load Testing
```bash
# Install artillery
npm install -g artillery

# Create load test file (load-test.yml)
config:
  target: http://localhost:5000/api
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: Get Designs
    flow:
      - get:
          url: /designs?limit=12

# Run test
artillery run load-test.yml
```

### Memory Profiling
- Open DevTools → Performance
- Record user actions
- Analyze memory usage
- Check for memory leaks

---

## 🎯 Acceptance Criteria Checklist

### Real-Time Features
- [ ] Live feed updates without page refresh
- [ ] Socket.io notifications appear as toasts
- [ ] Online users shown in sidebar
- [ ] Multiple browsers sync in real-time

### Marketplace Features
- [ ] Filtering works for category/material/price
- [ ] Full-text search works
- [ ] Products display with images
- [ ] Like count updates instantly
- [ ] Shopping cart persists

### User Features
- [ ] Sign up/login works
- [ ] Can upload designs
- [ ] Profile can be updated
- [ ] Authentication persists with JWT

### UI Features
- [ ] Mobile responsive
- [ ] Skeleton loaders show during load
- [ ] Animations smooth
- [ ] Dark theme consistent
- [ ] Navigation works

---

## 📋 Debugging Checklist

### Backend Issues
- [ ] Check server logs for errors
- [ ] Verify environment variables set
- [ ] Test API with cURL/Postman
- [ ] Check MongoDB connection
- [ ] Verify JWT token is valid

### Frontend Issues
- [ ] Open browser DevTools console
- [ ] Check Network tab for API errors
- [ ] Verify Redux store (Redux DevTools)
- [ ] Check Socket.io connection
- [ ] Test localStorage for token

### Real-Time Issues
- [ ] Verify socket is connected
- [ ] Check emission of events
- [ ] Verify room join is successful
- [ ] Check CORS configuration

---

## 💾 Test Data Insertion

### Create via API (Postman)
1. Register user (get token)
2. Upload design with multipart form
3. Like design
4. Add to cart
5. Update profile

### Create via MongoDB
```javascript
// Insert test designs
db.designs.insertMany([
  {
    title: "Test Design 1",
    category: "Miniatures",
    material: "PLA",
    price: 9.99,
    // ... other fields
  },
  {
    title: "Test Design 2",
    category: "Mechanical",
    material: "Resin",
    price: 19.99,
    // ... other fields
  }
])
```

---

## 📚 Resources

- MongoDB Compass - Visual DB: https://www.mongodb.com/products/compass
- Postman - API Testing: https://www.postman.com/
- Redux DevTools - State Debugging: https://github.com/reduxjs/redux-devtools
- Socket.io Client Debugging: https://socket.io/docs/v4/client-api/
- React DevTools - Component Debugging: https://react-devtools-tutorial.vercel.app/

---

**Happy Testing! 🎉**
