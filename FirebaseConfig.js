// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
// Initialize Firebase Auth with AsyncStorage for persistence
let auth;
try {
  auth = getAuth(app);
} catch (error) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage), // This enables persistence across sessions
  });
}

export { auth };
