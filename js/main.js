// Main JavaScript functionality

// Modal functionality
const modalOverlay = document.getElementById('fade');
const modalContent = document.getElementById('light');
const modalTriggers = document.querySelectorAll('#download-modal-trigger');
const modalClose = document.getElementById('modal-close');

// Open modal function
function openModal() {
    modalOverlay.style.display = 'block';
    modalContent.style.display = 'block';

    // Trigger animation
    setTimeout(() => {
        modalOverlay.classList.add('show');
        modalContent.classList.add('show');
    }, 10);

    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close modal function
function closeModal() {
    modalOverlay.classList.remove('show');
    modalContent.classList.remove('show');

    // Wait for animation to complete before hiding
    setTimeout(() => {
        modalOverlay.style.display = 'none';
        modalContent.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }, 300);
}

// Event listeners for modal
modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', openModal);
});

modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside the content
modalOverlay.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.style.display === 'block') {
        closeModal();
    }
});

// Mobile menu toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    const nav = document.querySelector('nav ul');
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '60px';
        nav.style.right = '24px';
        nav.style.background = 'var(--surface)';
        nav.style.padding = '20px';
        nav.style.borderRadius = 'var(--radius-lg)';
        nav.style.boxShadow = 'var(--shadow-hover)';
        nav.style.border = '1px solid var(--border)';
        nav.style.gap = '16px';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu
            if (window.innerWidth <= 768) {
                document.querySelector('nav ul').style.display = 'none';
            }
        }
    });
});

// Handle disabled links
document.querySelectorAll('.disabled').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});