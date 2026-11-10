import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAHkqrr1DTYxJPikEJlApfpwtCY6GhJuxg",
  authDomain: "firstproject-a4250.firebaseapp.com",
  projectId: "firstproject-a4250",
  storageBucket: "firstproject-a4250.firebasestorage.app",
  messagingSenderId: "414403589863",
  appId: "1:414403589863:web:ae5fb257d0584961f21442",
  measurementId: "G-DP7TWYCR1Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();