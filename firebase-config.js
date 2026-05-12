import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCf_HbSMhLkISxVs_tYpwd-9yQVX1dGw0o",
  authDomain: "bdd-checklist.firebaseapp.com",
  projectId: "bdd-checklist",
  storageBucket: "bdd-checklist.firebasestorage.app",
  messagingSenderId: "981472161274",
  appId: "1:981472161274:web:931c35b8be30324f0fc843",
  measurementId: "G-K62P4FELKQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
