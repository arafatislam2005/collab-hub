import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setAuthLoading(true);
        if (firebaseUser) {
          setFirebaseUser(firebaseUser);
          // Get user data from Firestore
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email,
              ...userSnap.data(),
            });
          } else {
            // If user doc doesn't exist, create one
            const userData = {
              email: firebaseUser.email,
              name: firebaseUser.displayName || 'User',
              avatar: firebaseUser.photoURL || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
              createdAt: new Date(),
            };
            await setDoc(userRef, userData);
            setUser({
              id: firebaseUser.uid,
              ...userData,
            });
          }
        } else {
          setFirebaseUser(null);
          setUser(null);
        }
      } catch (err) {
        console.error('Error loading user:', err);
        setError(err.message);
      } finally {
        setAuthLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);

      // Create user with Firebase Auth
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile with name
      await updateProfile(firebaseUser, {
        displayName: name,
        photoURL: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      });

      // Create user document in Firestore
      const userData = {
        email,
        name,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
        role: 'user',
        createdAt: new Date(),
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userData);

      const token = await firebaseUser.getIdToken();
      localStorage.setItem('token', token);

      setUser({
        id: firebaseUser.uid,
        ...userData,
      });

      return {
        success: true,
        user: {
          id: firebaseUser.uid,
          email,
          name,
        },
      };
    } catch (err) {
      const errorMessage = getFirebaseErrorMessage(err.code);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      const token = await firebaseUser.getIdToken();
      localStorage.setItem('token', token);

      return {
        success: true,
        user: firebaseUser,
      };
    } catch (err) {
      const errorMessage = getFirebaseErrorMessage(err.code);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      localStorage.removeItem('token');
      setUser(null);
      setFirebaseUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getMe = async () => {
    if (!firebaseUser) return null;

    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = {
          id: firebaseUser.uid,
          ...userSnap.data(),
        };
        setUser(userData);
        return userData;
      }
      return null;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    firebaseUser,
    loading,
    error,
    authLoading,
    register,
    login,
    logout,
    getMe,
  };
};

// Helper function to convert Firebase error codes to user-friendly messages
const getFirebaseErrorMessage = (code) => {
  const errorMessages = {
    'auth/user-not-found': 'User not found. Please check your email or register.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/email-already-in-use': 'Email is already in use. Please log in or use a different email.',
    'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-disabled': 'User account has been disabled.',
    'auth/too-many-requests': 'Too many login attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your internet connection.',
  };

  return errorMessages[code] || 'Authentication failed. Please try again.';
};
