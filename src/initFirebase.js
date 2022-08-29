// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByCjWDGZ9T6HbJ81FGB_WN2SxTpOxezY4",
  authDomain: "oncall-8f89a.firebaseapp.com",
  projectId: "oncall-8f89a",
  storageBucket: "oncall-8f89a.appspot.com",
  messagingSenderId: "247857978358",
  appId: "1:247857978358:web:221a76db8a5c6d51ed45d7",
  measurementId: "G-FTCKMRRBH1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
