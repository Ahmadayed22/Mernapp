// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpdr8af5GQXEvWdZ3PrTn1GY5URRXYtkc",
  authDomain: "mern-blog-7898a.firebaseapp.com",
  projectId: "mern-blog-7898a",
  storageBucket: "mern-blog-7898a.appspot.com",
  messagingSenderId: "627226226742",
  appId: "1:627226226742:web:c33f058ab649b52d992897"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);