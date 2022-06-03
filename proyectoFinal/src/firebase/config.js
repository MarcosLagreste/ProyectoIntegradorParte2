import firebase from "firebase";
import app from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyAkVWqk7U1YX6NbiZL0oG4UtG0Gt7AQVz0",
  authDomain: "proyectofinal-dh.firebaseapp.com",
  projectId: "proyectofinal-dh",
  storageBucket: "proyectofinal-dh.appspot.com",
  messagingSenderId: "182373649925",
  appId: "1:182373649925:web:86175bf2aafb2e2121166c"
};

  app.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()