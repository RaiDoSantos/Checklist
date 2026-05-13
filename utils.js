const EXPIRATION_DAYS = 60;
const ALERT_THRESHOLD_DAYS = 7;

export function formatDate(dateString) {
  if (!dateString) return "";
  // Parse as local date to avoid UTC offset shifting the day
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("pt-BR");
}

export function addDays(dateString, days) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

export function calculateStatus(dataTeste, aprovado) {
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

  const dueDateStr = addDays(dataTeste, EXPIRATION_DAYS);
  const dueDate = formatDate(dueDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [y, m, d] = dueDateStr.split("-").map(Number);
  const venc = new Date(y, m - 1, d);
  const diffDays = Math.ceil((venc - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { dueDate, status: "VENCIDO", className: "status-danger" };
  }
  if (diffDays <= ALERT_THRESHOLD_DAYS) {
    return { dueDate, status: "ALERTA DE VENCIMENTO", className: "status-warning" };
  }
  return { dueDate, status: "EM DIA", className: "status-ok" };
}

export function buildStatusChip(dataTeste, aprovado) {
  const { status, className } = calculateStatus(dataTeste, aprovado);
  return `<span class="status-chip ${className}">${status}</span>`;
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
