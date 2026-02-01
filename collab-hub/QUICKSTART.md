# Quick Start Guide for CollabHub

## 1. Initial Setup

### Install all dependencies
```bash
npm run install:all
```

This will install:
- Root project dependencies
- Server dependencies
- Client dependencies

## 2. Environment Configuration

### Server Setup
```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your credentials:
- MongoDB URI
- JWT Secret
- Cloudinary credentials
- AWS S3 details

### Client Setup
```bash
cd client
cp .env.example .env
```

Edit `client/.env`:
- API URL (usually http://localhost:5000/api)
- Socket.io URL (usually http://localhost:5000)

## 3. Start Development Servers

### Option A: Run both servers concurrently
From root directory:
```bash
npm run dev
```

### Option B: Run servers separately
Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

## 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Socket.io: http://localhost:5000

## 5. Create Your First Design

1. Click "Sign Up" and create an account
2. After login, click "Upload"
3. Fill in design details (title, description, category, material, price)
4. Upload preview images and a 3D model file (.stl, .obj, or .gltf)
5. Click "Upload Design"

## 6. Test Real-Time Features

Open the app in two browser tabs:
- In Tab 1: Upload a design or like a design
- In Tab 2: Watch the live feed update and notifications appear in real-time

## Development Tips

### Hot Reload
Both Vite (client) and Nodemon (server) watch for file changes and reload automatically.

### API Testing
Use Postman or Thunder Client with:
- Base URL: http://localhost:5000/api
- Include `Authorization: Bearer {token}` header for protected routes

### Database Inspection
Install MongoDB Compass to visualize your database at `mongodb://localhost:27017/collab-hub`

### Debugging
- Open Chrome DevTools (F12) for frontend debugging
- Use `console.log()` or VS Code Debugger for backend
- Check Network tab for API calls and Socket.io connections

## Common Issues & Fixes

**Port already in use?**
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 5173
npx kill-port 5173
```

**MongoDB connection failed?**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For MongoDB Atlas, whitelist your IP

**Cloudinary errors?**
- Verify credentials are correct
- Check file upload size limits

**Socket.io not connecting?**
- Ensure server is running
- Check browser console for connection errors
- Verify CORS is properly configured

## Next Steps

1. Add payment integration (Stripe)
2. Implement user reviews system
3. Add design collaboration features
4. Create designer portfolio pages
5. Implement advanced search
6. Add email notifications
7. Deploy to production

## Useful Commands

```bash
# View server logs
npm run dev --prefix server

# View client build progress
npm run build --prefix client

# Format code (if configured)
npm run lint

# Check for updates
npm outdated
```

## Support

Refer to the main [README.md](./README.md) for detailed documentation and API references.
