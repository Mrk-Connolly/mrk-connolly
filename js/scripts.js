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

        projectsTitle: "My Projects"
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

        projectsTitle: "Mis proyectos"
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
    });

/* =========================
   PROJECT FILTERS
========================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
            button.getAttribute("data-filter");

        projectCards.forEach(card => {

            if (
                filter === "all" ||
                card.dataset.category.includes(filter)
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";
            }
        });
    });
});