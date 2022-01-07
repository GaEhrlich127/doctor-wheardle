import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBg23XdRNQJ09KtCZ6mE1_R4Xny02YVM4E",
  authDomain: "wordle-clone.firebaseapp.com",
  projectId: "wordle-clone",
  storageBucket: "wordle-clone.appspot.com",
  messagingSenderId: "123423708712",
  appId: "1:123423708712:web:d539d7c7ae4da523a0871d",
  measurementId: "G-P4BLD5EEHG"
};
let app;
if (!getApps().length) {
    app=initializeApp(firebaseConfig)
}

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);