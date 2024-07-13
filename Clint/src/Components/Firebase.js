// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// console.log(import.meta.env.VITE_apiKey)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: "mern-app-9581e.firebaseapp.com",
  projectId: "mern-app-9581e",
  storageBucket: "mern-app-9581e.appspot.com",
  messagingSenderId: "566604616398",
  appId: "1:566604616398:web:463f592dd5f057c4e4769f",
  measurementId: "G-H2QN11XQJ8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
