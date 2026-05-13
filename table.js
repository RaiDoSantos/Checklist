import { formatDate, calculateStatus, buildStatusChip, escapeHtml } from "./utils.js";

function buildFrotaRow(item, index) {
  const { status, className, dueDate } = calculateStatus(item.dataTeste, item.aprovado);
  return `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(item.identificador)}</td>
      <td>${escapeHtml(item.placa)}</td>
      <td>${escapeHtml(item.idTecnologia)}</td>
      <td>${formatDate(item.dataTeste)}</td>
      <td>${dueDate}</td>
      <td><span class="status-chip ${className}">${status}</span></td>
      <td>${escapeHtml(item.teclado)}</td>
      <td>${escapeHtml(item.sirene)}</td>
      <td>${escapeHtml(item.deseng)}</td>
      <td>${escapeHtml(item.trava)}</td>
      <td>${escapeHtml(item.sensorBau)}</td>
      <td>${escapeHtml(item.portaCarona)}</td>
      <td>${escapeHtml(item.portaMotorista)}</td>
      <td>${escapeHtml(item.bloqueio)}</td>
      <td>${escapeHtml(item.panico)}</td>
      <td>${escapeHtml(item.violacao)}</td>
      <td>${escapeHtml(item.aprovado)}</td>
      <td>${escapeHtml(item.usuario)}</td>
      <td>${escapeHtml(item.motorista)}</td>
      <td>${escapeHtml(item.contato)}</td>
      <td>
        <div class="action-buttons">
          <button class="edit-btn" data-type="frota" data-index="${index}">Editar</button>
          <button class="delete-btn" data-type="frota" data-index="${index}">Excluir</button>
        </div>
      </td>
    </tr>
  `;
}

function buildCarretasRow(item, index) {
  const { status, className, dueDate } = calculateStatus(item.dataTeste, item.aprovado);
  return `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(item.placa)}</td>
      <td>${escapeHtml(item.carroceria)}</td>
      <td>${escapeHtml(String(item.venc))}</td>
      <td>${formatDate(item.dataTeste)}</td>
      <td><span class="status-chip ${className}">${status}</span></td>
      <td>${dueDate}</td>
      <td>${escapeHtml(item.travaBau)}</td>
      <td>${escapeHtml(item.sensorBau)}</td>
      <td>${escapeHtml(item.aprovado)}</td>
      <td>${escapeHtml(item.usuario)}</td>
      <td>${escapeHtml(item.observacoes)}</td>
      <td>
        <div class="action-buttons">
          <button class="edit-btn" data-type="carretas" data-index="${index}">Editar</button>
          <button class="delete-btn" data-type="carretas" data-index="${index}">Excluir</button>
        </div>
      </td>
    </tr>
  `;
}

function buildAgregadosRow(item, index) {
  const { status, className, dueDate } = calculateStatus(item.dataTeste, item.aprovado);
  return `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(item.identificador)}</td>
      <td>${escapeHtml(item.placa)}</td>
      <td>${escapeHtml(item.idTecnologia)}</td>
      <td>${formatDate(item.dataTeste)}</td>
      <td>${dueDate}</td>
      <td><span class="status-chip ${className}">${status}</span></td>
      <td>${escapeHtml(item.teclado)}</td>
      <td>${escapeHtml(item.sirene)}</td>
      <td>${escapeHtml(item.deseng)}</td>
      <td>${escapeHtml(item.trava)}</td>
      <td>${escapeHtml(item.sensorBau)}</td>
      <td>${escapeHtml(item.portaCarona)}</td>
      <td>${escapeHtml(item.portaMotorista)}</td>
      <td>${escapeHtml(item.bloqueio)}</td>
      <td>${escapeHtml(item.panico)}</td>
      <td>${escapeHtml(item.violacao)}</td>
      <td>${escapeHtml(item.aprovado)}</td>
      <td>${escapeHtml(item.usuario)}</td>
      <td>${escapeHtml(item.motorista)}</td>
      <td>${escapeHtml(item.contato)}</td>
      <td>
        <div class="action-buttons">
          <button class="edit-btn" data-type="agregados" data-index="${index}">Editar</button>
          <button class="delete-btn" data-type="agregados" data-index="${index}">Excluir</button>
        </div>
      </td>
    </tr>
  `;
}

const rowBuilders = {
  frota: buildFrotaRow,
  carretas: buildCarretasRow,
  agregados: buildAgregadosRow,
};

export function renderTable(type, data, searchTerm, tbodyEl) {
  const term = searchTerm.toLowerCase();
  const builder = rowBuilders[type];

  const rows = data.reduce((acc, item, index) => {
    const searchable = Object.values(item).join(" ").toLowerCase();
    if (term && !searchable.includes(term)) return acc;
    return acc + builder(item, index);
  }, "");

  tbodyEl.innerHTML = rows || `<tr><td colspan="99" style="text-align:center;color:#777">Nenhum resultado encontrado.</td></tr>`;
}
