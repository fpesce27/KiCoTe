import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyARWVO7QcH_XPim7nJ-b5_kjJbHhWXroqU",
  authDomain: "app-kiosko.firebaseapp.com",
  projectId: "app-kiosko",
  storageBucket: "app-kiosko.appspot.com",
  messagingSenderId: "898926968125",
  appId: "1:898926968125:web:2f8d8c351bb5d78ec4d954",
  measurementId: "G-WWC0CTXVXE"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();
const firestore = firebase.firestore;

export { db, auth, firestore };