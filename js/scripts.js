/*
  JavaScript for the projects grid filters and pagination.
*/

const projects = Array.from({ length: 46 }, (_, index) => ({
  id: index + 1,
  title: `Project ${index + 1}`,
  language: ["Python", "JavaScript", "C++", "Java"][index % 4],
  technology: ["Docker", "MongoDB", "React", "SQL"][index % 4],
}));

const state = {
  activeLanguage: null,
  activeTech: null,
  currentPage: 1,
  itemsPerPage: 12,
};

const languageFilters = ["Python", "JavaScript", "C++", "Java"];
const techFilters = ["Docker", "MongoDB", "React", "SQL"];

const languageFiltersContainer = document.getElementById("languageFilters");
const techFiltersContainer = document.getElementById("techFilters");
const projectGrid = document.getElementById("projectGrid");
const paginationTop = document.getElementById("paginationTop");
const paginationBottom = document.getElementById("paginationBottom");
const projectPageSummary = document.getElementById("projectPageSummary");

function createFilterChip(label, group, value) {
  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = "filter-chip";
  chip.textContent = label;
  chip.setAttribute("aria-pressed", "false");
  chip.addEventListener("click", () => {
    if (group === "language") {
      state.activeLanguage = state.activeLanguage === value ? null : value;
    } else {
      state.activeTech = state.activeTech === value ? null : value;
    }
    state.currentPage = 1;
    updateFilterState();
    renderProjects();
  });
  chip.dataset.group = group;
  chip.dataset.value = value;
  return chip;
}

function updateFilterState() {
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    const group = chip.dataset.group;
    const value = chip.dataset.value;
    const isActive = (group === "language" && state.activeLanguage === value) ||
      (group === "technology" && state.activeTech === value);
    chip.setAttribute("aria-pressed", String(isActive));
  });
}

function getFilteredProjects() {
  return projects.filter((project) => {
    const matchesLanguage = state.activeLanguage ? project.language === state.activeLanguage : true;
    const matchesTech = state.activeTech ? project.technology === state.activeTech : true;
    return matchesLanguage && matchesTech;
  });
}

function renderProjects() {
  const filtered = getFilteredProjects();
  const pageCount = Math.max(1, Math.ceil(filtered.length / state.itemsPerPage));
  state.currentPage = Math.min(state.currentPage, pageCount);

  const start = (state.currentPage - 1) * state.itemsPerPage;
  const pageItems = filtered.slice(start, start + state.itemsPerPage);

  projectGrid.innerHTML = "";
  pageItems.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <div class="card">
        <div class="card__image">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>
          </svg>
        </div>
        <div class="card__text">
          <p class="card__title">${project.title}</p>
          <p class="card__description">A brief description appears here when hovering over the card.</p>
        </div>
      </div>
    `;
    projectGrid.appendChild(card);
  });

  projectPageSummary.textContent = `Showing ${pageItems.length} of ${filtered.length} projects`;
  renderPagination(pageCount);
}

function createPaginationButton(label, page, isCurrent = false, disabled = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "pagination-button";
  button.textContent = label;
  if (isCurrent) {
    button.setAttribute("aria-current", "true");
  }
  if (disabled) {
    button.disabled = true;
    button.setAttribute("aria-disabled", "true");
    button.style.cursor = "not-allowed";
    button.style.opacity = "0.65";
  }
  button.addEventListener("click", () => {
    if (disabled) return;
    state.currentPage = page;
    renderProjects();
  });
  return button;
}

function renderPagination(pageCount) {
  paginationTop.innerHTML = "";
  paginationBottom.innerHTML = "";

  if (pageCount <= 1) {
    return;
  }

  const prevPage = Math.max(1, state.currentPage - 1);
  const nextPage = Math.min(pageCount, state.currentPage + 1);

  const prevButtonTop = createPaginationButton("←", prevPage, false, state.currentPage === 1);
  const nextButtonTop = createPaginationButton("→", nextPage, false, state.currentPage === pageCount);
  const prevButtonBottom = createPaginationButton("←", prevPage, false, state.currentPage === 1);
  const nextButtonBottom = createPaginationButton("→", nextPage, false, state.currentPage === pageCount);

  paginationTop.appendChild(prevButtonTop);
  paginationBottom.appendChild(prevButtonBottom);

  for (let page = 1; page <= pageCount; page += 1) {
    const buttonTop = createPaginationButton(String(page), page, page === state.currentPage);
    const buttonBottom = createPaginationButton(String(page), page, page === state.currentPage);
    paginationTop.appendChild(buttonTop);
    paginationBottom.appendChild(buttonBottom);
  }

  paginationTop.appendChild(nextButtonTop);
  paginationBottom.appendChild(nextButtonBottom);
}

function initFilters() {
  languageFilters.forEach((lang) => {
    languageFiltersContainer.appendChild(createFilterChip(lang, "language", lang));
  });
  techFilters.forEach((tech) => {
    techFiltersContainer.appendChild(createFilterChip(tech, "technology", tech));
  });
  updateFilterState();
}

function initProjectsSection() {
  initFilters();
  renderProjects();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjectsSection);
} else {
  initProjectsSection();
}
