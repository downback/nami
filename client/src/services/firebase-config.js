import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA1URYleDTpw1N4x7jdhKoDyHqsCT2GDaQ",
  authDomain: "nami-tattoo.firebaseapp.com",
  projectId: "nami-tattoo",
  storageBucket: "nami-tattoo.firebasestorage.app",
  messagingSenderId: "1083455829474",
  appId: "1:1083455829474:web:6be9b493e97eef30c0b5bb",
  measurementId: "G-V9LDSH1KS2",
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)
