import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadString, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAp1M-_s1AaddRjGagMpvD2M3HDnHBYq7E",
  authDomain: "varsity-compass.firebaseapp.com",
  projectId: "varsity-compass",
  storageBucket: "varsity-compass.firebasestorage.app",
  messagingSenderId: "378912692572",
  appId: "1:378912692572:web:e6ac8e8d0857a06dd14999"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, doc, getDoc, setDoc, ref, uploadString, getDownloadURL, deleteObject };
