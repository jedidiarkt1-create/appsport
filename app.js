// Logique de l'application MyGym — programme abdos & fessiers
const STORAGE_KEY = "mygym_progress_v1";
const WEEK_KEY = "mygym_week_v1";

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${weekNo}`;
}

function loadProgress() {
  const currentWeek = getISOWeek(new Date());
  const storedWeek = localStorage.getItem(WEEK_KEY);
  if (storedWeek !== currentWeek) {
    localStorage.setItem(WEEK_KEY, currentWeek);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
    return {};
  }
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

let progress = loadProgress();
let activeDay = PROGRAM.find(d => !d.rest)?.id || PROGRAM[0].id;

function exerciseKey(dayId, index) {
  return `${dayId}::${index}`;
}

function totalTrainableExercises() {
  return PROGRAM.filter(d => !d.rest).reduce((sum, d) => sum + d.exercises.length, 0);
}

function completedCount() {
  return Object.values(progress).filter(Boolean).length;
}

function renderTabs() {
  const tabs = document.getElementById("dayTabs");
  tabs.innerHTML = "";
  PROGRAM.forEach(day => {
    const btn = document.createElement("button");
    btn.className = "day-tab" + (day.id === activeDay ? " active" : "") + (day.rest ? " rest" : "");
    btn.textContent = day.day;
    btn.dataset.dayId = day.id;
    btn.addEventListener("click", () => {
      activeDay = day.id;
      render();
    });
    tabs.appendChild(btn);
  });
}

function renderDay() {
  const container = document.getElementById("dayContent");
  const day = PROGRAM.find(d => d.id === activeDay);
  container.innerHTML = "";

  const heading = document.createElement("div");
  heading.className = "day-heading";
  heading.innerHTML = `
    <h2>${day.title}</h2>
    <span class="tag tag-${day.type}">${labelForType(day.type)}</span>
  `;
  container.appendChild(heading);

  const list = document.createElement("div");
  list.className = "exercise-list";

  day.exercises.forEach((ex, index) => {
    const key = exerciseKey(day.id, index);
    const checked = !!progress[key];

    const card = document.createElement("label");
    card.className = "exercise-card" + (checked ? " done" : "");

    card.innerHTML = `
      <input type="checkbox" ${checked ? "checked" : ""} ${day.rest ? "disabled" : ""} data-key="${key}">
      <div class="exercise-body">
        <div class="exercise-name">${ex.name}</div>
        <div class="exercise-machine">${ex.machine}</div>
        <div class="exercise-meta">
          <span>${ex.sets} séries</span>
          <span>${ex.reps}</span>
          <span>repos ${ex.repos}</span>
        </div>
        ${ex.note ? `<div class="exercise-note">${ex.note}</div>` : ""}
      </div>
    `;

    if (!day.rest) {
      const input = card.querySelector("input");
      input.addEventListener("change", () => {
        progress[key] = input.checked;
        saveProgress(progress);
        render();
      });
    }

    list.appendChild(card);
  });

  container.appendChild(list);
}

function labelForType(type) {
  switch (type) {
    case "fessiers": return "Fessiers";
    case "abdos": return "Abdos";
    case "mixte": return "Abdos & Fessiers";
    case "repos": return "Repos";
    default: return "";
  }
}

function renderProgress() {
  const total = totalTrainableExercises();
  const done = completedCount();
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  document.getElementById("progressLabel").textContent = `${done} / ${total} exercices validés cette semaine`;
  document.getElementById("progressPercent").textContent = `${percent}%`;
  document.getElementById("progressFill").style.width = `${percent}%`;
}

function render() {
  renderTabs();
  renderDay();
  renderProgress();
}

document.getElementById("resetWeekBtn").addEventListener("click", () => {
  if (confirm("Réinitialiser la progression de la semaine ?")) {
    progress = {};
    saveProgress(progress);
    render();
  }
});

render();
