const adminCredentials = { user: "rai", password: "admin" };


const loginButton = document.getElementById("loginButton");
const adminUser = document.getElementById("adminUser");
const adminPassword = document.getElementById("adminPassword");

if (localStorage.getItem("adminLoggedIn") === "true") {
  window.location.href = "index.html";
}

loginButton.addEventListener("click", () => {
  const user = adminUser.value.trim();
  const password = adminPassword.value.trim();
  if (user === adminCredentials.user && password === adminCredentials.password) {
    localStorage.setItem("adminLoggedIn", "true");
    localStorage.setItem("adminUser", user);
    window.location.href = "index.html";
  } else {
    alert("Credenciais inválidas.");
  }
});
