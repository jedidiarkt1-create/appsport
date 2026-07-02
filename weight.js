// Suivi de poids hebdomadaire
const WEIGHT_PROFILE_KEY = "mygym_weight_profile_v1";
const WEIGHT_ENTRIES_KEY = "mygym_weight_entries_v1";

function loadWeightProfile() {
  try {
    return JSON.parse(localStorage.getItem(WEIGHT_PROFILE_KEY));
  } catch {
    return null;
  }
}

function saveWeightProfile(profile) {
  localStorage.setItem(WEIGHT_PROFILE_KEY, JSON.stringify(profile));
}

function loadWeightEntries() {
  try {
    const entries = JSON.parse(localStorage.getItem(WEIGHT_ENTRIES_KEY)) || [];
    return entries.sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return [];
  }
}

function saveWeightEntries(entries) {
  localStorage.setItem(WEIGHT_ENTRIES_KEY, JSON.stringify(entries));
}

function formatDateFr(isoDate) {
  const [y, m, d] = isoDate.split("-");
  return `${d}/${m}/${y}`;
}

function renderWeightView() {
  const container = document.getElementById("view-poids");
  const profile = loadWeightProfile();
  container.innerHTML = "";

  if (!profile) {
    container.innerHTML = `
      <div class="weight-card">
        <h2>Configure ton suivi de poids</h2>
        <p class="weight-intro">Renseigne ton poids de départ et ton objectif pour suivre ta progression semaine après semaine.</p>
        <div class="weight-form-row">
          <label>Poids de départ (kg)
            <input id="wpStart" type="number" step="0.1" min="0" inputmode="decimal">
          </label>
          <label>Objectif (kg)
            <input id="wpGoal" type="number" step="0.1" min="0" inputmode="decimal">
          </label>
        </div>
        <button id="wpSaveProfile" class="primary-btn">Commencer le suivi</button>
      </div>
    `;
    document.getElementById("wpSaveProfile").addEventListener("click", () => {
      const start = parseFloat(document.getElementById("wpStart").value);
      const goal = parseFloat(document.getElementById("wpGoal").value);
      if (!start || !goal) {
        alert("Renseigne ton poids de départ et ton objectif.");
        return;
      }
      saveWeightProfile({ start, goal });
      const entries = loadWeightEntries();
      if (entries.length === 0) {
        const today = new Date().toISOString().slice(0, 10);
        saveWeightEntries([{ date: today, weight: start }]);
      }
      renderWeightView();
    });
    return;
  }

  const entries = loadWeightEntries();
  const current = entries.length ? entries[entries.length - 1].weight : profile.start;
  const lost = profile.start - current;
  const remaining = Math.max(current - profile.goal, 0);
  const totalToLose = profile.start - profile.goal;
  const percent = totalToLose > 0 ? Math.min(Math.max((lost / totalToLose) * 100, 0), 100) : 0;

  container.innerHTML = `
    <div class="weight-stats">
      <div class="weight-stat">
        <span class="weight-stat-value">${current.toFixed(1)} kg</span>
        <span class="weight-stat-label">Poids actuel</span>
      </div>
      <div class="weight-stat">
        <span class="weight-stat-value ${lost >= 0 ? "positive" : "negative"}">${lost > 0 ? "-" : lost < 0 ? "+" : ""}${Math.abs(lost).toFixed(1)} kg</span>
        <span class="weight-stat-label">Perdu</span>
      </div>
      <div class="weight-stat">
        <span class="weight-stat-value">${remaining.toFixed(1)} kg</span>
        <span class="weight-stat-label">Restant</span>
      </div>
    </div>

    <div class="progress-info">
      <span>${percent.toFixed(0)}% de l'objectif atteint</span>
      <span>Objectif : ${profile.goal} kg</span>
    </div>
    <div class="progress-track">
      <div class="progress-fill" style="width:${percent}%"></div>
    </div>

    <div id="weightChartWrap" class="weight-chart-wrap"></div>

    <div class="weight-card">
      <h3>Ajouter une pesée</h3>
      <div class="weight-form-row">
        <label>Date
          <input id="weInputDate" type="date" value="${new Date().toISOString().slice(0, 10)}">
        </label>
        <label>Poids (kg)
          <input id="weInputWeight" type="number" step="0.1" min="0" inputmode="decimal">
        </label>
      </div>
      <button id="weAddEntry" class="primary-btn">Ajouter</button>
    </div>

    <div class="weight-table-wrap">
      <table class="weight-table">
        <thead><tr><th>Date</th><th>Poids</th><th>Évolution</th><th></th></tr></thead>
        <tbody id="weightTableBody"></tbody>
      </table>
    </div>

    <button id="wpEditProfile" class="ghost-btn weight-edit-btn">Modifier poids de départ / objectif</button>
  `;

  renderWeightChart(document.getElementById("weightChartWrap"), profile, entries);
  renderWeightTable(entries);

  document.getElementById("weAddEntry").addEventListener("click", () => {
    const date = document.getElementById("weInputDate").value;
    const weight = parseFloat(document.getElementById("weInputWeight").value);
    if (!date || !weight) {
      alert("Renseigne une date et un poids valides.");
      return;
    }
    const current = loadWeightEntries().filter(e => e.date !== date);
    current.push({ date, weight });
    saveWeightEntries(current);
    renderWeightView();
  });

  document.getElementById("wpEditProfile").addEventListener("click", () => {
    localStorage.removeItem(WEIGHT_PROFILE_KEY);
    renderWeightView();
  });
}

function renderWeightTable(entries) {
  const body = document.getElementById("weightTableBody");
  const rows = [...entries].reverse();
  body.innerHTML = rows.map((entry, i) => {
    const prev = rows[i + 1];
    const delta = prev ? entry.weight - prev.weight : null;
    const deltaLabel = delta === null ? "—" : `${delta > 0 ? "+" : ""}${delta.toFixed(1)} kg`;
    const deltaClass = delta === null ? "" : (delta <= 0 ? "positive" : "negative");
    const originalIndex = entries.findIndex(e => e.date === entry.date);
    return `
      <tr>
        <td>${formatDateFr(entry.date)}</td>
        <td>${entry.weight.toFixed(1)} kg</td>
        <td class="${deltaClass}">${deltaLabel}</td>
        <td><button class="table-delete-btn" data-index="${originalIndex}" title="Supprimer">✕</button></td>
      </tr>
    `;
  }).join("");

  body.querySelectorAll(".table-delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index, 10);
      const entries = loadWeightEntries();
      entries.splice(index, 1);
      saveWeightEntries(entries);
      renderWeightView();
    });
  });
}

function renderWeightChart(wrap, profile, entries) {
  if (entries.length < 2) {
    wrap.innerHTML = `<p class="weight-chart-empty">Ajoute au moins deux pesées pour voir ta courbe de progression.</p>`;
    return;
  }

  const width = 600;
  const height = 220;
  const padX = 36;
  const padY = 24;

  const weights = entries.map(e => e.weight);
  const yMin = Math.min(profile.goal, ...weights) - 1;
  const yMax = Math.max(profile.start, ...weights) + 1;

  const dates = entries.map(e => new Date(e.date).getTime());
  const xMin = dates[0];
  const xMax = dates[dates.length - 1];
  const xSpan = Math.max(xMax - xMin, 1);

  const scaleX = t => padX + ((t - xMin) / xSpan) * (width - padX * 2);
  const scaleY = w => height - padY - ((w - yMin) / (yMax - yMin)) * (height - padY * 2);

  const points = entries.map(e => ({
    x: scaleX(new Date(e.date).getTime()),
    y: scaleY(e.weight),
    date: e.date,
    weight: e.weight
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const goalY = scaleY(profile.goal).toFixed(1);

  const circles = points.map(p => `
    <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="5" fill="var(--accent)" stroke="var(--card)" stroke-width="2">
      <title>${formatDateFr(p.date)} — ${p.weight.toFixed(1)} kg</title>
    </circle>
  `).join("");

  wrap.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" class="weight-chart" preserveAspectRatio="none">
      <line x1="${padX}" y1="${goalY}" x2="${width - padX}" y2="${goalY}" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="4 4"/>
      <text x="${width - padX}" y="${goalY - 6}" text-anchor="end" class="weight-chart-label">Objectif ${profile.goal} kg</text>
      <path d="${linePath}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${circles}
      <text x="${points[0].x.toFixed(1)}" y="${height - 4}" text-anchor="start" class="weight-chart-label">${formatDateFr(entries[0].date)}</text>
      <text x="${points[points.length - 1].x.toFixed(1)}" y="${height - 4}" text-anchor="end" class="weight-chart-label">${formatDateFr(entries[entries.length - 1].date)}</text>
    </svg>
  `;
}

document.querySelectorAll(".view-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".view-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const view = tab.dataset.view;
    document.querySelectorAll(".app-view").forEach(section => {
      section.hidden = section.dataset.view !== view;
    });
    if (view === "poids") renderWeightView();
  });
});
