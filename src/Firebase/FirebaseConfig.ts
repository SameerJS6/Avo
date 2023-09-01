import { initializeApp } from "firebase/app";
// import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC1EXFdbKfcrLdV_52XSk5491uMImMZaoY",
  authDomain: "test-auth-22b11.firebaseapp.com",
  projectId: "test-auth-22b11",
  storageBucket: "test-auth-22b11.appspot.com",
  messagingSenderId: "225100695094",
  appId: "1:225100695094:web:ec73a894a7ac07935d3a97",
};

const app = initializeApp(firebaseConfig);
// const auth = app.auth()

export { app };
