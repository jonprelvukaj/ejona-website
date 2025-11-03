# EJONA Engineering Website

A modern, professional website for EJONA - Kosovo's leading provider of engineering solutions for elevators, HVAC systems, and waterworks.

## Features

### Core Functionality
- **Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Bilingual Support** - English/Albanian language toggle with localStorage persistence
- **Modern UI/UX** - Clean, professional design with smooth animations and transitions
- **SEO Optimized** - Proper meta tags, semantic HTML, and optimized structure
- **Fast Loading** - Optimized CSS and JavaScript with minimal dependencies

### Pages Included
1. **Home (index.html)** - Hero section, stats, services overview, client logos, CTA
2. **About Us (about.html)** - Company story, mission/values, team, certifications
3. **Services (services.html)** - Detailed pages for Elevators, HVAC, and Waterworks
4. **Projects (projects.html)** - Portfolio gallery with category filters
5. **Products (products.html)** - Brands and products distributed by EJONA
6. **Become a Partner (partner.html)** - Critical page for attracting distributors
7. **Contact (contact.html)** - Contact form, info cards, and map integration

### Key Features

#### Language Toggle
- Seamless switching between English and Albanian
- Saves language preference in localStorage
- All content is translatable via `data-en` and `data-sq` attributes

#### Navigation
- Sticky navigation with smooth scrolling
- Mobile-responsive hamburger menu
- Dropdown menus for services
- Active page highlighting

#### Interactive Elements
- Animated statistics counter on scroll
- Portfolio image gallery with filters
- Lightbox for project images
- Form validation for contact and partner forms
- Smooth scroll animations
- Notification system for form submissions

#### Forms
- Contact form with validation
- Partner application form for distributors
- Email and phone validation
- Success/error notifications

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern features (Grid, Flexbox, Custom Properties)
- **Vanilla JavaScript** - No framework dependencies
- **Google Fonts** - Inter font family
- **Responsive Design** - Mobile-first approach

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Structure

```
ejona-website/
├── index.html              # Home page
├── about.html              # About page
├── services.html           # Services page
├── projects.html           # Projects/Portfolio page
├── products.html           # Products/Brands page
├── partner.html            # Become a Partner page (CRITICAL)
├── contact.html            # Contact page
├── css/
│   ├── style.css          # Main styles
│   └── pages.css          # Page-specific styles
├── js/
│   └── main.js            # JavaScript functionality
├── images/                 # Image assets (add your images here)
└── assets/                 # Additional assets

```

## Setup Instructions

1. **Download/Clone the Website**
   ```bash
   # The website is located in: /Users/jolle/ejona-website/
   ```

2. **Add Your Images**
   - Replace placeholder images in the `images/` folder
   - Add company logo
   - Add service images
   - Add project photos
   - Add client logos
   - Add team photos

3. **Update Contact Information**
   - Search for `+383 XX XXX XXX` and replace with actual phone
   - Update email addresses (info@ejona.com, partners@ejona.com)
   - Add actual address in Pristina
   - Update company details

4. **Customize Content**
   - Update Albanian translations where needed
   - Add actual brand names and logos
   - Update statistics (50+, 500+, etc.) with real numbers
   - Add real project details
   - Update certifications

5. **Add Map Integration**
   - In contact.html, replace the map placeholder with Google Maps embed
   - Get embed code from Google Maps
   - Replace the `.map-container` content

6. **Form Integration**
   - Connect forms to your email service or backend
   - Update form action URLs in `js/main.js`
   - Consider using services like:
     - Formspree
     - EmailJS
     - Custom PHP backend
     - Newsletter API integration

7. **Deploy**
   - Upload to your web hosting
   - Configure domain (ejona.com)
   - Enable HTTPS/SSL
   - Test all functionality

## Customization Guide

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-gradient-start: #667eea;
    --primary-gradient-end: #764ba2;
    --accent-orange: #e04622;
    /* ... more colors */
}
```

### Fonts
Change font in `css/style.css`:
```css
--font-family: 'Inter', sans-serif;
```

### Adding New Translations
Add `data-en` and `data-sq` attributes to any text element:
```html
<p data-en="English text" data-sq="Albanian text">English text</p>
```

## Important Notes

### Partner Page
The **Become a Partner** page (partner.html) is CRITICAL for attracting distributors. It includes:
- Comprehensive benefits section
- Partnership requirements
- Detailed application form
- Clear value proposition

Make sure to:
- Monitor partner form submissions closely
- Respond within 48 hours as promised
- Update partnership email (partners@ejona.com)

### SEO Optimization
Each page includes:
- Unique meta descriptions
- Relevant keywords
- Proper heading hierarchy
- Semantic HTML structure
- Alt text for images (add when you upload images)

### Performance
- Optimize images before uploading (use WebP format when possible)
- Consider lazy loading for images
- Minify CSS/JS for production
- Enable gzip compression on server
- Use CDN for faster global delivery

## Future Enhancements

Consider adding:
- [ ] Blog/News section
- [ ] Customer testimonials/reviews
- [ ] Live chat integration
- [ ] Career/Jobs page
- [ ] Online quote calculator
- [ ] Service booking system
- [ ] Customer portal/login
- [ ] Multilingual support (add more languages)
- [ ] Performance monitoring
- [ ] Analytics integration (Google Analytics)

## Support

For technical issues or customization help:
- Review the code comments in CSS and JavaScript files
- Check browser console for any errors
- Ensure all file paths are correct
- Test on multiple devices and browsers

## License

This website is built for EJONA Engineering. All rights reserved.

---

Built with care for EJONA Engineering - Engineering Excellence in Kosovo
