#!/bin/bash

# CollabHub - Complete Setup Script
# This script sets up the entire project from scratch

echo "🚀 CollabHub - Complete Setup Script"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Create root node_modules
echo "📦 Installing root dependencies..."
npm install 2>&1 | tail -5
echo ""

# Setup Server
echo "🔧 Setting up backend server..."
cd server

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating server/.env from template..."
    cp .env.example .env
    echo "⚠️  Please edit server/.env with your database and API credentials"
else
    echo "✅ server/.env already exists"
fi

echo "📦 Installing server dependencies..."
npm install 2>&1 | tail -5
echo ""

# Setup Client
cd ../client

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating client/.env from template..."
    cp .env.example .env
    echo "⚠️  Using default URLs (localhost:5000 for API and Socket.io)"
else
    echo "✅ client/.env already exists"
fi

echo "📦 Installing client dependencies..."
npm install 2>&1 | tail -5
echo ""

cd ..

echo ""
echo "=================================================="
echo "✅ Setup Complete!"
echo "=================================================="
echo ""
echo "📋 Next Steps:"
echo ""
echo "1️⃣  Configure Environment Variables"
echo "   - Edit server/.env with your credentials"
echo "   - MongoDB, Cloudinary, AWS, JWT Secret"
echo ""
echo "2️⃣  Start the Servers"
echo "   From the root directory:"
echo "   npm run dev"
echo ""
echo "   Or manually:"
echo "   Terminal 1: npm run dev:server"
echo "   Terminal 2: npm run dev:client"
echo ""
echo "3️⃣  Access the Application"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo ""
echo "4️⃣  Create Your Account & Test"
echo "   - Sign up with any email"
echo "   - Upload a 3D design"
echo "   - Watch real-time updates!"
echo ""
echo "📚 For more details, see:"
echo "   - README.md - Full documentation"
echo "   - QUICKSTART.md - Quick start guide"
echo "   - DEVELOPMENT_GUIDE.md - Development reference"
echo ""
echo "🆘 Troubleshooting:"
echo "   - MongoDB not running? → npm install -g mongodb"
echo "   - Port already in use? → npm install -g kill-port && kill-port 5000"
echo "   - Missing Cloudinary? → Get free account at cloudinary.com"
echo ""
