/*!
* Start Bootstrap - Creative v7.0.7
*/

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {

        const navbarCollapsible = document.body.querySelector('#mainNav');

        if (!navbarCollapsible) {
            return;
        }

        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    navbarShrink();

    document.addEventListener('scroll', navbarShrink);

    const mainNav = document.body.querySelector('#mainNav');

    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    const navbarToggler = document.body.querySelector('.navbar-toggler');

    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );

    responsiveNavItems.map(function (responsiveNavItem) {

        responsiveNavItem.addEventListener('click', () => {

            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }

        });

    });

    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});


/* =========================
   LANGUAGE TOGGLE
========================= */

const translations = {

    en: {

        about: "About",
        services: "Services",
        portfolio: "Portfolio",
        projects: "Projects",
        contact: "Contact",

        discover: "Find Out More",

        timelineTitle: "Checkout my timeline!",

        timelineText:
            "Lets start with my wonderful time at Universidad Complutense de Madrid",

        getStarted: "Get Started!"
    },

    es: {

        about: "Sobre mí",
        services: "Servicios",
        portfolio: "Portfolio",
        projects: "Proyectos",
        contact: "Contacto",

        discover: "Descubrir más",

        timelineTitle: "¡Mira mi recorrido!",

        timelineText:
            "Empecemos con mi maravillosa etapa en la Universidad Complutense de Madrid",

        getStarted: "¡Comenzar!"
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

        document.documentElement.lang = currentLanguage;

        const t = translations[currentLanguage];

        // NAVBAR
        document.querySelector('a[href="#about"]').textContent =
            t.about;

        document.querySelector('a[href="#services"]').textContent =
            t.services;

        document.querySelector('a[href="#portfolio"]').textContent =
            t.portfolio;

        document.querySelector('a[href="#myproyects"]').textContent =
            t.projects;

        document.querySelector('a[href="#contact"]').textContent =
            t.contact;

        // HERO BUTTON
        document.getElementById("discover-btn").textContent =
            t.discover;

        // ABOUT SECTION
        document.getElementById("timeline-title").textContent =
            t.timelineTitle;

        document.getElementById("timeline-text").textContent =
            t.timelineText;

        document.getElementById("start-btn").textContent =
            t.getStarted;
    });