// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyCgvBMf6gMcVJLRd-sNrH5jKQVbtcLl1lY",
  authDomain: "ngcoinsdb.firebaseapp.com",
  projectId: "ngcoinsdb",
  storageBucket: "ngcoinsdb.appspot.com",
  messagingSenderId: "432636191445",
  appId: "1:432636191445:web:9d8a9da9c8f2364112b85c",
  measurementId: "G-CDK7E8717Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)

export { db, auth, storage };