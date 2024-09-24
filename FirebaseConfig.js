// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdx36_Tz34dtjG39WOa3Qmxh8Z32fGqK0",
  authDomain: "crim-reviewer.firebaseapp.com",
  projectId: "crim-reviewer",
  storageBucket: "crim-reviewer.appspot.com",
  messagingSenderId: "251000359898",
  appId: "1:251000359898:web:b9ccff5ee0ca42d0f84ee3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firestore
export const db = getFirestore(app);
// Initialize Firebase Authentication
export const auth = getAuth(app); // Export the auth instance
