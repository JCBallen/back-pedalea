import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBcP1EzAFTJVDUvR1wG7RIRbV57J9slttA",
  authDomain: "pedalea-a-la-mili.firebaseapp.com",
  projectId: "pedalea-a-la-mili",
  storageBucket: "pedalea-a-la-mili.appspot.com",
  messagingSenderId: "565393058521",
  appId: "1:565393058521:web:1f22daa481695c48bd2cc8"
};

const firestore = getFirestore();