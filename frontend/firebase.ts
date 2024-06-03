
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDpE05vbDmcCkfxfmwWYTf9CAenrsxvU9s",
  authDomain: "movieconnect-f7cbd.firebaseapp.com",
  projectId: "movieconnect-f7cbd",
  storageBucket: "movieconnect-f7cbd.appspot.com",
  messagingSenderId: "619406393571",
  appId: "1:619406393571:web:cabdcb1698dfe15fbe05d6",
  measurementId: "G-MV6EJSJTS8"
};

// Initialize Firebase
export const db = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(db);
export const auth = getAuth(db)
export const provider = new GoogleAuthProvider()