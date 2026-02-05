import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCuot4TjRqfaCONtsJ77nCJ0_6D9LXdC8s",
    authDomain: "dev-tool-d8260.firebaseapp.com",
    projectId: "dev-tool-d8260",
    storageBucket: "dev-tool-d8260.firebasestorage.app",
    messagingSenderId: "383367145772",
    appId: "1:383367145772:web:1bc7950df69bdb0b8c2489",
    measurementId: "G-VJ4G6VR5WM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export these so your Login and Register pages can use them
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();