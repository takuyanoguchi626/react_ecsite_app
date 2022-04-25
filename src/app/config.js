// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/firestore"; //firestoreを使う場合
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoKKCH0VwV6BVr9ZvYD4IPC30CB4_meYE",
  authDomain: "react-ecsite-app-a6ab9.firebaseapp.com",
  projectId: "react-ecsite-app-a6ab9",
  storageBucket: "react-ecsite-app-a6ab9.appspot.com",
  messagingSenderId: "887897214885",
  appId: "1:887897214885:web:fa4889e6fdab0a8cf0624c",
  measurementId: "G-NCCCSEST4N",
};

// export const providerGoogle = new firebase.auth.GoogleAuthProvider();
// export const providerFacebook = new firebase.auth.FacebookAuthProvider();
// export const providerTwitter = new firebase.auth.TwitterAuthProvider();
// export const db = firebase.firestore(); //firestroeを使う場合
export const app = initializeApp(firebaseConfig); //firebaseとの認証

// export default firebase;
