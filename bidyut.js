// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({behavior: 'smooth'});
            // Close mobile menu if open
            document.querySelector('nav ul').classList.remove('show');
        }
    });
});

// Dark mode functionality
const toggleButton = document.getElementById('darkModeToogle');
const lightIcon = document.querySelector('.light-icon');
const darkIcon = document.querySelector('.dark-icon');

// Check system preference
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Function to update theme
const updateTheme = (isDark) => {
    document.body.classList.toggle('dark-mode', isDark);
    lightIcon.style.display = isDark ? 'none' : 'inline';
    darkIcon.style.display = isDark ? 'inline' : 'none';
};

// Function to save user preference
const saveUserPreference = (isDark) => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Function to get user preference
const getUserPreference = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') return true;
    if (savedTheme === 'light') return false;
    return null; // No preference saved
};

// Initialize theme
const initTheme = () => {
    const userPreference = getUserPreference();
    if (userPreference !== null) {
        // Use user preference if set
        updateTheme(userPreference);
    } else {
        // Use system preference if no user preference
        updateTheme(systemPrefersDark.matches);
    }
};

// Listen for system preference changes
systemPrefersDark.addEventListener('change', (e) => {
    const userPreference = getUserPreference();
    if (userPreference === null) {
        // Only update if user hasn't set a preference
        updateTheme(e.matches);
    }
});

// Toggle button click handler
toggleButton.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    updateTheme(isDark);
    saveUserPreference(isDark);
});

// Initialize theme on load
window.addEventListener('load', initTheme);

// Mobile Navigation
const navMenu = document.querySelector('nav ul');
const hamburgerButton = document.createElement('button');
hamburgerButton.classList.add('hamburger');
hamburgerButton.setAttribute('aria-label', 'Toggle menu');
hamburgerButton.innerHTML = '☰';
document.querySelector('nav').appendChild(hamburgerButton);

hamburgerButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    hamburgerButton.setAttribute('aria-expanded', 
        navMenu.classList.contains('show'));
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        hamburgerButton.setAttribute('aria-expanded', 'false');
    }
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and projects
document.querySelectorAll('section, .project').forEach(element => {
    observer.observe(element);
});

// Add hover effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});

// Add typing effect to home section
const homeText = document.querySelector('#home h2');
const originalText = homeText.textContent;
homeText.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < originalText.length) {
        homeText.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing effect when the page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});
