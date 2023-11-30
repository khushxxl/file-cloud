// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6dfrcS_rlT2kFNVdi85ZmLsv6eG21D4c",
  authDomain: "filehoster-9c7ff.firebaseapp.com",
  projectId: "filehoster-9c7ff",
  storageBucket: "filehoster-9c7ff.appspot.com",
  messagingSenderId: "23594842061",
  appId: "1:23594842061:web:4a834428eca3e4cbfd7684",
  measurementId: "G-BFRHF19RSN",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage(app);

export { db, storage };
