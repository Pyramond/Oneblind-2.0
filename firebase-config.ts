import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSgXVua1naewd7chRHxx8pcBOshJOxTG0",
  authDomain: "oneblind-800bb.firebaseapp.com",
  projectId: "oneblind-800bb",
  storageBucket: "oneblind-800bb.firebasestorage.app",
  messagingSenderId: "483956677247",
  appId: "1:483956677247:web:3a3f67a011435b8d973d4a",
  measurementId: "G-FNFSHHZRQQ",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
