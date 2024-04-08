// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOqmmT3bz4zQlYMRoiWRERj1hSMmXR4Z8",
  authDomain: "prueba-firebase-1c20d.firebaseapp.com",
  projectId: "prueba-firebase-1c20d",
  storageBucket: "prueba-firebase-1c20d.appspot.com",
  messagingSenderId: "601005208779",
  appId: "1:601005208779:web:472cb1326128ad38fbd74e",
  measurementId: "G-NB4MC0KTR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth

// Initialize Firestore
export const db = getFirestore(app);