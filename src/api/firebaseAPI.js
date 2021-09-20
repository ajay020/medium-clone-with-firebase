import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4QX56Ne53Uk39q_M8S9_2GdYKE1BUqlM",
  authDomain: "blog-app-a392f.firebaseapp.com",
  projectId: "blog-app-a392f",
  storageBucket: "blog-app-a392f.appspot.com",
  messagingSenderId: "197083553916",
  appId: "1:197083553916:web:b2a532337a2d7158b669f9",
  measurementId: "G-7JYYYNZTP0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore()
const auth = app.auth()


export  {auth }
export default db

