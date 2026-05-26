/* =========================
   LANGUAGE TOGGLE
========================= */

const translations = {

    en: {

        about: "About",
        timeline: "Timeline",
        projects: "Projects",
        contact: "Contact",

        intro:
            "Passionate developer focused on backend, automation and scalable web solutions.",

        aboutTitle: "About Me",

        aboutText:
            "I am a passionate software developer with strong interest in backend development, scalable systems and modern web applications.",

        timelineTitle: "My Journey",

        projectsTitle: "My Projects",

        roleFilterTitle: "Category",

        languageFilterTitle: "Languages",

        roleFilterOptions: {
            all: "All",
            program: "Program",
            ecommerce: "Ecommerce",
            games: "Games",
            webpage: "Webpage"
        },

        languageFilterOptions: {
            all: "All",
            python: "Python",
            javascript: "JavaScript",
            java: "Java",
            minizinc: "MiniZinc",
            cpp: "C / C++",
            sql: "SQL",
            node: "Node",
            mongodb: "MongoDB",
            golang: "Golang"
        }
    },

    es: {

        about: "Sobre mí",
        timeline: "Recorrido",
        projects: "Proyectos",
        contact: "Contacto",

        intro:
            "Desarrollador apasionado especializado en backend, automatización y soluciones web escalables.",

        aboutTitle: "Sobre mí",

        aboutText:
            "Soy un desarrollador apasionado por el backend, los sistemas escalables y las aplicaciones web modernas.",

        timelineTitle: "Mi recorrido",

        projectsTitle: "Mis proyectos",

        roleFilterTitle: "Categoría",

        languageFilterTitle: "Lenguajes",

        roleFilterOptions: {
            all: "Todos",
            program: "Programa",
            ecommerce: "Ecommerce",
            games: "Juegos",
            webpage: "Página web"
        },

        languageFilterOptions: {
            all: "Todos",
            python: "Python",
            javascript: "JavaScript",
            java: "Java",
            minizinc: "MiniZinc",
            cpp: "C / C++",
            sql: "SQL",
            node: "Node",
            mongodb: "MongoDB",
            golang: "Golang"
        }
    }
};

let currentLanguage = "en";

const languageToggle = document.getElementById("language-toggle");

languageToggle.addEventListener("change", () => {

        currentLanguage = languageToggle.checked ? "es" : "en";

        document.querySelector(".switch-text").textContent =
            currentLanguage === "en" ? "EN" : "ES";

        document.documentElement.lang =
            currentLanguage;

        const t =
            translations[currentLanguage];

        document.querySelector(".nav-about").textContent =
            t.about;

        document.querySelector(".nav-timeline").textContent =
            t.timeline;

        document.querySelector(".nav-projects").textContent =
            t.projects;

        document.querySelector(".nav-contact").textContent =
            t.contact;

        document.querySelector(".intro-text").textContent =
            t.intro;

        document.querySelector(".about-title").textContent =
            t.aboutTitle;

        document.querySelector(".about-text").textContent =
            t.aboutText;

        document.querySelector(".timeline-title").textContent =
            t.timelineTitle;

        document.querySelector(".projects-title").textContent =
            t.projectsTitle;

        document.querySelector(".role-filter-title").textContent =
            t.roleFilterTitle;

        document.querySelector(".language-filter-title").textContent =
            t.languageFilterTitle;

        document.querySelectorAll(".filter-btn").forEach(button => {
            const type = button.dataset.filterType;
            const value = button.dataset.filter;

            if (type === "role") {
                button.textContent = t.roleFilterOptions[value];
            } else if (type === "language") {
                button.textContent = t.languageFilterOptions[value];
            }
        });
    });

/* =========================
   FILTER SYSTEM
========================= */

let activeRole = "all";
let activeLanguage = "all";

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filterType =
            button.dataset.filterType;

        const filterValue =
            button.dataset.filter;

        // REMOVE ACTIVE ONLY IN GROUP
        document
            .querySelectorAll(
                `.filter-btn[data-filter-type="${filterType}"]`
            )
            .forEach(btn =>
                btn.classList.remove("active")
            );

        button.classList.add("active");

        // SAVE FILTER
        if (filterType === "role") {

            activeRole = filterValue;

        } else {

            activeLanguage = filterValue;
        }

        filterProjects();
    });
});

function filterProjects() {

    projectCards.forEach(card => {

        const role =
            card.dataset.role;

        // support multiple languages per card (comma-separated)
        const languageRaw = card.dataset.languages || card.dataset.language || "";
        const languages = languageRaw
            .split(',')
            .map(l => l.trim().toLowerCase())
            .filter(Boolean);

        const roleMatch =
            activeRole === "all" ||
            role === activeRole;

        const languageMatch =
            activeLanguage === "all" ||
            languages.includes(activeLanguage);

        if (roleMatch && languageMatch) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}