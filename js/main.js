// ===================================
// Helper Functions
// ===================================
// Parse markdown bold syntax to HTML
function parseMarkdownBold(text) {
    if (!text) return '';
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// ===================================
// Language Translations
// ===================================
const translations = {
    en: {},
    sq: {}
};

// Current language state
let currentLang = 'en';

// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-wrapper')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===================================
// Language Toggle
// ===================================
const langToggle = document.getElementById('langToggle');
const langOptions = document.querySelectorAll('.lang-option');

if (langToggle) {
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
}

function switchLanguage(lang) {
    if (lang === currentLang) return;

    currentLang = lang;

    // Update active state on language toggle
    langOptions.forEach(option => {
        option.classList.toggle('active', option.getAttribute('data-lang') === lang);
    });

    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[data-en][data-sq]');
    translatableElements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            // Check if it's an input placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });

    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'en' || savedLang === 'sq')) {
        switchLanguage(savedLang);
    }
}

// Initialize language on page load
loadLanguagePreference();

// ===================================
// Sticky Navigation
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// Animated Stats Counter
// ===================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = element.getAttribute('data-count');
        }
    };

    updateCounter();
}

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumbers = entry.target.querySelectorAll('.stat-number[data-count]');
            statNumbers.forEach(stat => animateCounter(stat));
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// Form Validation (for contact page)
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = currentLang === 'en' ? 'Sending...' : 'Duke dërguar...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showNotification(
                currentLang === 'en'
                    ? 'Thank you! Your message has been sent successfully.'
                    : 'Faleminderit! Mesazhi juaj është dërguar me sukses.',
                'success'
            );
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// ===================================
// Partner Form Validation
// ===================================
const partnerForm = document.getElementById('partnerForm');
if (partnerForm) {
    partnerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(partnerForm);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!data.company || !data.name || !data.email || !data.phone || !data.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        const submitButton = partnerForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = currentLang === 'en' ? 'Sending...' : 'Duke dërguar...';
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            showNotification(
                currentLang === 'en'
                    ? 'Thank you for your interest! We will contact you soon.'
                    : 'Faleminderit për interesin tuaj! Do t\'ju kontaktojmë së shpejti.',
                'success'
            );
            partnerForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===================================
// Image Gallery (for projects page)
// ===================================
const galleryItems = document.querySelectorAll('.gallery-item');
const filterButtons = document.querySelectorAll('.filter-btn');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('show'), 10);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
}

// Lightbox functionality - Initialize event listeners
function initializeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (!lightbox) return;

    // Close button click
    if (lightboxClose) {
        lightboxClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
    }

    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize lightbox on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeLightbox();
});

// ===================================
// Lazy Loading Images
// ===================================
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===================================
// Scroll Reveal Animation
// ===================================
const revealElements = document.querySelectorAll('.service-card, .feature-item, .client-logo');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';

            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ===================================
// Page Load Animation
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// Service Worker Registration (for PWA)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(err => console.log('SW registration failed'));
    });
}

// ===================================
// Load Projects from CMS
// ===================================
async function loadProjects() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    try {
        // Get list of all project files
        const projectFiles = [
            'office-tower-project.json',
            'shopping-mall-hvac.json',
            'municipal-water-system.json',
            'residential-complex.json',
            'hotel-climate-control.json',
            'fire-protection-system.json',
            'hospital-elevator-system.json',
            'industrial-hvac.json',
            'city-water-infrastructure.json'
        ];

        // Clear existing projects
        galleryGrid.innerHTML = '';

        // Load each project
        for (const file of projectFiles) {
            try {
                const response = await fetch(`content/projects/${file}`);
                if (!response.ok) continue;

                const project = await response.json();

                // Create project HTML
                const projectElement = document.createElement('div');
                projectElement.className = 'gallery-item show';
                projectElement.setAttribute('data-category', project.category);

                // Determine if we have an image or use gradient
                const imageContent = project.image
                    ? `<img src="${project.image}" alt="${project.title_en}" style="width: 100%; height: 100%; object-fit: cover;">`
                    : `<div class="image-placeholder" style="width: 100%; height: 100%; background: linear-gradient(135deg, #F5B700, #2C2C2C);"></div>`;

                projectElement.innerHTML = `
                    ${imageContent}
                    <div class="gallery-overlay">
                        <div class="gallery-title" data-en="${project.title_en}" data-sq="${project.title_sq}">${project.title_en}</div>
                        <div class="gallery-category" data-en="${getCategoryName(project.category, 'en')}" data-sq="${getCategoryName(project.category, 'sq')}">${getCategoryName(project.category, 'en')}</div>
                    </div>
                `;

                // Add click handler for lightbox with project details
                projectElement.addEventListener('click', () => {
                    openProjectLightbox(project);
                });
                projectElement.style.cursor = 'pointer';

                galleryGrid.appendChild(projectElement);
            } catch (err) {
                console.error(`Error loading project ${file}:`, err);
            }
        }

        // Re-apply language to new elements
        if (currentLang === 'sq') {
            switchLanguage('sq');
        }

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function getCategoryName(category, lang) {
    const categories = {
        elevators: { en: 'Elevators', sq: 'Ashensorë' },
        hvac: { en: 'HVAC Systems', sq: 'Sistemet HVAC' },
        waterworks: { en: 'Waterworks', sq: 'Ujësjellës' }
    };
    return categories[category]?.[lang] || category;
}

function openLightbox(imageSrc) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function openProjectLightbox(project) {
    const lightbox = document.querySelector('.project-lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDescription = lightbox.querySelector('.lightbox-description');
    const lightboxCategory = lightbox.querySelector('.lightbox-category');

    // Set image
    if (lightboxImg) {
        if (project.image) {
            lightboxImg.src = project.image;
            lightboxImg.style.display = 'block';
        } else {
            lightboxImg.style.display = 'none';
        }
    }

    // Set title based on current language
    if (lightboxTitle) {
        const title = currentLang === 'sq' ? project.title_sq : project.title_en;
        lightboxTitle.textContent = title;
        lightboxTitle.setAttribute('data-en', project.title_en);
        lightboxTitle.setAttribute('data-sq', project.title_sq);
    }

    // Set description based on current language
    if (lightboxDescription) {
        const desc = currentLang === 'sq' ? project.description_sq : project.description_en;
        lightboxDescription.textContent = desc;
        lightboxDescription.setAttribute('data-en', project.description_en);
        lightboxDescription.setAttribute('data-sq', project.description_sq);
    }

    // Set category
    if (lightboxCategory) {
        const categoryName = getCategoryName(project.category, currentLang);
        lightboxCategory.textContent = categoryName;
        lightboxCategory.setAttribute('data-en', getCategoryName(project.category, 'en'));
        lightboxCategory.setAttribute('data-sq', getCategoryName(project.category, 'sq'));
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Load projects when page loads
if (document.querySelector('.gallery-grid')) {
    loadProjects();
}

// ===================================
// Load Products from CMS
// ===================================
async function loadProducts() {
    try {
        const productFiles = [
            'premium-elevators.json',
            'commercial-solutions.json',
            'escalator-systems.json',
            'climate-control-systems.json',
            'industrial-hvac.json',
            'smart-climate-systems.json',
            'water-distribution.json',
            'fire-protection-systems.json',
            'pumping-systems.json'
        ];

        // Get all product grid containers
        const productGrids = document.querySelectorAll('.products-grid');
        if (productGrids.length === 0) return;

        // Clear all grids
        productGrids.forEach(grid => grid.innerHTML = '');

        // Categorize products
        const elevatorProducts = [];
        const hvacProducts = [];
        const waterworksProducts = [];

        // Load all products
        for (const file of productFiles) {
            try {
                const response = await fetch(`content/products/${file}`);
                if (!response.ok) continue;

                const product = await response.json();

                if (product.category === 'elevators') {
                    elevatorProducts.push(product);
                } else if (product.category === 'hvac') {
                    hvacProducts.push(product);
                } else if (product.category === 'waterworks') {
                    waterworksProducts.push(product);
                }
            } catch (err) {
                console.error(`Error loading product ${file}:`, err);
            }
        }

        // Render products to their respective grids
        if (productGrids[0]) renderProductsToGrid(productGrids[0], elevatorProducts);
        if (productGrids[1]) renderProductsToGrid(productGrids[1], hvacProducts);
        if (productGrids[2]) renderProductsToGrid(productGrids[2], waterworksProducts);

        // Re-apply language
        if (currentLang === 'sq') {
            switchLanguage('sq');
        }

    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function renderProductsToGrid(grid, products) {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const logoContent = product.logo
            ? `<img src="${product.logo}" alt="${product.brand}" class="product-brand-logo">`
            : `<div class="product-logo-placeholder">${product.brand}</div>`;

        productCard.innerHTML = `
            <div class="product-logo">
                ${logoContent}
            </div>
            <h3>${product.brand}</h3>
            <p data-en="${product.description_en}" data-sq="${product.description_sq}">${currentLang === 'sq' ? product.description_sq : product.description_en}</p>
        `;

        grid.appendChild(productCard);

        // Add click handler for logo images AFTER appending to DOM
        const img = productCard.querySelector('.product-brand-logo');
        if (img && product.logo) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Product image clicked:', product.logo);
                openLightbox(product.logo);
            });
        }
    });
}

// Load products when page loads
if (document.querySelector('.products-grid')) {
    loadProducts();
}

// ===================================
// Hero Slider
// ===================================
let currentSlide = 0;
let sliderInterval = null;
let slides = [];

async function loadHeroSlider() {
    try {
        const response = await fetch('content/hero-slider.json');
        if (!response.ok) return;

        const data = await response.json();
        slides = data.slides || [];

        const sliderContainer = document.querySelector('.hero-slider');
        if (!sliderContainer || slides.length === 0) return;

        // Clear existing slides
        sliderContainer.innerHTML = '';

        // Create slide elements
        slides.forEach((slide, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = 'hero-slide';
            if (index === 0) slideDiv.classList.add('active');
            slideDiv.innerHTML = `<img src="${slide.image}" alt="${slide.alt || 'Hero slide'}">`;
            sliderContainer.appendChild(slideDiv);
        });

        // Start auto-play if more than 1 slide
        if (slides.length > 1) {
            startSlider();
        }

    } catch (error) {
        console.error('Error loading hero slider:', error);
    }
}

function startSlider() {
    sliderInterval = setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

function nextSlide() {
    const slideElements = document.querySelectorAll('.hero-slide');
    if (slideElements.length === 0) return;

    slideElements[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slideElements.length;
    slideElements[currentSlide].classList.add('active');
}

function stopSlider() {
    if (sliderInterval) {
        clearInterval(sliderInterval);
        sliderInterval = null;
    }
}

// Pause slider on hover
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.addEventListener('mouseenter', stopSlider);
    heroSection.addEventListener('mouseleave', () => {
        if (slides.length > 1) startSlider();
    });
}

// ===================================
// Load Home Page Content from CMS
// ===================================
async function loadHomeContent() {
    try {
        const response = await fetch('content/home.json');
        if (!response.ok) return;

        const data = await response.json();

        // Update hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.setAttribute('data-en', data.hero_title_en);
            heroTitle.setAttribute('data-sq', data.hero_title_sq);
            heroTitle.textContent = currentLang === 'sq' ? data.hero_title_sq : data.hero_title_en;
        }

        // Update hero subtitle
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) {
            heroSubtitle.setAttribute('data-en', data.hero_subtitle_en);
            heroSubtitle.setAttribute('data-sq', data.hero_subtitle_sq);
            heroSubtitle.textContent = currentLang === 'sq' ? data.hero_subtitle_sq : data.hero_subtitle_en;
        }

        // Update stats
        if (data.stats) {
            const statsNumbers = document.querySelectorAll('.stat-number');
            if (statsNumbers.length >= 4) {
                statsNumbers[0].setAttribute('data-count', data.stats.engineers + '+');
                statsNumbers[0].textContent = data.stats.engineers + '+';

                statsNumbers[1].setAttribute('data-count', data.stats.projects + '+');
                statsNumbers[1].textContent = data.stats.projects + '+';

                statsNumbers[2].setAttribute('data-count', data.stats.support);
                statsNumbers[2].textContent = data.stats.support;

                statsNumbers[3].setAttribute('data-count', data.stats.years + '+');
                statsNumbers[3].textContent = data.stats.years + '+';
            }
        }

        // Update Why Choose Us section
        if (data.why_choose) {
            loadWhyChooseUs(data.why_choose);
        }

        // Update Client Logos
        if (data.client_logos) {
            loadClientLogos(data.client_logos);
        }

    } catch (error) {
        console.error('Error loading home content:', error);
    }
}

function loadWhyChooseUs(whyChooseData) {
    const whyChooseImage = document.querySelector('.why-choose-image');
    const featuresList = document.querySelector('.features-list');

    // Update image if provided
    if (whyChooseImage && whyChooseData.image) {
        whyChooseImage.innerHTML = `<img src="${whyChooseData.image}" alt="Why Choose EJONA" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">`;
    }

    // Update features
    if (featuresList && whyChooseData.features && whyChooseData.features.length > 0) {
        featuresList.innerHTML = '';

        whyChooseData.features.forEach(feature => {
            const featureDiv = document.createElement('div');
            featureDiv.className = 'feature-item';
            featureDiv.innerHTML = `
                <div class="feature-icon">✓</div>
                <div class="feature-content">
                    <h4 data-en="${feature.title_en}" data-sq="${feature.title_sq}">${currentLang === 'sq' ? feature.title_sq : feature.title_en}</h4>
                    <p data-en="${feature.description_en}" data-sq="${feature.description_sq}">${currentLang === 'sq' ? feature.description_sq : feature.description_en}</p>
                </div>
            `;
            featuresList.appendChild(featureDiv);
        });
    }
}

function loadClientLogos(logos) {
    const clientsGrid = document.querySelector('.clients-grid');
    if (!clientsGrid) return;

    if (logos && logos.length > 0) {
        clientsGrid.innerHTML = '';

        logos.forEach(client => {
            const clientDiv = document.createElement('div');
            clientDiv.className = 'client-logo';
            clientDiv.innerHTML = `<img src="${client.logo}" alt="${client.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
            clientsGrid.appendChild(clientDiv);
        });
    }
}

// ===================================
// Load Contact Information from CMS
// ===================================
async function loadContactInfo() {
    try {
        const response = await fetch('content/contact.json');
        if (!response.ok) return;

        const data = await response.json();

        // Update all phone numbers in footer and contact page
        document.querySelectorAll('.footer-contact li').forEach(li => {
            if (li.textContent.includes('Phone') || li.textContent.includes('Telefoni')) {
                li.innerHTML = `<span data-en="Phone:" data-sq="Telefoni:">Phone:</span> ${data.phone}`;
            }
            if (li.textContent.includes('Email:')) {
                li.innerHTML = `<span data-en="Email:" data-sq="Email:">Email:</span> ${data.email}`;
            }
            if (li.textContent.includes('Address') || li.textContent.includes('Adresa')) {
                li.innerHTML = `<span data-en="Address:" data-sq="Adresa:">Address:</span> <span data-en="${data.address_en}" data-sq="${data.address_sq}">${currentLang === 'sq' ? data.address_sq : data.address_en}</span>`;
            }
        });

        // Update contact page specific elements
        const phoneLink = document.querySelector('a[href^="tel:"]');
        if (phoneLink) {
            phoneLink.href = `tel:${data.phone}`;
            phoneLink.textContent = data.phone;
        }

        const emailLink = document.querySelector('a[href^="mailto:"]');
        if (emailLink && emailLink.textContent.includes('@')) {
            emailLink.href = `mailto:${data.email}`;
            emailLink.textContent = data.email;
        }

    } catch (error) {
        console.error('Error loading contact info:', error);
    }
}

// ===================================
// Load About Page Content from CMS
// ===================================
async function loadAboutContent() {
    try {
        const response = await fetch('content/about.json');
        if (!response.ok) return;

        const data = await response.json();

        // Update story text
        const storyText = document.querySelector('.story-text .text-content');
        if (storyText && data.story_en) {
            // Convert markdown-style text to HTML (basic support for \n\n as paragraphs)
            const storyParagraphs = data.story_en.split('\n\n').filter(p => p.trim());
            const storyParagraphsSq = data.story_sq.split('\n\n').filter(p => p.trim());

            storyText.innerHTML = '';
            storyParagraphs.forEach((para, index) => {
                const p = document.createElement('p');
                p.setAttribute('data-en', para.trim());
                p.setAttribute('data-sq', storyParagraphsSq[index]?.trim() || para.trim());
                p.textContent = currentLang === 'sq' ? (storyParagraphsSq[index]?.trim() || para.trim()) : para.trim();
                storyText.appendChild(p);
            });
        }

        // Update story image
        if (data.story_image) {
            const storyImage = document.querySelector('.story-image');
            if (storyImage) {
                storyImage.innerHTML = `<img src="${data.story_image}" alt="EJONA Company" style="width: 100%; height: 100%; object-fit: cover;">`;
            }
        }

        // Update mission
        const missionCard = document.querySelector('.value-card:nth-child(1) p');
        if (missionCard && data.mission_en) {
            missionCard.setAttribute('data-en', data.mission_en);
            missionCard.setAttribute('data-sq', data.mission_sq);
            missionCard.textContent = currentLang === 'sq' ? data.mission_sq : data.mission_en;
        }

        // Update vision
        const visionCard = document.querySelector('.value-card:nth-child(2) p');
        if (visionCard && data.vision_en) {
            visionCard.setAttribute('data-en', data.vision_en);
            visionCard.setAttribute('data-sq', data.vision_sq);
            visionCard.textContent = currentLang === 'sq' ? data.vision_sq : data.vision_en;
        }

        // Update founder section
        if (data.founder && data.founder.name_en) {
            const founderSection = document.querySelector('.founder-section');
            const founderName = document.querySelector('.founder-name');
            const founderTitle = document.querySelector('.founder-title');
            const founderImage = document.querySelector('.founder-image');
            const founderBio = document.querySelector('.founder-bio');

            if (founderSection) {
                founderSection.style.display = 'block';

                if (founderName && data.founder.name_en) {
                    founderName.setAttribute('data-en', data.founder.name_en);
                    founderName.setAttribute('data-sq', data.founder.name_sq || data.founder.name_en);
                    founderName.textContent = currentLang === 'sq' ? (data.founder.name_sq || data.founder.name_en) : data.founder.name_en;
                }

                if (founderTitle && data.founder.title_en) {
                    founderTitle.setAttribute('data-en', data.founder.title_en);
                    founderTitle.setAttribute('data-sq', data.founder.title_sq || data.founder.title_en);
                    founderTitle.textContent = currentLang === 'sq' ? (data.founder.title_sq || data.founder.title_en) : data.founder.title_en;
                }

                if (founderImage && data.founder.image) {
                    founderImage.innerHTML = `<img src="${data.founder.image}" alt="${data.founder.name_en}" style="width: 100%; height: auto; border-radius: 16px;">`;
                }

                if (founderBio && data.founder.bio_en) {
                    const bioParagraphs = data.founder.bio_en.split('\n\n').filter(p => p.trim());
                    const bioParagraphsSq = (data.founder.bio_sq || data.founder.bio_en).split('\n\n').filter(p => p.trim());

                    founderBio.innerHTML = '';
                    bioParagraphs.forEach((para, index) => {
                        const p = document.createElement('p');
                        const enText = parseMarkdownBold(para.trim());
                        const sqText = parseMarkdownBold(bioParagraphsSq[index]?.trim() || para.trim());
                        p.setAttribute('data-en', enText);
                        p.setAttribute('data-sq', sqText);
                        p.innerHTML = currentLang === 'sq' ? sqText : enText;
                        founderBio.appendChild(p);
                    });
                }
            }
        }

        // Update certifications section
        if (data.certifications) {
            const certsSection = document.querySelector('.certifications');
            const certsTitle = certsSection?.querySelector('.section-title');
            const certsSubtitle = certsSection?.querySelector('.section-subtitle');
            const certsGrid = certsSection?.querySelector('.cert-grid');

            if (certsTitle && data.certifications.title_en) {
                certsTitle.setAttribute('data-en', data.certifications.title_en);
                certsTitle.setAttribute('data-sq', data.certifications.title_sq);
                certsTitle.textContent = currentLang === 'sq' ? data.certifications.title_sq : data.certifications.title_en;
            }

            if (certsSubtitle && data.certifications.subtitle_en) {
                certsSubtitle.setAttribute('data-en', data.certifications.subtitle_en);
                certsSubtitle.setAttribute('data-sq', data.certifications.subtitle_sq);
                certsSubtitle.textContent = currentLang === 'sq' ? data.certifications.subtitle_sq : data.certifications.subtitle_en;
            }

            if (certsGrid && data.certifications.items && data.certifications.items.length > 0) {
                certsGrid.innerHTML = '';
                data.certifications.items.forEach(cert => {
                    const certDiv = document.createElement('div');
                    certDiv.className = 'cert-item';
                    certDiv.innerHTML = `<img src="${cert.image}" alt="${cert.name_en}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px;">`;
                    certDiv.title = currentLang === 'sq' ? cert.name_sq : cert.name_en;
                    certsGrid.appendChild(certDiv);
                });
            }
        }

    } catch (error) {
        console.error('Error loading about content:', error);
    }
}

// Load content on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.hero')) {
        loadHomeContent();
        loadHeroSlider(); // Load hero slider
    }
    if (document.querySelector('.company-story')) {
        loadAboutContent(); // Load about page content
    }
    loadContactInfo(); // Load on all pages for footer
});

// ===================================
// Console Welcome Message
// ===================================
console.log('%c EJONA Engineering ', 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
console.log('%c Quality Engineering Solutions | Built with Care ', 'color: #667eea; font-size: 12px;');
