import firebase from "firebase/app";
import  "firebase/auth";

export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyBTg-IoIWp-0H_NHO01QdUMjzL3k7ywqdU",
    authDomain: "interchat-ff233.firebaseapp.com",
    projectId: "interchat-ff233",
    storageBucket: "interchat-ff233.appspot.com",
    messagingSenderId: "1035028849890",
    appId: "1:1035028849890:web:08d65b80f5e9fe77e4eabb"
  }).auth();