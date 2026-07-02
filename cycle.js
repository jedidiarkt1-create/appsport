// Suivi du cycle menstruel (SOPK)
const CYCLE_DAYS_KEY = "mygym_cycle_days_v1";
const CYCLE_ABSENT_KEY = "mygym_cycle_absent_months_v1";

let currentCycleMonth = new Date().toISOString().slice(0, 7);

function loadCycleDays() {
  try {
    return (JSON.parse(localStorage.getItem(CYCLE_DAYS_KEY)) || []).sort();
  } catch {
    return [];
  }
}

function saveCycleDays(days) {
  localStorage.setItem(CYCLE_DAYS_KEY, JSON.stringify([...new Set(days)].sort()));
}

function loadAbsentMonths() {
  try {
    return JSON.parse(localStorage.getItem(CYCLE_ABSENT_KEY)) || [];
  } catch {
    return [];
  }
}

function saveAbsentMonths(months) {
  localStorage.setItem(CYCLE_ABSENT_KEY, JSON.stringify([...new Set(months)].sort()));
}

function toggleCycleDay(dateStr) {
  const days = loadCycleDays();
  const idx = days.indexOf(dateStr);
  if (idx >= 0) {
    days.splice(idx, 1);
  } else {
    days.push(dateStr);
    // un jour de règles annule le statut "mois sans règles" de ce mois
    const month = dateStr.slice(0, 7);
    const absentMonths = loadAbsentMonths().filter(m => m !== month);
    saveAbsentMonths(absentMonths);
  }
  saveCycleDays(days);
}

function toggleAbsentMonth(monthStr) {
  const absentMonths = loadAbsentMonths();
  if (absentMonths.includes(monthStr)) {
    saveAbsentMonths(absentMonths.filter(m => m !== monthStr));
  } else {
    const days = loadCycleDays().filter(d => !d.startsWith(monthStr));
    saveCycleDays(days);
    absentMonths.push(monthStr);
    saveAbsentMonths(absentMonths);
  }
}

function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

// Regroupe les jours marqués en blocs de jours consécutifs = cycles
function computeCycles(days) {
  if (!days.length) return [];
  const sorted = [...days].sort();
  const cycles = [];
  let blockStart = sorted[0];
  let prev = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    const d = sorted[i];
    if (daysBetween(prev, d) !== 1) {
      cycles.push({ start: blockStart, end: prev });
      blockStart = d;
    }
    prev = d;
  }
  cycles.push({ start: blockStart, end: prev });
  return cycles;
}

function computeCycleLengths(cycles) {
  const lengths = [];
  for (let i = 1; i < cycles.length; i++) {
    lengths.push(daysBetween(cycles[i - 1].start, cycles[i].start));
  }
  return lengths;
}

function computeRegularity(lengths, absentMonths) {
  const recentAbsent = absentMonths.filter(m => {
    const monthsAgo = (new Date().getFullYear() - parseInt(m.slice(0, 4))) * 12 + (new Date().getMonth() + 1 - parseInt(m.slice(5, 7)));
    return monthsAgo >= 0 && monthsAgo <= 3;
  });

  if (lengths.length === 0) {
    return { label: "Pas assez de données", cls: "neutral", avg: null };
  }

  const recentLengths = lengths.slice(-6);
  const avg = recentLengths.reduce((a, b) => a + b, 0) / recentLengths.length;
  const range = Math.max(...recentLengths) - Math.min(...recentLengths);
  const outOfRange = recentLengths.some(l => l < 21 || l > 35);

  const irregular = outOfRange || range > 9 || recentAbsent.length > 0;
  return {
    label: irregular ? "Irrégulier" : "Régulier",
    cls: irregular ? "irregular" : "regular",
    avg: Math.round(avg)
  };
}

function formatMonthLabel(monthStr) {
  const [y, m] = monthStr.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

function shiftCycleMonth(delta) {
  const [y, m] = currentCycleMonth.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  currentCycleMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function buildMonthGrid(monthStr) {
  const [y, m] = monthStr.split("-").map(Number);
  const firstOfMonth = new Date(y, m - 1, 1);
  const startWeekday = (firstOfMonth.getDay() + 6) % 7; // lundi = 0
  const daysInMonth = new Date(y, m, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(`${monthStr}-${String(d).padStart(2, "0")}`);
  }
  return cells;
}

function renderCycleView() {
  const container = document.getElementById("view-cycle");
  const markedDays = new Set(loadCycleDays());
  const absentMonths = loadAbsentMonths();
  const isAbsentMonth = absentMonths.includes(currentCycleMonth);

  const cycles = computeCycles(loadCycleDays());
  const lengths = computeCycleLengths(cycles);
  const regularity = computeRegularity(lengths, absentMonths);

  const cells = buildMonthGrid(currentCycleMonth);
  const todayStr = new Date().toISOString().slice(0, 10);

  container.innerHTML = `
    <div class="weight-stats">
      <div class="weight-stat">
        <span class="weight-stat-value">${regularity.avg ? regularity.avg + " j" : "—"}</span>
        <span class="weight-stat-label">Durée moyenne du cycle</span>
      </div>
      <div class="weight-stat">
        <span class="regularity-badge ${regularity.cls}">${regularity.label}</span>
        <span class="weight-stat-label">Régularité</span>
      </div>
      <div class="weight-stat">
        <span class="weight-stat-value">${cycles.length}</span>
        <span class="weight-stat-label">Cycles enregistrés</span>
      </div>
    </div>

    <div class="weight-card">
      <div class="meal-date-nav">
        <button id="cyclePrevMonth" class="ghost-btn" title="Mois précédent">‹</button>
        <span class="meal-date-label">${formatMonthLabel(currentCycleMonth)}</span>
        <button id="cycleNextMonth" class="ghost-btn" title="Mois suivant">›</button>
      </div>

      ${isAbsentMonth ? `<p class="cycle-absent-banner">Ce mois est marqué comme sans règles.</p>` : ""}

      <div class="cycle-grid">
        ${["L", "M", "M", "J", "V", "S", "D"].map(d => `<div class="cycle-grid-header">${d}</div>`).join("")}
        ${cells.map(date => {
          if (!date) return `<div class="cycle-day empty"></div>`;
          const day = parseInt(date.slice(8, 10), 10);
          const marked = markedDays.has(date);
          const isToday = date === todayStr;
          return `<button class="cycle-day ${marked ? "marked" : ""} ${isToday ? "today" : ""}" data-date="${date}">${day}</button>`;
        }).join("")}
      </div>

      <div class="cycle-legend">
        <span><span class="cycle-dot"></span> Jour de règles (touche pour marquer/démarquer)</span>
      </div>

      <button id="cycleToggleAbsent" class="ghost-btn weight-edit-btn">
        ${isAbsentMonth ? "Annuler : ce mois n'est plus \"sans règles\"" : "Marquer ce mois comme sans règles"}
      </button>
    </div>

    <div class="weight-table-wrap">
      <table class="weight-table">
        <thead><tr><th>Début de cycle</th><th>Durée des règles</th><th>Longueur du cycle</th></tr></thead>
        <tbody>
          ${cycles.length === 0 ? `<tr><td colspan="3" class="meal-empty">Aucune donnée pour l'instant.</td></tr>` : [...cycles].reverse().map((c, i) => {
            const reversedIndex = cycles.length - 1 - i;
            const bleedDays = daysBetween(c.start, c.end) + 1;
            const length = reversedIndex > 0 ? daysBetween(cycles[reversedIndex - 1].start, c.start) : null;
            return `<tr>
              <td>${formatDateFr(c.start)}</td>
              <td>${bleedDays} j</td>
              <td>${length !== null ? length + " j" : "—"}</td>
            </tr>`;
          }).join("")}
          ${absentMonths.slice(-6).map(m => `<tr><td colspan="3" class="cycle-absent-row">Aucune règle — ${formatMonthLabel(m)}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;

  document.getElementById("cyclePrevMonth").addEventListener("click", () => { shiftCycleMonth(-1); renderCycleView(); });
  document.getElementById("cycleNextMonth").addEventListener("click", () => { shiftCycleMonth(1); renderCycleView(); });

  container.querySelectorAll(".cycle-day:not(.empty)").forEach(cell => {
    cell.addEventListener("click", () => {
      toggleCycleDay(cell.dataset.date);
      renderCycleView();
    });
  });

  document.getElementById("cycleToggleAbsent").addEventListener("click", () => {
    if (!isAbsentMonth && markedDays.size && [...markedDays].some(d => d.startsWith(currentCycleMonth))) {
      if (!confirm("Des jours de règles sont déjà marqués ce mois-ci. Les effacer et marquer ce mois comme sans règles ?")) return;
    }
    toggleAbsentMonth(currentCycleMonth);
    renderCycleView();
  });
}

VIEW_RENDERERS.cycle = renderCycleView;
