// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdLz-0r7YEalWJlYsAK_OAry2vuuOcf7Y",
  authDomain: "chyapp-8cd64.firebaseapp.com",
  projectId: "chyapp-8cd64",
  storageBucket: "chyapp-8cd64.appspot.com",
  messagingSenderId: "1099395440121",
  appId: "1:1099395440121:web:94bd79faf575817ab0f128",
  measurementId: "G-4R0J7YE7D0"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();

export default db;