// scripts/auth.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getFirestore,
  doc,
  setDoc
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

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

export async function register(email, password, avatar) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(cred.user);
  await setDoc(doc(db, "users", cred.user.uid), {
    email,
    avatar,
    createdAt: Date.now()
  });
}
