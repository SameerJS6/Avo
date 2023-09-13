import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const APIKEY = import.meta.env.VITE_FIREBASE_API_KEY;
const AUTHDOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const PROJECTID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const STORAGEBUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const SENDERID = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const APPID = import.meta.env.VITE_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: SENDERID,
  appId: APPID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

export { app, auth, googleProvider };
