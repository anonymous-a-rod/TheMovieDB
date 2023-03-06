// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfXRJkrrbV7A96n47kMgUEjVs7xi3xVUg",
    authDomain: "cinetrail-1430b.firebaseapp.com",
    databaseURL: "https://cinetrail-1430b-default-rtdb.firebaseio.com",
    projectId: "cinetrail-1430b",
    storageBucket: "cinetrail-1430b.appspot.com",
    messagingSenderId: "974808979191",
    appId: "1:974808979191:web:398c9d3d5de8c3a5be65f2",
    measurementId: "G-KPY68V2SDJ"
  };

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();