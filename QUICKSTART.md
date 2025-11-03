# EJONA Website - Quick Start Guide

## You're Almost Ready to Launch!

Your professional website has been built and is located in:
**`/Users/jolle/ejona-website/`**

## What You Have

✅ **7 Complete Pages**
- Home page with hero, stats, services overview
- About Us with company story and values
- Services (Elevators, HVAC, Waterworks)
- Projects portfolio with image gallery
- Products/Brands showcase
- **Become a Partner** (Critical for distributors!)
- Contact with form and info

✅ **Key Features**
- Fully responsive (mobile, tablet, desktop)
- Bilingual (English/Albanian toggle)
- Modern, professional design
- Fast loading, SEO optimized
- Interactive forms with validation
- Image gallery with filters
- Smooth animations

## Quick Setup (5 Steps)

### 1. Open the Website Locally
```bash
cd /Users/jolle/ejona-website/
open index.html
```
Or double-click `index.html` to view in your browser.

### 2. Replace Placeholder Content

**Update contact info** (search & replace):
- `+383 XX XXX XXX` → Your phone number
- `info@ejona.com` → Your email
- `partners@ejona.com` → Partnership email
- `Pristina, Kosovo` → Full address

**Add images**:
- Company logo
- Service photos (elevators, HVAC, waterworks)
- Project photos (at least 9 for gallery)
- Client/partner logos
- Team photos (optional)

### 3. Test the Language Toggle
Click "EN | SQ" in the navigation to test bilingual functionality.

### 4. Test Forms
Try submitting:
- Contact form on [contact.html](contact.html)
- Partner application on [partner.html](partner.html)

Currently shows success notifications. Connect to your email service.

### 5. Deploy to Web

**Option A: Use hosting (cPanel, FTP)**
1. Upload all files to your server
2. Point domain to uploaded files
3. Enable HTTPS/SSL

**Option B: Use Netlify (Free, Easy)**
1. Go to netlify.com
2. Drag the `ejona-website` folder
3. Your site is live!
4. Connect custom domain (ejona.com)

## Key Files to Customize

### Contact Information
Files to update:
- All footer sections (in every .html file)
- [contact.html](contact.html) - contact cards
- [partner.html](partner.html) - partnership email

### Content
- [index.html](index.html):1 - Stats (change 50+, 500+, etc.)
- [about.html](about.html):1 - Company story
- [products.html](products.html):1 - Brand names and logos

### Styling
- [css/style.css](css/style.css):1 - Colors, fonts (see lines 1-30)
- [css/pages.css](css/pages.css):1 - Page-specific styles

### Forms
- [js/main.js](js/main.js):1 - Lines 150-250 (form handling)
- Connect to your backend or email service

## Important: Partner Page

The **[partner.html](partner.html)** page is CRITICAL for attracting distributors!

It includes:
- 9 compelling benefits for distributors
- Clear requirements section
- Comprehensive application form
- Professional presentation

**Action Items:**
1. Set up `partners@ejona.com` email
2. Create process for reviewing applications
3. Commit to 48-hour response time (as stated on page)

## Connect Forms to Email

### Option 1: Formspree (Easiest)
```html
<!-- In contact.html, change form tag to: -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: EmailJS
1. Sign up at emailjs.com
2. Add their JS library
3. Update form handlers in main.js

### Option 3: Custom Backend
Create PHP/Node.js backend to process forms.

## Add Google Maps

In [contact.html](contact.html), find `.map-container` and replace with:

```html
<div class="map-container">
    <iframe
        src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
        width="100%"
        height="400"
        style="border:0;"
        allowfullscreen=""
        loading="lazy">
    </iframe>
</div>
```

Get embed code from [Google Maps](https://google.com/maps).

## Testing Checklist

- [ ] Open site in Chrome, Firefox, Safari
- [ ] Test on mobile device
- [ ] Click all navigation links
- [ ] Toggle language (EN/SQ)
- [ ] Submit contact form
- [ ] Submit partner form
- [ ] Test portfolio filters on Projects page
- [ ] Check all images load
- [ ] Verify contact info is correct

## SEO Checklist

- [ ] Update sitemap.xml with your domain
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics
- [ ] Add meta descriptions (already done)
- [ ] Optimize images (compress, add alt text)
- [ ] Enable HTTPS/SSL certificate

## Next Steps

1. **Week 1:** Get site online, add real content
2. **Week 2:** Connect forms, add analytics
3. **Week 3:** Add real photos, optimize SEO
4. **Week 4:** Launch marketing campaign

## Need Help?

Common issues:

**Images not showing?**
- Check file paths in HTML
- Ensure images are in `/images/` folder

**Forms not working?**
- Check browser console for errors
- Make sure form IDs match JavaScript

**Language toggle not working?**
- Check browser console
- Clear browser cache
- Ensure data-en/data-sq attributes are present

## Contact

Built for: **EJONA Engineering**
Website: ejona.com
Location: Pristina, Kosovo

---

**Ready to launch? Upload your files and you're live! 🚀**
