// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    const setNavOpen = (isOpen) => {
        navToggle.classList.toggle('active', isOpen);
        navMenu.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    };

    navToggle.addEventListener('click', () => {
        setNavOpen(!navMenu.classList.contains('active'));
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            setNavOpen(false);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            setNavOpen(false);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setNavOpen(false);
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                block: 'start'
            });
        }
    });
});

// Open portfolio images at their original resolution in a full-screen viewer
const imageLightbox = document.querySelector('.image-lightbox');

if (imageLightbox) {
    const lightboxImage = imageLightbox.querySelector('.lightbox-image');
    const lightboxCaption = imageLightbox.querySelector('.lightbox-caption');
    const lightboxClose = imageLightbox.querySelector('.lightbox-close');
    let lastImageTrigger = null;

    const openImage = (image) => {
        lastImageTrigger = image;
        document.body.classList.add('lightbox-open');
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent =
            image.closest('.gallery-item')?.querySelector('.gallery-item-title')?.textContent.trim() || image.alt;
        imageLightbox.showModal();
    };

    document.querySelectorAll('.gallery-image, .about-portrait').forEach(image => {
        image.tabIndex = 0;
        image.setAttribute('role', 'button');
        image.setAttribute('aria-haspopup', 'dialog');
        image.setAttribute('aria-label', `Open full-size image: ${image.alt}`);
        image.addEventListener('click', () => openImage(image));
        image.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openImage(image);
            }
        });
    });

    lightboxClose.addEventListener('click', () => imageLightbox.close());
    imageLightbox.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            imageLightbox.close();
        }
    });
    imageLightbox.addEventListener('click', (event) => {
        if (event.target === imageLightbox) {
            imageLightbox.close();
        }
    });
    imageLightbox.addEventListener('close', () => {
        document.body.classList.remove('lightbox-open');
        lightboxImage.removeAttribute('src');
        lastImageTrigger?.focus({ preventScroll: true });
        lastImageTrigger = null;
    });
}

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    }, { passive: true });
});
