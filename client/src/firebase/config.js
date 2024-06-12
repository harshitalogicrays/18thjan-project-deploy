import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnibfmGZqQ2-2ch3tG2YsJQhRYeeXsYhU",
  authDomain: "thjan-ecommerce.firebaseapp.com",
  projectId: "thjan-ecommerce",
  storageBucket: "thjan-ecommerce.appspot.com",
  messagingSenderId: "607668651230",
  appId: "1:607668651230:web:f2b0b2040f7dd809f1ee4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app