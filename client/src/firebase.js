// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-979dd.firebaseapp.com",
  projectId: "mern-auth-979dd",
  storageBucket: "mern-auth-979dd.appspot.com",
  messagingSenderId: "589957140737",
  appId: "1:589957140737:web:9a36bebcb8939cc99b4b00"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);