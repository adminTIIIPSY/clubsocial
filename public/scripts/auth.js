// scripts/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAAJfscsLm4TdBzbYZ5dYa1BWZwpSPcVf8",
  authDomain: "terpzyverseclubsocial.firebaseapp.com",
  projectId: "terpzyverseclubsocial",
  storageBucket: "terpzyverseclubsocial.firebasestorage.app",
  messagingSenderId: "125077088870",
  appId: "1:125077088870:web:91195a40d290c6bff09ba7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Register function
export async function register(email, password, avatar) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCred.user, { displayName: "Player", photoURL: `avatars/${avatar}` });
  await sendEmailVerification(userCred.user);
  await setDoc(doc(db, "users", userCred.user.uid), {
    email,
    avatar,
    uid: userCred.user.uid,
    createdAt: new Date()
  });
}

// Login function
export async function login(email, password) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}
