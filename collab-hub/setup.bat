@echo off
REM CollabHub - Complete Setup Script for Windows
REM This script sets up the entire project from scratch

echo 🚀 CollabHub - Complete Setup Script (Windows)
echo =============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    echo    Visit: https://nodejs.org/
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

REM Create root node_modules
echo 📦 Installing root dependencies...
call npm install >nul 2>&1
echo ✅ Root dependencies installed
echo.

REM Setup Server
echo 🔧 Setting up backend server...
cd server

REM Check if .env exists
if not exist .env (
    echo 📝 Creating server\.env from template...
    copy .env.example .env >nul
    echo ⚠️  Please edit server\.env with your database and API credentials
) else (
    echo ✅ server\.env already exists
)

echo 📦 Installing server dependencies...
call npm install >nul 2>&1
echo ✅ Server dependencies installed
echo.

REM Setup Client
cd ..\client

REM Check if .env exists
if not exist .env (
    echo 📝 Creating client\.env from template...
    copy .env.example .env >nul
    echo ⚠️  Using default URLs (localhost:5000 for API and Socket.io)
) else (
    echo ✅ client\.env already exists
)

echo 📦 Installing client dependencies...
call npm install >nul 2>&1
echo ✅ Client dependencies installed
echo.

cd ..

echo.
echo ==================================================
echo ✅ Setup Complete!
echo ==================================================
echo.
echo 📋 Next Steps:
echo.
echo 1️⃣  Configure Environment Variables
echo    - Edit server\.env with your credentials
echo    - MongoDB, Cloudinary, AWS, JWT Secret
echo.
echo 2️⃣  Start the Servers
echo    From the root directory:
echo    npm run dev
echo.
echo    Or manually in separate terminals:
echo    Terminal 1: npm run dev:server
echo    Terminal 2: npm run dev:client
echo.
echo 3️⃣  Access the Application
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:5000
echo.
echo 4️⃣  Create Your Account ^& Test
echo    - Sign up with any email
echo    - Upload a 3D design
echo    - Watch real-time updates!
echo.
echo 📚 For more details, see:
echo    - README.md - Full documentation
echo    - QUICKSTART.md - Quick start guide
echo    - DEVELOPMENT_GUIDE.md - Development reference
echo.
echo 🆘 Troubleshooting:
echo    - MongoDB not running? Install MongoDB Community Edition
echo    - Port already in use? npm install -g kill-port, then kill-port 5000
echo    - Missing Cloudinary? Get free account at cloudinary.com
echo.
pause
