import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const loginBtn = document.getElementById("loginButton");
const emailInput = document.getElementById("adminUser");
const passwordInput = document.getElementById("adminPassword");
const errorMsg = document.getElementById("loginError");

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.hidden = false;
}

function clearError() {
  errorMsg.hidden = true;
}

onAuthStateChanged(auth, (user) => {
  if (user) window.location.href = "dashboard.html";
});

loginBtn.addEventListener("click", async () => {
  clearError();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    showError("Preencha e-mail e senha.");
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Entrando…";

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (err) {
    const messages = {
      "auth/invalid-credential": "E-mail ou senha incorretos.",
      "auth/user-not-found": "Usuário não encontrado.",
      "auth/wrong-password": "Senha incorreta.",
      "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.",
    };
    showError(messages[err.code] || "Erro ao entrar. Verifique as credenciais.");
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Entrar";
  }
});

// Allow submitting with Enter key
[emailInput, passwordInput].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") loginBtn.click();
  });
});
