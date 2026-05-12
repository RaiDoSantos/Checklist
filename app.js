// 1. Importar os módulos necessários do Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// 2. Configuração do seu Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCf_HbMhlkISxVs_tYpwd-9yQvX1dGw8o",
    authDomain: "bdd-checklist.firebaseapp.com",
    projectId: "bdd-checklist",
    storageBucket: "bdd-checklist.appspot.com",
    messagingSenderId: "981472161274",
    appId: "1:981472161274:web:8273782dfcd1a35f0fc8a43",
    measurementId: "G-18RERSM3L7"
};

// 3. Inicializar o Firebase e o Banco de Dados
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === FUNÇÕES PARA SALVAR E CARREGAR DADOS NO FIREBASE ===
async function saveDataToFirebase() {
    try {
        await setDoc(doc(db, "checklist", "data"), {
            frota: frotaData,
            carretas: carretasData,
            agregados: agregadosData
        });
        console.log("Dados salvos no Firebase");
    } catch (e) {
        console.error("Erro ao salvar:", e);
    }
}

async function loadDataFromFirebase() {
    try {
        const docSnap = await getDoc(doc(db, "checklist", "data"));
        if (docSnap.exists()) {
            const data = docSnap.data();
            frotaData = data.frota || frotaData;
            carretasData = data.carretas || carretasData;
            agregadosData = data.agregados || agregadosData;
        }
    } catch (e) {
        console.error("Erro ao carregar:", e);
    }
}

const adminCredentials = { user: "Rai", password: "R@iedu77" };
let loggedInUser = null;
let activeEdit = null;

let frotaData = [
  {
    identificador: "AGRE-TOCO",
    placa: "AKQ8670",
    idTecnologia: "467937",
    dataTeste: "2026-02-24",
    teclado: "OK",
    sirene: "OK",
    deseng: "OK",
    trava: "OK",
    sensorBau: "OK",
    portaCarona: "OK",
    portaMotorista: "OK",
    bloqueio: "OK",
    panico: "OK",
    violacao: "OK",
    aprovado: "APROVADO",
    usuario: "Rai",
    motorista: "Ailton José Bender",
    contato: "+55 55 9620-2981",
  },
  {
    identificador: "AGRE-TOCO",
    placa: "CQH964",
    idTecnologia: "577920",
    dataTeste: "2026-02-09",
    teclado: "OK",
    sirene: "OK",
    deseng: "OK",
    trava: "OK",
    sensorBau: "OK",
    portaCarona: "OK",
    portaMotorista: "OK",
    bloqueio: "OK",
    panico: "OK",
    violacao: "OK",
    aprovado: "REPROVADO",
    usuario: "Rai",
    motorista: "Pedro Lemos da Rosa Filho",
    contato: "+55 55 8462-2125",
  },
];

let carretasData = [
  {
    placa: "JXA0649",
    carroceria: "BAU",
    venc: 60,
    dataTeste: "2026-03-01",
    testeOk: "PENDENTE",
    travaBau: "",
    sensorBau: "",
    aprovado: "",
    usuario: "",
    observacoes: "",
  },
  {
    placa: "CRY7158",
    carroceria: "BAU",
    venc: 60,
    dataTeste: "2026-03-16",
    testeOk: "EM DIA",
    travaBau: "OK",
    sensorBau: "X",
    aprovado: "REPROVADO",
    usuario: "RAI",
    observacoes: "Sensor com falha",
  },
  {
    placa: "INR3547",
    carroceria: "BAU",
    venc: 60,
    dataTeste: "2026-03-16",
    testeOk: "EM DIA",
    travaBau: "OK",
    sensorBau: "OK",
    aprovado: "APROVADO",
    usuario: "RAI",
    observacoes: "",
  },
];

let agregadosData = [
  {
    identificador: "AGRE-TOCO",
    placa: "BQH964",
    idTecnologia: "577920",
    dataTeste: "2026-02-09",
    teclado: "OK",
    sirene: "OK",
    deseng: "OK",
    trava: "OK",
    sensorBau: "OK",
    portaCarona: "OK",
    portaMotorista: "OK",
    bloqueio: "OK",
    panico: "OK",
    violacao: "OK",
    aprovado: "APROVADO",
    usuario: "Rai",
    motorista: "João Carlos Carvalho Martins",
    contato: "+55 55 9927-3051",
  },
  {
    identificador: "AGRE-TOCO",
    placa: "INW898",
    idTecnologia: "563498",
    dataTeste: "2026-02-10",
    teclado: "OK",
    sirene: "OK",
    deseng: "OK",
    trava: "X",
    sensorBau: "OK",
    portaCarona: "OK",
    portaMotorista: "OK",
    bloqueio: "OK",
    panico: "OK",
    violacao: "X",
    aprovado: "REPROVADO",
    usuario: "Rai",
    motorista: "Claudio John",
    contato: "+55 54 9934-8994",
  },
];

const elements = {
  frotaBody: document.getElementById("frotaBody"),
  carretasBody: document.getElementById("carretasBody"),
  agregadosBody: document.getElementById("agregadosBody"),
  searchFrota: document.getElementById("searchFrota"),
  searchCarretas: document.getElementById("searchCarretas"),
  searchAgregados: document.getElementById("searchAgregados"),
  refreshFrota: document.getElementById("refreshFrota"),
  refreshCarretas: document.getElementById("refreshCarretas"),
  refreshAgregados: document.getElementById("refreshAgregados"),
  totalRealizados: document.getElementById("totalRealizados"),
  totalReprovados: document.getElementById("totalReprovados"),
  taxaReprovacao: document.getElementById("taxaReprovacao"),
  totalAlertas: document.getElementById("totalAlertas"),
  userInfo: document.getElementById("userInfo"),
  logoutBtn: document.getElementById("logoutBtn"),
  editModal: document.getElementById("editModal"),
  editFields: document.getElementById("editFields"),
  editForm: document.getElementById("editForm"),
  cancelEdit: document.getElementById("cancelEdit"),
};

const menuButtons = document.querySelectorAll(".menu-button");

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

function addDays(dateString, dias) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + dias);
  return date.toISOString().split("T")[0];
}

function calculateStatus(dataTeste, aprovado) {
  if ((aprovado || "").toUpperCase() === "REPROVADO") {
    return {
      dueDate: dataTeste ? formatDate(dataTeste) : "",
      status: "MANUTENÇÃO",
      className: "status-danger",
    };
  }
  if (!dataTeste) {
    return { dueDate: "", status: "PENDENTE", className: "status-danger" };
  }
  const dueDate = formatDate(addDays(dataTeste, 60));
  const hoje = new Date();
  const venc = new Date(addDays(dataTeste, 60));
  const diffDias = Math.ceil((venc - hoje) / (1000 * 60 * 60 * 24));
  if (diffDias < 0) {
    return { dueDate, status: "VENCIDO", className: "status-danger" };
  }
  if (diffDias <= 7) {
    return { dueDate, status: "ALERTA DE VENCIMENTO", className: "status-warning" };
  }
  return { dueDate, status: "EM DIA", className: "status-ok" };
}

function createStatusCell(dataTeste, aprovado) {
  const { status, className } = calculateStatus(dataTeste, aprovado);
  return `<span class="status-chip ${className}">${status}</span>`;
}

function renderFrota() {
  elements.frotaBody.innerHTML = "";
  const search = elements.searchFrota.value.toLowerCase();
  frotaData.forEach((item, index) => {
    const text = `${item.identificador} ${item.placa} ${item.usuario} ${item.motorista}`.toLowerCase();
    if (search && !text.includes(search)) return;
    const { status, className, dueDate } = calculateStatus(item.dataTeste, item.aprovado);
    const statusCell = `<span class="status-chip ${className}">${status}</span>`;
    elements.frotaBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.identificador}</td>
        <td>${item.placa}</td>
        <td>${item.idTecnologia}</td>
        <td>${formatDate(item.dataTeste)}</td>
        <td>${dueDate}</td>
        <td>${statusCell}</td>
        <td>${item.teclado}</td>
        <td>${item.sirene}</td>
        <td>${item.deseng}</td>
        <td>${item.trava}</td>
        <td>${item.sensorBau}</td>
        <td>${item.portaCarona}</td>
        <td>${item.portaMotorista}</td>
        <td>${item.bloqueio}</td>
        <td>${item.panico}</td>
        <td>${item.violacao}</td>
        <td>${item.aprovado}</td>
        <td>${item.usuario}</td>
        <td>${item.motorista}</td>
        <td>${item.contato}</td>
        <td><button class="edit-btn" onclick="openEditModal('frota', ${index})">Editar</button></td>
      </tr>
    `;
  });
}

function renderCarretas() {
  elements.carretasBody.innerHTML = "";
  const search = elements.searchCarretas.value.toLowerCase();
  carretasData.forEach((item, index) => {
    const text = `${item.placa} ${item.carroceria} ${item.usuario}`.toLowerCase();
    if (search && !text.includes(search)) return;
    const { status, className, dueDate } = calculateStatus(item.dataTeste, item.aprovado);
    const statusCell = `<span class="status-chip ${className}">${status}</span>`;
    elements.carretasBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.placa}</td>
        <td>${item.carroceria}</td>
        <td>${item.venc}</td>
        <td>${formatDate(item.dataTeste)}</td>
        <td>${statusCell}</td>
        <td>${dueDate}</td>
        <td>${item.travaBau}</td>
        <td>${item.sensorBau}</td>
        <td>${item.aprovado}</td>
        <td>${item.usuario}</td>
        <td>${item.observacoes}</td>
        <td><button class="edit-btn" onclick="openEditModal('carretas', ${index})">Editar</button></td>
      </tr>
    `;
  });
}

function renderAgregados() {
  elements.agregadosBody.innerHTML = "";
  const search = elements.searchAgregados.value.toLowerCase();
  agregadosData.forEach((item, index) => {
    const text = `${item.identificador} ${item.placa} ${item.usuario} ${item.motorista}`.toLowerCase();
    if (search && !text.includes(search)) return;
    const { status, className, dueDate } = calculateStatus(item.dataTeste, item.aprovado);
    const statusCell = `<span class="status-chip ${className}">${status}</span>`;
    elements.agregadosBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.identificador}</td>
        <td>${item.placa}</td>
        <td>${item.idTecnologia}</td>
        <td>${formatDate(item.dataTeste)}</td>
        <td>${dueDate}</td>
        <td>${statusCell}</td>
        <td>${item.teclado}</td>
        <td>${item.sirene}</td>
        <td>${item.deseng}</td>
        <td>${item.trava}</td>
        <td>${item.sensorBau}</td>
        <td>${item.portaCarona}</td>
        <td>${item.portaMotorista}</td>
        <td>${item.bloqueio}</td>
        <td>${item.panico}</td>
        <td>${item.violacao}</td>
        <td>${item.aprovado}</td>
        <td>${item.usuario}</td>
        <td>${item.motorista}</td>
        <td>${item.contato}</td>
        <td><button class="edit-btn" onclick="openEditModal('agregados', ${index})">Editar</button></td>
      </tr>
    `;
  });
}

function updateSummary() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();
  const todos = [...frotaData, ...carretasData, ...agregadosData];
  const registrosMes = todos.filter((item) => {
    if (!item.dataTeste) return false;
    const data = new Date(item.dataTeste);
    return data.getFullYear() === ano && data.getMonth() === mes;
  });
  const realizados = registrosMes.length;
  const reprovados = registrosMes.filter((item) => (item.aprovado || "").toUpperCase() === "REPROVADO").length;
  const alertas = todos.filter((item) => {
    const { status } = calculateStatus(item.dataTeste);
    return status === "ALERTA 7 DIAS" || status === "VENCIDO";
  }).length;
  elements.totalRealizados.textContent = realizados;
  elements.totalReprovados.textContent = reprovados;
  elements.taxaReprovacao.textContent = realizados ? `${Math.round((reprovados / realizados) * 100)}%` : "0%";
  elements.totalAlertas.textContent = alertas;
}

function openEditModal(type, index) {
  if (!loggedInUser) {
    alert("Faça login como administrador para editar.");
    return;
  }
  activeEdit = { type, index };
  const item = type === "frota" ? frotaData[index] : type === "carretas" ? carretasData[index] : agregadosData[index];
  const labels = {
    identificador: "Identificador",
    placa: "Placas",
    idTecnologia: "ID Tecnologia",
    dataTeste: "Data Teste",
    teclado: "Teclado",
    sirene: "Sirene",
    deseng: "Deseng.",
    trava: "Trava",
    sensorBau: "Sensor Baú",
    portaCarona: "Porta Carona",
    portaMotorista: "Porta Motorista",
    bloqueio: "Bloqueio",
    panico: "Pânico",
    violacao: "Violação",
    aprovado: "Aprovado/Reprovado",
    usuario: "Usuário",
    motorista: "Motorista",
    contato: "Contato",
    carroceria: "Carroceria",
    venc: "Venc.",
    testeOk: "Teste OK",
    travaBau: "Trava de Baú",
    observacoes: "Observações",
  };
  elements.editFields.innerHTML = "";
  Object.entries(item).forEach(([key, value]) => {
    const label = labels[key] || key;
    const inputType = key === "dataTeste" ? "date" : "text";
    const field = document.createElement("div");
    field.innerHTML = `
      <label for="edit_${key}">${label}</label>
      <input id="edit_${key}" name="${key}" type="${inputType}" value="${value || ""}" />
    `;
    elements.editFields.appendChild(field);
  });
  document.getElementById("modalTitle").textContent = "Editar registro";
  elements.editModal.classList.remove("hidden");
}

document.getElementById("editForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!activeEdit) return;
  const formData = new FormData(event.target);
  const updated = {};
  for (const [name, value] of formData.entries()) {
    updated[name] = value;
  }
  const dataSet = activeEdit.type === "frota" ? frotaData : activeEdit.type === "carretas" ? carretasData : agregadosData;
  if (activeEdit.index === null) {
    const template = getTemplate(activeEdit.type);
    dataSet.push({ ...template, ...updated, usuario: loggedInUser || template.usuario });
  } else {
    dataSet[activeEdit.index] = { ...dataSet[activeEdit.index], ...updated };
  }
  saveDataToFirebase();
  elements.editModal.classList.add("hidden");
  activeEdit = null;
  renderAll();
  updateSummary();
});

elements.cancelEdit.addEventListener("click", () => {
  elements.editModal.classList.add("hidden");
  activeEdit = null;
});

function getTemplate(type) {
  if (type === "frota") {
    return {
      identificador: "",
      placa: "",
      idTecnologia: "",
      dataTeste: "",
      teclado: "",
      sirene: "",
      deseng: "",
      trava: "",
      sensorBau: "",
      portaCarona: "",
      portaMotorista: "",
      bloqueio: "",
      panico: "",
      violacao: "",
      aprovado: "",
      usuario: loggedInUser || "",
      motorista: "",
      contato: "",
    };
  }
  if (type === "carretas") {
    return {
      placa: "",
      carroceria: "",
      venc: 60,
      dataTeste: "",
      testeOk: "",
      travaBau: "",
      sensorBau: "",
      aprovado: "",
      usuario: loggedInUser || "",
      observacoes: "",
    };
  }
  return {
    identificador: "",
    placa: "",
    idTecnologia: "",
    dataTeste: "",
    teclado: "",
    sirene: "",
    deseng: "",
    trava: "",
    sensorBau: "",
    portaCarona: "",
    portaMotorista: "",
    bloqueio: "",
    panico: "",
    violacao: "",
    aprovado: "",
    usuario: loggedInUser || "",
    motorista: "",
    contato: "",
  };
}

function openAddModal(type) {
  if (!loggedInUser) {
    alert("Faça login como administrador para editar.");
    return;
  }
  activeEdit = { type, index: null };
  const item = getTemplate(type);
  const labels = {
    identificador: "Identificador",
    placa: "Placas",
    idTecnologia: "ID Tecnologia",
    dataTeste: "Data Teste",
    teclado: "Teclado",
    sirene: "Sirene",
    deseng: "Deseng.",
    trava: "Trava",
    sensorBau: "Sensor Baú",
    portaCarona: "Porta Carona",
    portaMotorista: "Porta Motorista",
    bloqueio: "Bloqueio",
    panico: "Pânico",
    violacao: "Violação",
    aprovado: "Aprovado/Reprovado",
    usuario: "Usuário",
    motorista: "Motorista",
    contato: "Contato",
    carroceria: "Carroceria",
    venc: "Venc.",
    testeOk: "Teste OK",
    travaBau: "Trava de Baú",
    observacoes: "Observações",
  };
  elements.editFields.innerHTML = "";
  Object.entries(item).forEach(([key, value]) => {
    const label = labels[key] || key;
    const inputType = key === "dataTeste" ? "date" : "text";
    const field = document.createElement("div");
    field.innerHTML = `
      <label for="edit_${key}">${label}</label>
      <input id="edit_${key}" name="${key}" type="${inputType}" value="${value || ""}" />
    `;
    elements.editFields.appendChild(field);
  });
  document.getElementById("modalTitle").textContent = "Novo registro";
  elements.editModal.classList.remove("hidden");
}

window.openEditModal = openEditModal;
window.openAddModal = openAddModal;

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    menuButtons.forEach((btn) => btn.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
    updateSummary();
  });
});

document.getElementById("searchFrota").addEventListener("input", renderFrota);
document.getElementById("searchCarretas").addEventListener("input", renderCarretas);
document.getElementById("searchAgregados").addEventListener("input", renderAgregados);

document.getElementById("refreshFrota").addEventListener("click", renderFrota);
document.getElementById("refreshCarretas").addEventListener("click", renderCarretas);
document.getElementById("refreshAgregados").addEventListener("click", renderAgregados);

document.getElementById("addFrota").addEventListener("click", () => openAddModal("frota"));
document.getElementById("addCarretas").addEventListener("click", () => openAddModal("carretas"));
document.getElementById("addAgregados").addEventListener("click", () => openAddModal("agregados"));

function synchronizeUser() {
  if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }
  loggedInUser = localStorage.getItem("adminUser") || "admin";
  elements.userInfo.textContent = `Administrador: ${loggedInUser}`;
  elements.logoutBtn.hidden = false;
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("adminLoggedIn");
  localStorage.removeItem("adminUser");
  window.location.href = "login.html";
});

function renderAll() {
  renderFrota();
  renderCarretas();
  renderAgregados();
}

async function initApp() {
  synchronizeUser();
  await loadDataFromFirebase();
  renderAll();
  updateSummary();
}

initApp();
