// ============= PARTICLES EFFECT =============
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw(ctx, isDarkMode) {
        ctx.fillStyle = isDarkMode 
            ? `rgba(0, 217, 255, ${this.opacity})` 
            : `rgba(0, 132, 217, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isDarkMode = !document.documentElement.classList.contains('light-mode');

        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx, isDarkMode);
        });

        // Draw connections between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = isDarkMode
                        ? `rgba(0, 217, 255, ${0.1 * (1 - distance / 150)})`
                        : `rgba(0, 132, 217, ${0.1 * (1 - distance / 150)})`;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============= DARK/LIGHT MODE TOGGLE =============
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        html.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('light-mode');
        const theme = html.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
}

// ============= TYPING EFFECT =============
const roles = [
    "AI Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Generative AI Enthusiast",
    "Ex-CUO NCC"
];

let roleIndex = 0;
let charIndex = 0;

function typeEffect() {
    const typing = document.getElementById("typing");

    if (charIndex < roles[roleIndex].length) {
        typing.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {
    const typing = document.getElementById("typing");

    if (typing.textContent.length > 0) {
        typing.textContent = typing.textContent.slice(0, -1);
        setTimeout(eraseEffect, 50);
    } else {
        roleIndex++;
        if (roleIndex >= roles.length) {
            roleIndex = 0;
        }
        charIndex = 0;
        setTimeout(typeEffect, 500);
    }
}

typeEffect();

// ============= MENU TOGGLE =============
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

// ============= PROGRESS BAR =============
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    document.getElementById("progress-bar").style.width = scrollPercent + "%";
});

// ============= COUNTER ANIMATION =============
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
    const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 50;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCounter, 30);
        } else {
            counter.innerText = target;
        }
    };

    updateCounter();
});

// ============= SCROLL ANIMATIONS WITH INTERSECTION OBSERVER =============
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all cards and animated elements
document.querySelectorAll(
    '.stat-card, .project-card, .cert-card, .timeline-item, .internship-card, .contact-card, .hero-card'
).forEach(element => {
    observer.observe(element);
});

// ============= SMOOTH SCROLL ON NAV LINKS =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// ============= INIT FUNCTIONS =============
initParticles();
initThemeToggle();