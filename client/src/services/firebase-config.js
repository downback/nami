// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1URYleDTpw1N4x7jdhKoDyHqsCT2GDaQ",
  authDomain: "nami-tattoo.firebaseapp.com",
  projectId: "nami-tattoo",
  storageBucket: "nami-tattoo.firebasestorage.app",
  messagingSenderId: "1083455829474",
  appId: "1:1083455829474:web:6be9b493e97eef30c0b5bb",
  measurementId: "G-V9LDSH1KS2",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getFirestore(app)
