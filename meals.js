// Suivi de repas et calories quotidiennes
const MEALS_KEY = "mygym_meals_v1";
const CALORIE_GOAL_KEY = "mygym_calorie_goal_v1";

let currentMealDate = new Date().toISOString().slice(0, 10);

function loadMeals() {
  try {
    return JSON.parse(localStorage.getItem(MEALS_KEY)) || {};
  } catch {
    return {};
  }
}

function saveMeals(meals) {
  localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
}

function loadCalorieGoal() {
  const raw = localStorage.getItem(CALORIE_GOAL_KEY);
  return raw ? parseInt(raw, 10) : null;
}

function saveCalorieGoal(value) {
  localStorage.setItem(CALORIE_GOAL_KEY, String(value));
}

function addMeal(dateStr, name, calories) {
  const meals = loadMeals();
  if (!meals[dateStr]) meals[dateStr] = [];
  meals[dateStr].push({ id: Date.now() + Math.random(), name, calories });
  saveMeals(meals);
}

function deleteMeal(dateStr, id) {
  const meals = loadMeals();
  meals[dateStr] = (meals[dateStr] || []).filter(m => m.id !== id);
  saveMeals(meals);
}

function shiftMealDate(days) {
  const d = new Date(currentMealDate);
  d.setDate(d.getDate() + days);
  currentMealDate = d.toISOString().slice(0, 10);
}

function formatMealDateLabel(dateStr) {
  const today = new Date().toISOString().slice(0, 10);
  if (dateStr === today) return "Aujourd'hui";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

function renderMealsView() {
  const container = document.getElementById("view-repas");
  const meals = loadMeals()[currentMealDate] || [];
  const total = meals.reduce((sum, m) => sum + m.calories, 0);
  const goal = loadCalorieGoal();
  const percent = goal ? Math.min((total / goal) * 100, 100) : 0;

  container.innerHTML = `
    <div class="meal-date-nav">
      <button id="mealPrevDay" class="ghost-btn" title="Jour précédent">‹</button>
      <span class="meal-date-label">${formatMealDateLabel(currentMealDate)}</span>
      <button id="mealNextDay" class="ghost-btn" title="Jour suivant">›</button>
    </div>

    <div class="weight-card">
      ${goal ? `
        <div class="progress-info">
          <span>${total} / ${goal} kcal</span>
          <span>${percent.toFixed(0)}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${percent}%"></div>
        </div>
        <button id="mealEditGoal" class="ghost-btn weight-edit-btn">Modifier l'objectif calorique</button>
      ` : `
        <h3>Objectif calorique quotidien (optionnel)</h3>
        <div class="weight-form-row">
          <label>Calories / jour
            <input id="mealGoalInput" type="number" min="0" inputmode="numeric" placeholder="ex: 1600">
          </label>
        </div>
        <button id="mealSaveGoal" class="primary-btn">Enregistrer l'objectif</button>
      `}
    </div>

    <div class="weight-card">
      <h3>Ajout rapide</h3>
      <div class="food-chips">
        ${FOODS.map(f => `<button class="food-chip" data-name="${f.name}" data-calories="${f.calories}">${f.name} · ${f.calories} kcal</button>`).join("")}
      </div>
    </div>

    <div class="weight-card">
      <h3>Ajouter un repas</h3>
      <div class="weight-form-row">
        <label>Nom
          <input id="mealNameInput" type="text" placeholder="ex: Sandwich thon">
        </label>
        <label>Calories (kcal)
          <input id="mealCaloriesInput" type="number" min="0" inputmode="numeric">
        </label>
      </div>
      <button id="mealAddBtn" class="primary-btn">Ajouter</button>
    </div>

    <div class="weight-table-wrap">
      <table class="weight-table">
        <thead><tr><th>Repas</th><th>Calories</th><th></th></tr></thead>
        <tbody id="mealsTableBody">
          ${meals.length === 0 ? `<tr><td colspan="3" class="meal-empty">Aucun repas enregistré pour ce jour.</td></tr>` : meals.map(m => `
            <tr>
              <td>${m.name}</td>
              <td>${m.calories} kcal</td>
              <td><button class="table-delete-btn" data-id="${m.id}" title="Supprimer">✕</button></td>
            </tr>
          `).join("")}
        </tbody>
        ${meals.length > 0 ? `<tfoot><tr><td><strong>Total</strong></td><td colspan="2"><strong>${total} kcal</strong></td></tr></tfoot>` : ""}
      </table>
    </div>
  `;

  document.getElementById("mealPrevDay").addEventListener("click", () => { shiftMealDate(-1); renderMealsView(); });
  document.getElementById("mealNextDay").addEventListener("click", () => { shiftMealDate(1); renderMealsView(); });

  const goalForm = document.getElementById("mealSaveGoal");
  if (goalForm) {
    goalForm.addEventListener("click", () => {
      const value = parseInt(document.getElementById("mealGoalInput").value, 10);
      if (!value) { alert("Renseigne un objectif calorique valide."); return; }
      saveCalorieGoal(value);
      renderMealsView();
    });
  }
  const editGoalBtn = document.getElementById("mealEditGoal");
  if (editGoalBtn) {
    editGoalBtn.addEventListener("click", () => {
      localStorage.removeItem(CALORIE_GOAL_KEY);
      renderMealsView();
    });
  }

  document.querySelectorAll(".food-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      addMeal(currentMealDate, chip.dataset.name, parseInt(chip.dataset.calories, 10));
      renderMealsView();
    });
  });

  document.getElementById("mealAddBtn").addEventListener("click", () => {
    const name = document.getElementById("mealNameInput").value.trim();
    const calories = parseInt(document.getElementById("mealCaloriesInput").value, 10);
    if (!name || !calories) { alert("Renseigne un nom et des calories valides."); return; }
    addMeal(currentMealDate, name, calories);
    renderMealsView();
  });

  document.querySelectorAll("#mealsTableBody .table-delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      deleteMeal(currentMealDate, parseFloat(btn.dataset.id));
      renderMealsView();
    });
  });
}
