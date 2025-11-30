// Main JavaScript functionality

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