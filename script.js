// Animation des éléments au scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature, .use-case, .step, .tech-card, .revenue-source, .advantage');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialiser les animations
window.addEventListener('DOMContentLoaded', () => {
    // Ajouter des styles initiaux pour l'animation
    const elementsToAnimate = document.querySelectorAll('.feature, .use-case, .step, .tech-card, .revenue-source, .advantage');
    elementsToAnimate.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Déclencher l'animation au chargement initial
    animateOnScroll();
    
    // Déclencher l'animation au scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simulation d'envoi de données (à remplacer par une véritable API)
        console.log('Formulaire soumis avec les données:', { name, email, subject, message });
        
        // Afficher un message de confirmation
        const formContainer = contactForm.parentElement;
        formContainer.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 20px;"></i>
                <h3>Message envoyé avec succès!</h3>
                <p>Merci de nous avoir contactés, ${name}. Nous vous répondrons sous peu.</p>
                <button class="btn btn-primary" onclick="location.reload()" style="margin-top: 20px;">Retour</button>
            </div>
        `;
    });
}

// Compteurs animés pour les statistiques
const startCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // durée en ms
        const increment = target / (duration / 16); // 60 FPS
        let count = 0;
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.textContent = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCount();
    });
};

// Observer pour démarrer les compteurs quand ils sont visibles
const observeCounters = () => {
    const countersSection = document.querySelector('.growth-projection');
    if (!countersSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(countersSection);
};

// Initialiser l'observation des compteurs
window.addEventListener('DOMContentLoaded', observeCounters);

// Effet de parallaxe légère pour la section hero
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    
    if (heroSection && scrollPosition < heroSection.offsetHeight) {
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// Gestion de l'année actuelle dans le footer
const yearSpan = document.querySelector('.footer-bottom p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2023', currentYear);
} 