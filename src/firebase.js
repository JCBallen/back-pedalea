import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import "dotenv/config";

initializeApp({
    credential: applicationDefault(),
});

const db = getFirestore();

export default db;