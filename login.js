import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const loginButton = document.getElementById("loginButton");
const adminUser = document.getElementById("adminUser");
const adminPassword = document.getElementById("adminPassword");

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "index.html";
  }
});

loginButton.addEventListener("click", async () => {
  const email = adminUser.value.trim();
  const password = adminPassword.value.trim();

  if (!email || !password) {
    alert("Preencha email e senha.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Erro de login:", error);
    alert("Credenciais inválidas ou usuário não encontrado.");
  }
});
