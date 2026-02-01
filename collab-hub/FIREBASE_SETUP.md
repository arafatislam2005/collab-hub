# Firebase Authentication Setup Guide

## Overview
This application now uses Firebase Authentication for user registration and login. This guide will help you set up Firebase for your project.

## Prerequisites
- A Google account
- Access to [Firebase Console](https://console.firebase.google.com/)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter a project name (e.g., "collab-hub")
4. Select your country/region
5. Click **"Create project"**
6. Wait for the project to be created

## Step 2: Register Your Web App

1. In the Firebase Console, click the **Web** icon (</>) to add a web app
2. Enter your app name (e.g., "collab-hub-web")
3. Optionally enable Firebase Hosting
4. Click **"Register app"**
5. Firebase will generate your configuration. **Copy the entire config object**

## Step 3: Get Your Firebase Credentials

From the Firebase config, you'll see something like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDxxx...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456"
};
```

## Step 4: Configure Environment Variables

1. Navigate to the `client` folder
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. Open `.env.local` and fill in your Firebase credentials:
   ```
   VITE_FIREBASE_API_KEY=AIzaSyDxxx...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
   VITE_FIREBASE_APP_ID=1:1234567890:web:abc123def456
   ```

## Step 5: Enable Authentication Methods

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Click **Email/Password** provider
3. Enable both:
   - ✓ Email/Password
   - ✓ Email link (passwordless sign-in) - Optional
4. Click **Save**

## Step 6: Create Firestore Database (for user data)

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select your region
5. Click **Create**

### Create Users Collection Rules

Go to **Firestore Database** → **Rules** tab and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection rules
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow create: if request.auth.uid != null;
    }
    
    // Designs collection rules
    match /designs/{designId} {
      allow read: if true;
      allow write: if request.auth.uid != null;
      allow delete: if request.auth.uid == resource.data.userId;
    }
    
    // Default deny all other requests
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Click **Publish** to save the rules.

## Step 7: Install Dependencies

From the `client` folder, run:

```bash
npm install
```

Firebase will be installed as a dependency.

## Step 8: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173/register`
3. Try creating a new account
4. You should receive a confirmation and be logged in

## Features Implemented

### Authentication
- ✓ Email/Password Registration
- ✓ Email/Password Login
- ✓ Logout
- ✓ Session Persistence
- ✓ Real-time Auth State Management

### User Data
- ✓ User profiles stored in Firestore
- ✓ Auto-generated avatar URLs
- ✓ User creation timestamps
- ✓ Role-based access (default: 'user')

### Security
- ✓ Firebase Security Rules
- ✓ Client-side validation
- ✓ Error handling with user-friendly messages
- ✓ Password strength requirements

## Security Best Practices

### For Development
- Use test mode for Firestore
- Keep `.env.local` in `.gitignore` (already configured)

### For Production
1. **Move to Production Mode:**
   - In Firestore, switch from test mode to production rules
   - Ensure security rules are properly configured

2. **Enable Additional Security:**
   - Set up Cloud Functions for custom authentication logic
   - Enable reCAPTCHA for registration
   - Set up email verification

3. **Backend Integration:**
   - Create a backend service to exchange Firebase ID tokens for app-specific tokens
   - Implement server-side session management
   - Add additional user validation and data

## Troubleshooting

### "Module not found: 'firebase'"
- Run `npm install firebase` in the client folder

### "VITE_FIREBASE_API_KEY is undefined"
- Ensure `.env.local` file exists in the client folder
- Check all environment variable names match exactly
- Restart the development server after updating `.env.local`

### "User already exists"
- Clear browser localStorage: `localStorage.clear()`
- Try with a different email

### Authentication not persisting
- Check browser localStorage is enabled
- Verify `.env.local` has correct Firebase credentials

## File Changes

The following files have been modified for Firebase integration:

1. **client/src/config/firebase.js** - Firebase initialization
2. **client/src/hooks/useAuth.js** - Firebase authentication logic
3. **client/src/pages/Login.jsx** - Updated login form
4. **client/src/pages/Register.jsx** - Updated registration form
5. **client/package.json** - Added Firebase dependency
6. **client/.env.example** - Firebase environment variables

## Next Steps

1. Implement Firestore for storing design data
2. Add email verification
3. Implement password reset functionality
4. Add social authentication (Google, GitHub)
5. Create backend authentication service
6. Set up Cloud Storage for file uploads

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/overview)
