// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider, signInWithPopup} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE2N0PrQOgW2hHjbsi7E5uUIK4xFk7Iik",
  authDomain: "vyam-a7dfd.firebaseapp.com",
  projectId: "vyam-a7dfd",
  storageBucket: "vyam-a7dfd.appspot.com",
  messagingSenderId: "665118277680",
  appId: "1:665118277680:web:520b964e0c2e4f45412df5",
  measurementId: "G-E4P4337CWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async() =>{
  try {
    const result = await signInWithPopup(auth,googleProvider);
    // console.log(result);
  } catch (error) {
    throw error;
  }
};

export { auth, googleProvider, signInWithGoogle}