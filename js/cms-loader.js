// ===================================
// CMS Content Loaders
// Additional loaders for CMS-editable content
// ===================================

// Load CTA Content from CMS
async function loadCTAContent(pageName) {
    try {
        const response = await fetch('content/cta.json');
        if (!response.ok) return;

        const data = await response.json();
        const ctaData = data[pageName];

        if (!ctaData) return;

        const ctaSection = document.querySelector('.cta');
        if (!ctaSection) return;

        // Update background image if provided
        if (ctaData.background_image) {
            ctaSection.style.backgroundImage = `url('${ctaData.background_image}')`;
        }

        // Update title
        const ctaTitle = ctaSection.querySelector('.cta-title');
        if (ctaTitle) {
            ctaTitle.setAttribute('data-en', ctaData.title_en);
            ctaTitle.setAttribute('data-sq', ctaData.title_sq);
            ctaTitle.textContent = currentLang === 'sq' ? ctaData.title_sq : ctaData.title_en;
        }

        // Update text
        const ctaText = ctaSection.querySelector('.cta-text');
        if (ctaText) {
            ctaText.setAttribute('data-en', ctaData.text_en);
            ctaText.setAttribute('data-sq', ctaData.text_sq);
            ctaText.textContent = currentLang === 'sq' ? ctaData.text_sq : ctaData.text_en;
        }

        // Update buttons
        const ctaButtons = ctaSection.querySelector('.cta-buttons');
        if (ctaButtons) {
            ctaButtons.innerHTML = '';

            // Button 1
            const button1 = document.createElement('a');
            button1.href = ctaData.button1_link;
            button1.className = 'btn btn-primary';
            button1.setAttribute('data-en', ctaData.button1_text_en);
            button1.setAttribute('data-sq', ctaData.button1_text_sq);
            button1.textContent = currentLang === 'sq' ? ctaData.button1_text_sq : ctaData.button1_text_en;
            ctaButtons.appendChild(button1);

            // Button 2 (if provided)
            if (ctaData.button2_text_en) {
                const button2 = document.createElement('a');
                button2.href = ctaData.button2_link;
                button2.className = 'btn btn-secondary-white';
                button2.setAttribute('data-en', ctaData.button2_text_en);
                button2.setAttribute('data-sq', ctaData.button2_text_sq);
                button2.textContent = currentLang === 'sq' ? ctaData.button2_text_sq : ctaData.button2_text_en;
                ctaButtons.appendChild(button2);
            }
        }

    } catch (error) {
        console.error('Error loading CTA content:', error);
    }
}

// Load Google Maps
function loadGoogleMap(embedUrl) {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer || !embedUrl) return;

    // Extract src URL from iframe HTML if full iframe was pasted
    let srcUrl = embedUrl;
    if (embedUrl.includes('<iframe')) {
        const srcMatch = embedUrl.match(/src="([^"]+)"/);
        if (srcMatch) {
            srcUrl = srcMatch[1];
        }
    }

    mapContainer.innerHTML = `<iframe src="${srcUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
}

// Helper function to convert markdown bold syntax to HTML
function parseMarkdownBold(text) {
    if (!text) return '';
    // Convert **text** to <strong>text</strong>
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// Load Services with images
async function loadServicesImages() {
    const serviceImages = document.querySelectorAll('.service-image');
    if (serviceImages.length === 0) return;

    try {
        const serviceFiles = ['elevators.json', 'hvac.json', 'waterworks.json'];

        for (let i = 0; i < serviceFiles.length && i < serviceImages.length; i++) {
            const response = await fetch(`content/services/${serviceFiles[i]}`);
            if (!response.ok) continue;

            const service = await response.json();

            if (service.image) {
                serviceImages[i].innerHTML = `<img src="${service.image}" alt="${service.name_en}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">`;
            }
        }
    } catch (error) {
        console.error('Error loading service images:', error);
    }
}

// Initialize page-specific loaders
function initPageLoaders() {
    const pathname = window.location.pathname.replace(/\/$/, ''); // Remove trailing slash
    const page = pathname.substring(pathname.lastIndexOf('/') + 1).replace('.html', '') || 'index';

    // Map pages to CTA names
    const ctaPageMap = {
        'index': 'home',
        'about': 'about',
        'services': 'services',
        'projects': 'projects',
        'products': 'products',
        'contact': 'contact'
    };

    // Load CTA for current page
    if (ctaPageMap[page]) {
        loadCTAContent(ctaPageMap[page]);
    }

    // Load services images on services page
    if (page === 'services') {
        loadServicesImages();
    }

    // Load partner page content
    if (page === 'partner') {
        loadPartnerContent();
    }

    // Load contact content (for contact page this loads everything, for other pages just footer)
    if (page === 'contact') {
        loadContactContent();
    } else {
        // Load footer contact info on all pages
        loadFooterContactInfo();
    }
}

// Load only footer contact info (for non-contact pages)
async function loadFooterContactInfo() {
    try {
        const response = await fetch('content/contact.json');
        if (!response.ok) return;

        const data = await response.json();

        // Update footer contact info
        const footerPhone = document.querySelector('.footer-contact .footer-phone');
        if (footerPhone && data.phone) {
            footerPhone.textContent = data.phone;
        }

        const footerEmail = document.querySelector('.footer-contact .footer-email');
        if (footerEmail && data.email) {
            footerEmail.textContent = data.email;
        }

        const footerAddress = document.querySelector('.footer-contact .footer-address');
        if (footerAddress && data.address_en) {
            footerAddress.setAttribute('data-en', data.address_en);
            footerAddress.setAttribute('data-sq', data.address_sq);
            footerAddress.textContent = currentLang === 'sq' ? data.address_sq : data.address_en;
        }
    } catch (error) {
        console.error('Error loading footer contact info:', error);
    }
}

// Load Partner Page Content
async function loadPartnerContent() {
    try {
        const response = await fetch('content/partner.json');
        if (!response.ok) return;

        const data = await response.json();

        // Update page header
        const pageTitle = document.querySelector('.page-header .page-title');
        const pageSubtitle = document.querySelector('.page-header .page-subtitle');

        if (pageTitle) {
            pageTitle.setAttribute('data-en', data.title_en);
            pageTitle.setAttribute('data-sq', data.title_sq);
            pageTitle.textContent = currentLang === 'sq' ? data.title_sq : data.title_en;
        }

        if (pageSubtitle) {
            pageSubtitle.setAttribute('data-en', data.subtitle_en);
            pageSubtitle.setAttribute('data-sq', data.subtitle_sq);
            pageSubtitle.textContent = currentLang === 'sq' ? data.subtitle_sq : data.subtitle_en;
        }

        // Update intro section
        const introTitle = document.querySelector('.partner-intro .section-title');
        const introText = document.querySelector('.partner-intro .section-subtitle');

        if (introTitle) {
            introTitle.setAttribute('data-en', data.intro_title_en);
            introTitle.setAttribute('data-sq', data.intro_title_sq);
            introTitle.textContent = currentLang === 'sq' ? data.intro_title_sq : data.intro_title_en;
        }

        if (introText) {
            introText.setAttribute('data-en', data.intro_text_en);
            introText.setAttribute('data-sq', data.intro_text_sq);
            introText.textContent = currentLang === 'sq' ? data.intro_text_sq : data.intro_text_en;
        }

        // Update form section
        const formTitle = document.querySelector('.partner-form-section .section-title');
        const formDesc = document.querySelector('.partner-form-section p');

        if (formTitle && data.form_title_en) {
            formTitle.setAttribute('data-en', data.form_title_en);
            formTitle.setAttribute('data-sq', data.form_title_sq);
            formTitle.textContent = currentLang === 'sq' ? data.form_title_sq : data.form_title_en;
        }

        if (formDesc && data.form_desc_en) {
            formDesc.setAttribute('data-en', data.form_desc_en);
            formDesc.setAttribute('data-sq', data.form_desc_sq);
            formDesc.textContent = currentLang === 'sq' ? data.form_desc_sq : data.form_desc_en;
        }

    } catch (error) {
        console.error('Error loading partner content:', error);
    }
}

// Load Contact Page Content (phone, email, address, map)
async function loadContactContent() {
    try {
        const response = await fetch('content/contact.json');
        if (!response.ok) return;

        const data = await response.json();

        // Update phone number
        const phoneLink = document.querySelector('.contact-card a[href^="tel:"]');
        if (phoneLink && data.phone) {
            const phoneClean = data.phone.replace(/\s/g, '');
            phoneLink.href = `tel:${phoneClean}`;
            phoneLink.textContent = data.phone;
        }

        // Update email
        const emailLink = document.querySelector('.contact-card a[href^="mailto:"]');
        if (emailLink && data.email) {
            emailLink.href = `mailto:${data.email}`;
            emailLink.textContent = data.email;
        }

        // Update address
        const addressCard = document.querySelector('.contact-card .contact-address');
        if (addressCard && data.address_en) {
            addressCard.setAttribute('data-en', data.address_en);
            addressCard.setAttribute('data-sq', data.address_sq);
            addressCard.textContent = currentLang === 'sq' ? data.address_sq : data.address_en;
        }

        // Update footer contact info as well
        const footerPhone = document.querySelector('.footer-contact .footer-phone');
        if (footerPhone && data.phone) {
            footerPhone.textContent = data.phone;
        }

        const footerEmail = document.querySelector('.footer-contact .footer-email');
        if (footerEmail && data.email) {
            footerEmail.textContent = data.email;
        }

        const footerAddress = document.querySelector('.footer-contact .footer-address');
        if (footerAddress && data.address_en) {
            footerAddress.setAttribute('data-en', data.address_en);
            footerAddress.setAttribute('data-sq', data.address_sq);
            footerAddress.textContent = currentLang === 'sq' ? data.address_sq : data.address_en;
        }

        // Load Google Maps
        if (data.google_maps_url) {
            loadGoogleMap(data.google_maps_url);
        }
    } catch (error) {
        console.error('Error loading contact content:', error);
    }
}

// Legacy function name for backwards compatibility
async function loadContactMap() {
    loadContactContent();
}

// Run page loaders when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageLoaders);
} else {
    initPageLoaders();
}
