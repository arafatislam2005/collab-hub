import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: "AIzaSyDUpVeYQGkDqmEd1Qa_lbGELbzhVLy2U7g",
  authDomain: "collab-hub-aeba1.firebaseapp.com",
  projectId: "collab-hub-aeba1",
  storageBucket: "collab-hub-aeba1.firebasestorage.app",
  messagingSenderId: "871854513078",
  appId: "1:871854513078:web:720fd0d22e2f9d083dff17",
  measurementId: "G-1D318175H7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Optional: Connect to emulator for development
// Uncomment the lines below if you're using Firebase emulator
/*
if (import.meta.env.MODE === 'development' && !window.location.hostname.includes('localhost')) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
}
*/

export default app;
