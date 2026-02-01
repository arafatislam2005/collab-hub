#!/bin/bash

# Firebase Setup Helper Script
# This script helps you set up Firebase environment variables

echo "========================================="
echo "Firebase Setup Helper"
echo "========================================="
echo ""
echo "This script will help you configure Firebase for your project."
echo ""
echo "Get your Firebase credentials from:"
echo "https://console.firebase.google.com/"
echo ""
echo "Steps:"
echo "1. Create a Firebase project"
echo "2. Add a Web app"
echo "3. Copy the configuration values below"
echo ""

# Check if .env.local exists
if [ ! -f "client/.env.local" ]; then
    echo "Creating .env.local from .env.example..."
    cp client/.env.example client/.env.local
    echo "✓ .env.local created"
else
    echo ".env.local already exists"
fi

echo ""
echo "Please enter your Firebase credentials:"
echo ""
echo "Enter your Firebase API Key:"
read API_KEY
echo ""
echo "Enter your Firebase Auth Domain:"
read AUTH_DOMAIN
echo ""
echo "Enter your Firebase Project ID:"
read PROJECT_ID
echo ""
echo "Enter your Firebase Storage Bucket:"
read STORAGE_BUCKET
echo ""
echo "Enter your Firebase Messaging Sender ID:"
read MESSAGING_SENDER_ID
echo ""
echo "Enter your Firebase App ID:"
read APP_ID

# Update .env.local with the provided values
sed -i "s/your_api_key_here/$API_KEY/" client/.env.local
sed -i "s/your_auth_domain_here/$AUTH_DOMAIN/" client/.env.local
sed -i "s/your_project_id_here/$PROJECT_ID/" client/.env.local
sed -i "s/your_storage_bucket_here/$STORAGE_BUCKET/" client/.env.local
sed -i "s/your_messaging_sender_id_here/$MESSAGING_SENDER_ID/" client/.env.local
sed -i "s/your_app_id_here/$APP_ID/" client/.env.local

echo ""
echo "✓ Firebase credentials saved to client/.env.local"
echo ""
echo "Next steps:"
echo "1. cd client"
echo "2. npm install"
echo "3. npm run dev"
echo ""
echo "Then visit http://localhost:5173/register to test registration!"
