// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeHcuKro2foN85O4ReNbZrqrygmNXejIs",
  authDomain: "sword-and-shield-87c34.firebaseapp.com",
  projectId: "sword-and-shield-87c34",
  storageBucket: "sword-and-shield-87c34.firebasestorage.app",
  databaseURL:
    "https://sword-and-shield-87c34-default-rtdb.europe-west1.firebasedatabase.app/",
  messagingSenderId: "1021096508664",
  appId: "1:1021096508664:web:445695286cf18903178f0d",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };
