import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { loadData, saveData } from "./firebase-service.js";
import { calculateStatus } from "./utils.js";
import { renderTable } from "./table.js";
import { openModal } from "./modal.js";
import { defaultFrota, defaultCarretas, defaultAgregados, templates } from "./data.js";

// ── State ────────────────────────────────────────────────────────────────────

const state = {
  frota: [...defaultFrota],
  carretas: [...defaultCarretas],
  agregados: [...defaultAgregados],
  user: null,
};

// ── DOM refs ─────────────────────────────────────────────────────────────────

const el = {
  frotaBody: document.getElementById("frotaBody"),
  carretasBody: document.getElementById("carretasBody"),
  agregadosBody: document.getElementById("agregadosBody"),
  searchFrota: document.getElementById("searchFrota"),
  searchCarretas: document.getElementById("searchCarretas"),
  searchAgregados: document.getElementById("searchAgregados"),
  totalRealizados: document.getElementById("totalRealizados"),
  totalReprovados: document.getElementById("totalReprovados"),
  taxaReprovacao: document.getElementById("taxaReprovacao"),
  totalAlertas: document.getElementById("totalAlertas"),
  userInfo: document.getElementById("userInfo"),
  logoutBtn: document.getElementById("logoutBtn"),
};

// ── Render ───────────────────────────────────────────────────────────────────

function renderAll() {
  renderTable("frota", state.frota, el.searchFrota.value, el.frotaBody);
  renderTable("carretas", state.carretas, el.searchCarretas.value, el.carretasBody);
  renderTable("agregados", state.agregados, el.searchAgregados.value, el.agregadosBody);
  updateSummary();
}

function updateSummary() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const all = [...state.frota, ...state.carretas, ...state.agregados];

  const thisMonth = all.filter((item) => {
    if (!item.dataTeste) return false;
    const [y, m] = item.dataTeste.split("-").map(Number);
    return y === year && m - 1 === month;
  });

  const realized = thisMonth.length;
  const failed = thisMonth.filter((item) => (item.aprovado || "").toUpperCase() === "REPROVADO").length;
  const alerts = all.filter((item) => {
    const { status } = calculateStatus(item.dataTeste, item.aprovado);
    return status === "ALERTA DE VENCIMENTO" || status === "VENCIDO";
  }).length;

  el.totalRealizados.textContent = realized;
  el.totalReprovados.textContent = failed;
  el.taxaReprovacao.textContent = realized ? `${Math.round((failed / realized) * 100)}%` : "0%";
  el.totalAlertas.textContent = alerts;
}

// ── Edit / Add ───────────────────────────────────────────────────────────────

function handleModalConfirm({ type, index }, updated) {
  const dataset = state[type];

  if (index === null) {
    dataset.push({ ...templates[type], ...updated, usuario: state.user });
  } else {
    dataset[index] = { ...dataset[index], ...updated };
  }

  persist();
  renderAll();
}

function persist() {
  saveData(state.frota, state.carretas, state.agregados).catch((err) =>
    console.error("Erro ao salvar no Firebase:", err)
  );
}

// ── Events ───────────────────────────────────────────────────────────────────

el.searchFrota.addEventListener("input", () =>
  renderTable("frota", state.frota, el.searchFrota.value, el.frotaBody)
);
el.searchCarretas.addEventListener("input", () =>
  renderTable("carretas", state.carretas, el.searchCarretas.value, el.carretasBody)
);
el.searchAgregados.addEventListener("input", () =>
  renderTable("agregados", state.agregados, el.searchAgregados.value, el.agregadosBody)
);

document.getElementById("refreshFrota").addEventListener("click", () =>
  renderTable("frota", state.frota, el.searchFrota.value, el.frotaBody)
);
document.getElementById("refreshCarretas").addEventListener("click", () =>
  renderTable("carretas", state.carretas, el.searchCarretas.value, el.carretasBody)
);
document.getElementById("refreshAgregados").addEventListener("click", () =>
  renderTable("agregados", state.agregados, el.searchAgregados.value, el.agregadosBody)
);

document.getElementById("addFrota").addEventListener("click", () =>
  openModal("frota", null, state, handleModalConfirm)
);
document.getElementById("addCarretas").addEventListener("click", () =>
  openModal("carretas", null, state, handleModalConfirm)
);
document.getElementById("addAgregados").addEventListener("click", () =>
  openModal("agregados", null, state, handleModalConfirm)
);

document.querySelectorAll(".menu-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".menu-button").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
    updateSummary();
  });
});

// Delegated click for edit buttons rendered inside tables
document.addEventListener("click", (e) => {
  const editBtn = e.target.closest(".edit-btn");
  if (editBtn) {
    const type = editBtn.dataset.type;
    const index = Number(editBtn.dataset.index);
    openModal(type, index, state, handleModalConfirm);
    return;
  }

  const deleteBtn = e.target.closest(".delete-btn");
  if (deleteBtn) {
    const type = deleteBtn.dataset.type;
    const index = Number(deleteBtn.dataset.index);
    const placa = state[type][index]?.placa || "este registro";
    if (!confirm(`Excluir "${placa}"? Esta ação não pode ser desfeita.`)) return;
    state[type].splice(index, 1);
    persist();
    renderAll();
  }
});

el.logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Erro ao sair:", err);
  }
  window.location.href = "login.html";
});

// ── Auth ─────────────────────────────────────────────────────────────────────

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  state.user = user.email || user.displayName || "admin";
  el.userInfo.textContent = `Administrador: ${state.user}`;

  try {
    const data = await loadData();
    if (data) {
      state.frota = data.frota || state.frota;
      state.carretas = data.carretas || state.carretas;
      state.agregados = data.agregados || state.agregados;
    }
  } catch (err) {
    console.error("Erro ao carregar dados:", err);
  }

  renderAll();
});
