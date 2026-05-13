import { fieldLabels, templates } from "./data.js";
import { escapeHtml } from "./utils.js";

const modal = document.getElementById("editModal");
const modalTitle = document.getElementById("modalTitle");
const editFields = document.getElementById("editFields");
const cancelBtn = document.getElementById("cancelEdit");

let activeEdit = null;
let onConfirmCallback = null;

cancelBtn.addEventListener("click", close);
modal.addEventListener("click", (e) => {
  if (e.target === modal) close();
});

function close() {
  modal.classList.add("hidden");
  activeEdit = null;
  onConfirmCallback = null;
}

function buildFields(item) {
  editFields.innerHTML = "";
  const fragment = document.createDocumentFragment();

  Object.entries(item).forEach(([key, value]) => {
    const label = fieldLabels[key] || key;
    const wrapper = document.createElement("div");

    if (key === "observacoes") {
      wrapper.innerHTML = `
        <label for="edit_${key}">${escapeHtml(label)}</label>
        <textarea id="edit_${key}" name="${key}" rows="3">${escapeHtml(value)}</textarea>
      `;
    } else {
      const type = key === "dataTeste" ? "date" : "text";
      wrapper.innerHTML = `
        <label for="edit_${key}">${escapeHtml(label)}</label>
        <input id="edit_${key}" name="${key}" type="${type}" value="${escapeHtml(value)}" />
      `;
    }

    fragment.appendChild(wrapper);
  });

  editFields.appendChild(fragment);
}

export function openModal(type, index, datasets, onConfirm) {
  const dataset = datasets[type];
  const isNew = index === null;
  const item = isNew ? { ...templates[type] } : { ...dataset[index] };

  activeEdit = { type, index };
  onConfirmCallback = onConfirm;

  buildFields(item);
  modalTitle.textContent = isNew ? "Novo registro" : "Editar registro";
  modal.classList.remove("hidden");
}

document.getElementById("editForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!activeEdit || !onConfirmCallback) return;

  const formData = new FormData(e.target);
  const updated = Object.fromEntries(formData.entries());

  onConfirmCallback(activeEdit, updated);
  close();
});
