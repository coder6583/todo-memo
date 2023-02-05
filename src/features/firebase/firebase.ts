import { getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjpEK72oGuOyL23SuwfwgzVzyQ1UW7xjI",
  authDomain: "todomemo-e1ec0.firebaseapp.com",
  projectId: "todomemo-e1ec0",
  storageBucket: "todomemo-e1ec0.appspot.com",
  messagingSenderId: "731546324833",
  appId: "1:731546324833:web:7d422dc5b889f6d31e3f20",
  measurementId: "G-NZHL2Q7644",
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps().at(0);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
