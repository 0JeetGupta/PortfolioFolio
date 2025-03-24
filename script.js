// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight active section in navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Toggle menu for mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Close menu when clicked outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
        navLinks.classList.remove('active');
    }
});

// Scroll animations for sections
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add smooth parallax effect on hero section
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });
    
    // Animate skill bars on scroll
    const skillItems = document.querySelectorAll('.skill-list li');
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
    });
});

// Enhanced form submission with animation
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Create success message with animation
        const formContainer = this.parentElement;
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <h3>Thank you for your message!</h3>
            <p>I will get back to you soon.</p>
        `;
        
        // Animate form disappearing
        this.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        this.style.opacity = '0';
        this.style.transform = 'translateY(-20px)';
        
        // Show success message
        setTimeout(() => {
            this.style.display = 'none';
            formContainer.appendChild(successMessage);
            
            // Animate success message appearing
            successMessage.style.animation = 'fadeInUp 0.5s ease forwards';
            
            // Reset form and return to normal state after 3 seconds
            setTimeout(() => {
                successMessage.style.animation = 'fadeOutDown 0.5s ease forwards';
                setTimeout(() => {
                    successMessage.remove();
                    this.reset();
                    this.style.display = 'block';
                    this.style.opacity = '1';
                    this.style.transform = 'translateY(0)';
                }, 500);
            }, 3000);
        }, 500);
    });
}