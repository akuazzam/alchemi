import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBBGfZyAieFj_V2_7-S6eGhwodRoqvXiBI",
  authDomain: "alchemi-ai.firebaseapp.com",
  projectId: "alchemi-ai",
  storageBucket: "alchemi-ai.appspot.com",
  messagingSenderId: "346110977609",
  appId: "1:346110977609:web:83e1973d1cf25ca649c198",
  measurementId: "G-BX6H49ZZ83"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

export { auth, db, googleProvider, microsoftProvider };
