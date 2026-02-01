@echo off
REM Firebase Setup Helper Script for Windows

echo.
echo =========================================
echo Firebase Setup Helper
echo =========================================
echo.
echo This script will help you configure Firebase for your project.
echo.
echo Get your Firebase credentials from:
echo https://console.firebase.google.com/
echo.
echo Steps:
echo 1. Create a Firebase project
echo 2. Add a Web app
echo 3. Copy the configuration values below
echo.

REM Check if .env.local exists
if not exist "client\.env.local" (
    echo Creating .env.local from .env.example...
    copy client\.env.example client\.env.local
    echo. ✓ .env.local created
) else (
    echo .env.local already exists
)

echo.
echo Please enter your Firebase credentials:
echo.

setlocal enabledelayedexpansion

set /p API_KEY="Enter your Firebase API Key: "
set /p AUTH_DOMAIN="Enter your Firebase Auth Domain: "
set /p PROJECT_ID="Enter your Firebase Project ID: "
set /p STORAGE_BUCKET="Enter your Firebase Storage Bucket: "
set /p MESSAGING_SENDER_ID="Enter your Firebase Messaging Sender ID: "
set /p APP_ID="Enter your Firebase App ID: "

REM Update .env.local with the provided values
(
echo # Firebase Configuration
echo VITE_FIREBASE_API_KEY=!API_KEY!
echo VITE_FIREBASE_AUTH_DOMAIN=!AUTH_DOMAIN!
echo VITE_FIREBASE_PROJECT_ID=!PROJECT_ID!
echo VITE_FIREBASE_STORAGE_BUCKET=!STORAGE_BUCKET!
echo VITE_FIREBASE_MESSAGING_SENDER_ID=!MESSAGING_SENDER_ID!
echo VITE_FIREBASE_APP_ID=!APP_ID!
echo.
echo # Server Configuration
echo VITE_API_URL=http://localhost:5000/api
echo VITE_SOCKET_URL=http://localhost:5000
) > client\.env.local

echo.
echo ✓ Firebase credentials saved to client\.env.local
echo.
echo Next steps:
echo 1. cd client
echo 2. npm install
echo 3. npm run dev
echo.
echo Then visit http://localhost:5173/register to test registration!
echo.

endlocal
pause
