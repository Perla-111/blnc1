// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

//import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyArC11eVDH3cI9S7oAsAOYWKUzzluE8Byk",
  authDomain: "blnc1-17053.firebaseapp.com",
  databaseURL: "https://blnc1-17053-default-rtdb.firebaseio.com",
  projectId: "blnc1-17053",
  storageBucket: "blnc1-17053.appspot.com",
  messagingSenderId: "417261315256",
  appId: "1:417261315256:web:c21b743ccb93292834004d"
};

const fireDb = firebase.initializeApp(firebaseConfig);
//const app = initializeApp(firebaseConfig);

export default fireDb.database().ref();

// Initialize Firebase