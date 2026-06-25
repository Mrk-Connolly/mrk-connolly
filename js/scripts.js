/*
  JavaScript for the projects grid filters and pagination.
*/

const state = {
  activeLanguage: null,
  activeTech: null,
  activeDomain: null,
  currentPage: 1,
  itemsPerPage: 6,
};

const languageFilters = Array.from(new Set(projects.flatMap((project) => Array.isArray(project.language) ? project.language : [project.language]))).sort();
const techFilters = Array.from(new Set(projects.flatMap((project) => Array.isArray(project.technology) ? project.technology : [project.technology]))).sort();
const domainFilters = Array.from(new Set(projects.flatMap((project) => Array.isArray(project.domain) ? project.domain : [project.domain]).filter(Boolean))).sort();

const languageFiltersContainer = document.getElementById("languageFilters");
const techFiltersContainer = document.getElementById("techFilters");
const domainFiltersContainer = document.getElementById("domainFilters");
const projectGrid = document.getElementById("projectGrid");
const paginationTop = document.getElementById("paginationTop");
const paginationBottom = document.getElementById("paginationBottom");
const projectPageSummary = document.getElementById("projectPageSummary");
const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalCollaborators = document.getElementById("modalCollaborators");
const modalDescription = document.getElementById("modalDescription");
const modalLogo = document.getElementById("modalLogo");
const modalTags = document.getElementById("modalTags");
const carouselTrack = document.getElementById("carouselTrack");
const carouselLeft = document.getElementById("carouselLeft");
const carouselRight = document.getElementById("carouselRight");
const modalOverlay = document.querySelector(".modal__overlay");
const modalCloseButton = document.querySelector(".modal__close");

const modalState = {
  currentProject: null,
  currentImageIndex: 0,
  visibleImages: 3,
};

function createFilterChip(label, group, value) {
  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = "filter-chip";
  chip.textContent = label;
  chip.setAttribute("aria-pressed", "false");
  chip.addEventListener("click", () => {
    if (group === "language") {
      state.activeLanguage = state.activeLanguage === value ? null : value;
    } else if (group === "technology") {
      state.activeTech = state.activeTech === value ? null : value;
    } else {
      state.activeDomain = state.activeDomain === value ? null : value;
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
      (group === "technology" && state.activeTech === value) ||
      (group === "domain" && state.activeDomain === value);
    chip.setAttribute("aria-pressed", String(isActive));
  });
}

function parseMonthValue(value) {
  if (!value) {
    return NaN;
  }
  return Date.parse(value);
}

function parseFinishedMonth(project) {
  const parsed = parseMonthValue(project.endMonth || project.finishedMonth);
  return Number.isNaN(parsed) ? Infinity : parsed;
}

function getDurationLabel(project) {
  const start = project.startMonth ? project.startMonth : null;
  const end = project.endMonth || project.finishedMonth || null;
  if (!end) {
    return start || "";
  }
  if (!start) {
    return end;
  }

  const startValue = parseMonthValue(start);
  const endValue = parseMonthValue(end);
  if (Number.isNaN(startValue) || Number.isNaN(endValue)) {
    return `${start} - ${end}`;
  }

  if (startValue === endValue) {
    return end;
  }

  const [startMonth, startYear] = start.split(" ");
  const [endMonth, endYear] = end.split(" ");
  if (startYear === endYear) {
    return `${startMonth} - ${end}`;
  }
  return `${start} - ${end}`;
}

function getFilteredProjects() {
  return projects
    .filter((project) => {
      const projectLanguages = Array.isArray(project.language) ? project.language : [project.language].filter(Boolean);
      const projectTechnologies = Array.isArray(project.technology) ? project.technology : [project.technology].filter(Boolean);
      const projectDomains = Array.isArray(project.domain) ? project.domain : [project.domain].filter(Boolean);
      const matchesLanguage = state.activeLanguage ? projectLanguages.includes(state.activeLanguage) : true;
      const matchesTech = state.activeTech ? projectTechnologies.includes(state.activeTech) : true;
      const matchesDomain = state.activeDomain ? projectDomains.includes(state.activeDomain) : true;
      return matchesLanguage && matchesTech && matchesDomain;
    })
    .sort((a, b) => parseFinishedMonth(b) - parseFinishedMonth(a));
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
    const languageTags = (Array.isArray(project.language) ? project.language : [project.language]).filter(Boolean)
      .map((lang) => `<span class="card-tag card-tag--language">${lang}</span>`)
      .join("");
    const technologyTags = (Array.isArray(project.technology) ? project.technology : [project.technology]).filter(Boolean)
      .map((tech) => `<span class="card-tag card-tag--technology">${tech}</span>`)
      .join("");
    const domainTags = (Array.isArray(project.domain) ? project.domain : [project.domain]).filter(Boolean)
      .map((domain) => `<span class="card-tag card-tag--domain">${domain}</span>`)
      .join("");
    const cardImage = project.image ? `<img class="card__image-media" src="${project.image}" alt="${project.title}" />` : `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>
      </svg>`;
    const durationLabel = getDurationLabel(project);
    const finishedMonth = durationLabel ? `<span class="card__finished">${durationLabel}</span>` : "";

    card.innerHTML = `
      <div class="card">
        <div class="card__image">
          ${cardImage}
        </div>
        <div class="card__text">
          <div class="card__top">
            <p class="card__title">${project.title}</p>
            <p class="card__description">${project.description}</p>
          </div>
          <div class="card__footer">
            ${languageTags}
            ${technologyTags}
            ${domainTags}
          </div>
          ${finishedMonth}
        </div>
      </div>
    `;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open details for ${project.title}`);
    card.addEventListener("click", () => openProjectModal(project));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProjectModal(project);
      }
    });
    projectGrid.appendChild(card);
  });

  projectPageSummary.textContent = `Showing ${pageItems.length} of ${filtered.length} projects`;
  renderPagination(pageCount);
}

function openProjectModal(project) {
  modalState.currentProject = project;
  modalState.currentImageIndex = 0;
  modalTitle.textContent = project.title;
  modalLogo.src = project.logo || "assets/img/icon/MRKCSCircularLogoWhite.png";
  modalLogo.alt = project.logoAlt || `${project.title} logo`;
  modalDescription.textContent = project.details || project.description;

  const collaborators = Array.isArray(project.collaborators) ? project.collaborators : [];
  modalCollaborators.innerHTML = collaborators.length
    ? collaborators.map((name) => `<span>${name}</span>`).join("")
    : `<span>No collaborators listed</span>`;

  const tags = [
    ...(Array.isArray(project.language) ? project.language : [project.language]).filter(Boolean)
      .map((lang) => `<span class="card-tag card-tag--language">${lang}</span>`),
    ...(Array.isArray(project.technology) ? project.technology : [project.technology]).filter(Boolean)
      .map((tech) => `<span class="card-tag card-tag--technology">${tech}</span>`),
    ...(Array.isArray(project.domain) ? project.domain : [project.domain]).filter(Boolean)
      .map((domain) => `<span class="card-tag card-tag--domain">${domain}</span>`),
  ].join("");

  modalTags.innerHTML = tags || `<span>No tags available</span>`;
  renderCarousel();
  projectModal.classList.remove("hidden");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeProjectModal() {
  projectModal.classList.add("hidden");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function renderCarousel() {
  const project = modalState.currentProject;
  if (!project) {
    carouselTrack.innerHTML = "";
    return;
  }

  const images = Array.isArray(project.images) ? project.images.slice() : [];
  while (images.length < modalState.visibleImages) {
    images.push(null);
  }

  carouselTrack.innerHTML = images
    .map((src, index) => `
      <div class="carousel-slide">
        ${src ? `<img src="${src}" alt="${project.title} screenshot ${index + 1}" />` : `<div class="carousel-placeholder">No image available</div>`}
      </div>
    `)
    .join("");

  updateCarousel();
}

function updateCarousel() {
  const project = modalState.currentProject;
  if (!project) {
    return;
  }

  const images = Array.isArray(project.images) ? project.images.filter(Boolean) : [];
  const maxIndex = Math.max(0, Math.max(images.length, modalState.visibleImages) - modalState.visibleImages);
  const offset = modalState.currentImageIndex * (100 / modalState.visibleImages);
  carouselTrack.style.transform = `translateX(-${offset}%)`;
  carouselLeft.disabled = modalState.currentImageIndex <= 0;
  carouselRight.disabled = modalState.currentImageIndex >= maxIndex;
}

carouselLeft.addEventListener("click", () => {
  if (modalState.currentImageIndex > 0) {
    modalState.currentImageIndex -= 1;
    updateCarousel();
  }
});

carouselRight.addEventListener("click", () => {
  const project = modalState.currentProject;
  if (!project) {
    return;
  }
  const images = Array.isArray(project.images) ? project.images.filter(Boolean) : [];
  const maxIndex = Math.max(0, Math.max(images.length, modalState.visibleImages) - modalState.visibleImages);
  if (modalState.currentImageIndex < maxIndex) {
    modalState.currentImageIndex += 1;
    updateCarousel();
  }
});

modalCloseButton.addEventListener("click", closeProjectModal);
modalOverlay.addEventListener("click", closeProjectModal);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !projectModal.classList.contains("hidden")) {
    closeProjectModal();
  }
});

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
  domainFilters.forEach((domain) => {
    domainFiltersContainer.appendChild(createFilterChip(domain, "domain", domain));
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
