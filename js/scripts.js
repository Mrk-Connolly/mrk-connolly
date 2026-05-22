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

        languageFilterTitle: "Languages"
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

        languageFilterTitle: "Lenguajes"
    }
};

let currentLanguage = "en";

document
    .getElementById("language-toggle")
    .addEventListener("click", () => {

        currentLanguage =
            currentLanguage === "en"
                ? "es"
                : "en";

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

        const language =
            card.dataset.language;

        const roleMatch =
            activeRole === "all" ||
            role === activeRole;

        const languageMatch =
            activeLanguage === "all" ||
            language === activeLanguage;

        if (roleMatch && languageMatch) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }
    });
}