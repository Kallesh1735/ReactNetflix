import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6WODyZPseBqOz7XlPmxcUd_DkclNkqkw",
  authDomain: "netflix-clone-e120f.firebaseapp.com",
  projectId: "netflix-clone-e120f",
  storageBucket: "netflix-clone-e120f.firebasestorage.app",
  messagingSenderId: "1094909529695",
  appId: "1:1094909529695:web:e973bdf52cee051ce155ea",
  measurementId: "G-3FCJF4MSF3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      email,
      authProvider: "local"
    });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error) {
    console.log("Login error:", error);
    alert(error.message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Logout error:", error);
    alert(error.message);
  }
};

export { auth, db, login, signup, logout };
