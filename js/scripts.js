/* =========================
   LANGUAGE TOGGLE
========================= */

const translations = {
    en: {
        about: "About",
        timeline: "Timeline",
        projects: "Projects",
        contact: "Contact",
        heroRole: "Backend Developer & Automation Engineer",
        intro: "Passionate developer focused on backend, automation and scalable web solutions.",
        heroInfo1: "Based in Belfast, Northern Ireland",
        heroInfo2: "Python, JavaScript, Java, Go, SQL",
        aboutTitle: "About Me",
        aboutText: "I am a passionate software developer with strong interest in backend development, scalable systems and modern web applications.",
        timelineTitle: "My Journey",
        timelineItem1Title: "Backend Services",
        timelineItem1Subtitle: "Automation & Scalable APIs",
        timelineItem1Text: "Building backend services, automation tools, and scalable web solutions.",
        timelineItem2Title: "Internships & Projects",
        timelineItem2Subtitle: "Python and JavaScript work",
        timelineItem2Text: "Focused on internships and personal projects using Python and JavaScript.",
        timelineItem3Title: "Data Tools",
        timelineItem3Subtitle: "APIs and integrations",
        timelineItem3Text: "Developed data-driven tools and API integrations for small teams.",
        timelineItem4Title: "Academic Delivery",
        timelineItem4Subtitle: "C/C++, SQL, and problem solving",
        timelineItem4Text: "Delivered academic projects using C/C++, SQL, and algorithmic problem solving.",
        timelineItem5Title: "Web Development Start",
        timelineItem5Subtitle: "Learning web fundamentals",
        timelineItem5Text: "Started building software projects and learning web development fundamentals.",
        projectsTitle: "My Projects",
        roleFilterTitle: "Category",
        languageFilterTitle: "Languages",
        roleFilterOptions: {
            all: "All",
            program: "Program",
            ecommerce: "Ecommerce",
            games: "Games",
            webpage: "Webpage",
            ai: "AI"
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
        },
        contactTitle: "Contact",
        contactText: "Feel free to reach out by email or LinkedIn. I am available for backend, automation, and web development work.",
        footerText: "© 2026 Marcos Connolly. Built with HTML, CSS, and JavaScript."
    },
    es: {
        about: "Sobre mí",
        timeline: "Recorrido",
        projects: "Proyectos",
        contact: "Contacto",
        heroRole: "Desarrollador backend y de automatización",
        intro: "Desarrollador apasionado especializado en backend, automatización y soluciones web escalables.",
        heroInfo1: "Con base en Belfast, Irlanda del Norte",
        heroInfo2: "Python, JavaScript, Java, Go, SQL",
        aboutTitle: "Sobre mí",
        aboutText: "Soy un desarrollador apasionado por el backend, los sistemas escalables y las aplicaciones web modernas.",
        timelineTitle: "Mi recorrido",
        timelineItem1Title: "Servicios backend",
        timelineItem1Subtitle: "Automatización y APIs escalables",
        timelineItem1Text: "Construyendo servicios backend, herramientas de automatización y soluciones web escalables.",
        timelineItem2Title: "Pasantías y proyectos",
        timelineItem2Subtitle: "Trabajo en Python y JavaScript",
        timelineItem2Text: "Enfocado en pasantías y proyectos personales usando Python y JavaScript.",
        timelineItem3Title: "Herramientas de datos",
        timelineItem3Subtitle: "APIs e integraciones",
        timelineItem3Text: "Desarrollé herramientas basadas en datos e integraciones API para equipos pequeños.",
        timelineItem4Title: "Entrega académica",
        timelineItem4Subtitle: "C/C++, SQL y resolución de problemas",
        timelineItem4Text: "Entregué proyectos académicos usando C/C++, SQL y resolución de problemas algorítmicos.",
        timelineItem5Title: "Inicio en desarrollo web",
        timelineItem5Subtitle: "Aprendiendo fundamentos web",
        timelineItem5Text: "Comencé a construir proyectos de software y a aprender los fundamentos del desarrollo web.",
        projectsTitle: "Mis proyectos",
        roleFilterTitle: "Categoría",
        languageFilterTitle: "Lenguajes",
        roleFilterOptions: {
            all: "Todos",
            program: "Programa",
            ecommerce: "Ecommerce",
            games: "Juegos",
            webpage: "Página web",
            ai: "AI"
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
        },
        contactTitle: "Contacto",
        contactText: "No dudes en contactarme por email o LinkedIn. Estoy disponible para trabajo de backend, automatización y desarrollo web.",
        footerText: "© 2026 Marcos Connolly. Creado con HTML, CSS y JavaScript."
    }
};

let currentLanguage = "en";

const languageToggle = document.getElementById("language-toggle");

if (languageToggle) {
    languageToggle.addEventListener("change", () => {
        currentLanguage = languageToggle.checked ? "es" : "en";
        document.documentElement.lang = currentLanguage;
        const t = translations[currentLanguage];

        document.querySelector(".nav-about").textContent = t.about;
        document.querySelector(".nav-timeline").textContent = t.timeline;
        document.querySelector(".nav-projects").textContent = t.projects;
        document.querySelector(".nav-contact").textContent = t.contact;
        document.querySelector(".hero-role").textContent = t.heroRole;
        document.querySelector(".intro-text").textContent = t.intro;

        const heroInfo = document.querySelectorAll(".hero-info");
        if (heroInfo.length >= 2) {
            heroInfo[0].innerHTML = `<span style="color:#8fc69d;">•</span> ${t.heroInfo1}`;
            heroInfo[1].innerHTML = `<span style="color:#8fc69d;">•</span> ${t.heroInfo2}`;
        }

        document.querySelector(".about-title").textContent = t.aboutTitle;
        document.querySelector(".about-text").textContent = t.aboutText;
        document.querySelector(".contact-title").textContent = t.contactTitle;
        document.querySelector(".timeline-title").textContent = t.timelineTitle;

        document.querySelector(".timeline-item:nth-child(1) .timeline-item-title").textContent = t.timelineItem1Title;
        document.querySelector(".timeline-item:nth-child(1) .timeline-item-subtitle").textContent = t.timelineItem1Subtitle;
        document.querySelector(".timeline-item:nth-child(1) p").textContent = t.timelineItem1Text;

        document.querySelector(".timeline-item:nth-child(2) .timeline-item-title").textContent = t.timelineItem2Title;
        document.querySelector(".timeline-item:nth-child(2) .timeline-item-subtitle").textContent = t.timelineItem2Subtitle;
        document.querySelector(".timeline-item:nth-child(2) p").textContent = t.timelineItem2Text;

        document.querySelector(".timeline-item:nth-child(3) .timeline-item-title").textContent = t.timelineItem3Title;
        document.querySelector(".timeline-item:nth-child(3) .timeline-item-subtitle").textContent = t.timelineItem3Subtitle;
        document.querySelector(".timeline-item:nth-child(3) p").textContent = t.timelineItem3Text;

        document.querySelector(".timeline-item:nth-child(4) .timeline-item-title").textContent = t.timelineItem4Title;
        document.querySelector(".timeline-item:nth-child(4) .timeline-item-subtitle").textContent = t.timelineItem4Subtitle;
        document.querySelector(".timeline-item:nth-child(4) p").textContent = t.timelineItem4Text;

        document.querySelector(".timeline-item:nth-child(5) .timeline-item-title").textContent = t.timelineItem5Title;
        document.querySelector(".timeline-item:nth-child(5) .timeline-item-subtitle").textContent = t.timelineItem5Subtitle;
        document.querySelector(".timeline-item:nth-child(5) p").textContent = t.timelineItem5Text;

        document.querySelector(".projects-title").textContent = t.projectsTitle;
        document.querySelector(".role-filter-title").textContent = t.roleFilterTitle;
        document.querySelector(".language-filter-title").textContent = t.languageFilterTitle;
        document.querySelector("#contact .about-description").textContent = t.contactText;
        document.querySelector("footer p").textContent = t.footerText;

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
}

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