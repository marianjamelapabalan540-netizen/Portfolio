const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';

    menuToggle.setAttribute("aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu");
});

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");

        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});


const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);

    themeIcon.className = isDark
        ? "fas fa-sun"
        : "fas fa-moon";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
}

let savedTheme = null;

try {
    savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {
    console.warn("Theme preference could not be saved.");
}

applyTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");

    applyTheme(isDark);

    try {
        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );
    } catch (error) {
        console.warn("Theme preference could not be saved.");
    }
});


const typingText = document.getElementById("typingText");

const words = [
    "IT Professional",
    "Web Developer",
    "Programmer",
    "Tech Enthusiast"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent = currentWord.substring(0, characterIndex);

    let delay = deleting ? 55 : 100;

    if (!deleting && characterIndex === currentWord.length) {
        deleting = true;
        delay = 1400;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

typeEffect();


const resumeButton = document.getElementById("resumeButton");

resumeButton.addEventListener("click", () => {

    const resumeContent = `
MARIAN JAMELA PABALAN
ASPIRING INFORMATION TECHNOLOGY PROFESSIONAL

ABOUT ME
I am an Information Technology student interested in web development,
programming, and computer systems. I am continuously improving my
technical knowledge and problem-solving skills.

EDUCATION
Bachelor of Science in Information Technology
College Student

TECHNICAL SKILLS
- HTML5
- CSS3
- JavaScript
- Basic Programming
- Basic Database Concepts
- Computer Hardware and Software
- Basic Troubleshooting
- Microsoft Word, Excel, and PowerPoint

PROJECTS
- Personal Portfolio Website
- Tic-Tac-Toe Game
- Word Scramble Game
- Smart Campus Management System (Proposed)

CAREER OBJECTIVE
To develop my technical skills, gain practical experience, and contribute
to useful and reliable technology solutions.

CONTACT INFORMATION
Email: your.email@example.com
Location: Philippines

Note: Update this resume with your actual education, skills,
completed projects, and contact information before using it.
`;

    const blob = new Blob(
        [resumeContent],
        { type: "text/plain;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");

    downloadLink.href = url;
    downloadLink.download = "Marian_Jamela_Pabalan_Resume.txt";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();

    URL.revokeObjectURL(url);
});



const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        formStatus.textContent = "Please complete all fields.";
        return;
    }


    const recipient = "your.email@example.com";

    const mailSubject = encodeURIComponent(subject);

    const mailBody = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n\n` +
        `Message:\n${message}`
    );

    formStatus.textContent =
        "Opening your email application...";

    window.location.href =
        `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;
});


const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});




const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navItems.forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") ===
                        `#${entry.target.id}`
                    );
                });
            }
        });
    },
    {
        rootMargin: "-25% 0px -60% 0px"
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});




const revealElements = document.querySelectorAll(
    ".about-card, .skill-card, .project-card, .timeline-item, " +
    ".contact-info, .contact-form, .section-heading"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});



document.getElementById("currentYear").textContent =
    new Date().getFullYear();