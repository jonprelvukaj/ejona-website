# EJONA Website - Deployment Guide

This guide will walk you through deploying your EJONA Engineering website to production.

## Step 1: Set Up Formspree (Form Handling)

Formspree is a service that will handle your contact and partner form submissions by sending them to your email.

### Instructions:

1. **Create a Formspree Account**
   - Go to https://formspree.io
   - Click "Sign Up" (it's free for up to 50 submissions/month)
   - Sign up with your email

2. **Create Two Forms**

   **Contact Form:**
   - After logging in, click "+ New Form"
   - Name it "Contact Form"
   - You'll receive a Form ID that looks like: `xyzabc123`
   - Set the email where submissions should go (e.g., info@ejona.com)

   **Partner Form:**
   - Click "+ New Form" again
   - Name it "Partner Applications"
   - You'll receive another Form ID
   - Set the email where partner applications should go (e.g., partners@ejona.com)

3. **Update Your HTML Files**

   Open these files and replace the placeholders:

   **In contact.html (line 97):**
   ```html
   Replace: action="https://formspree.io/f/YOUR_CONTACT_FORM_ID"
   With:    action="https://formspree.io/f/xyzabc123"  (use your actual form ID)
   ```

   **In partner.html (line 218):**
   ```html
   Replace: action="https://formspree.io/f/YOUR_PARTNER_FORM_ID"
   With:    action="https://formspree.io/f/abc123xyz"  (use your actual form ID)
   ```

   **Also replace the redirect URLs (lines 99 in contact.html and 220 in partner.html):**
   ```html
   Replace: value="https://yourdomain.com/contact.html"
   With:    value="https://ejona.com/contact.html"  (use your actual domain)
   ```

4. **Test Your Forms**
   - Once deployed, submit a test on each form
   - You should receive an email with the submission
   - The first submission may require email verification

## Step 2: Create GitHub Repository

### Instructions:

1. **Create Repository on GitHub**
   - Go to https://github.com
   - Sign in (or create an account if you don't have one)
   - Click the "+" button in the top right
   - Select "New repository"
   - Name it: `ejona-website`
   - Make it **Public** (required for free Netlify hosting)
   - DO NOT initialize with README (we already have files)
   - Click "Create repository"

2. **Push Your Code to GitHub**

   GitHub will show you commands to run. Use these:

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ejona-website.git
   git branch -M main
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your actual GitHub username.

   **Note:** You may be asked to authenticate. If you haven't set up GitHub credentials:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token (classic)
   - Use the token as your password when pushing

3. **Verify Upload**
   - Refresh your GitHub repository page
   - You should see all your website files there

## Step 3: Deploy to Netlify

Netlify will host your website and CMS for free.

### Instructions:

1. **Create Netlify Account**
   - Go to https://www.netlify.com
   - Click "Sign Up"
   - Choose "Sign up with GitHub" (easiest option)
   - Authorize Netlify to access your GitHub account

2. **Deploy Your Site**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Find and select your `ejona-website` repository
   - Build settings should be:
     - **Build command:** (leave empty)
     - **Publish directory:** `/` (root directory)
   - Click "Deploy site"

3. **Wait for Deployment**
   - Netlify will assign a random subdomain like `happy-panda-123456.netlify.app`
   - Wait 1-2 minutes for deployment to complete
   - Click the generated URL to view your live site!

4. **Set Up Custom Domain (Optional)**

   If you have a domain (e.g., ejona.com):
   - In Netlify, go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain name (e.g., ejona.com)
   - Follow the DNS configuration instructions
   - Update your domain's nameservers or add DNS records as shown
   - SSL certificate will be automatically generated (may take a few minutes)

## Step 4: Configure CMS for Production

Currently, your CMS is set for local development. To make it work in production:

### Instructions:

1. **Enable Netlify Identity**
   - In your Netlify site dashboard, go to "Identity"
   - Click "Enable Identity"
   - Under "Registration preferences," choose "Invite only" (recommended)
   - Under "External providers," you can enable GitHub/Google login if desired

2. **Enable Git Gateway**
   - Still in Identity settings, go to "Services" → "Git Gateway"
   - Click "Enable Git Gateway"
   - This allows the CMS to commit changes back to GitHub

3. **Update CMS Configuration**

   Edit `admin/config.yml` (line 6):
   ```yaml
   # Change from:
   local_backend: true

   # To:
   local_backend: false
   ```

   Commit and push this change:
   ```bash
   git add admin/config.yml
   git commit -m "Enable production CMS configuration"
   git push
   ```

   Netlify will automatically redeploy (takes 1-2 minutes).

4. **Invite CMS Users**
   - In Netlify Identity tab, click "Invite users"
   - Enter email addresses of people who should access the CMS
   - They'll receive an invitation email
   - After accepting, they can access the CMS at: `https://yourdomain.com/admin/`

5. **Access Your CMS**
   - Go to `https://yourdomain.com/admin/`
   - Log in with Netlify Identity
   - You can now edit content, upload images, etc.
   - All changes will be committed to GitHub and trigger automatic redeployment

## Step 5: Final Testing Checklist

Before announcing your website, test everything:

- [ ] Visit every page (Home, About, Services, Projects, Products, Contact, Partner)
- [ ] Test language switcher (EN/SQ) on each page
- [ ] Submit test contact form (check email arrives)
- [ ] Submit test partner form (check email arrives)
- [ ] Verify Google Maps displays correctly
- [ ] Check all images load properly
- [ ] Test mobile responsiveness (resize browser or use phone)
- [ ] Login to CMS at `/admin/` and verify you can edit content
- [ ] Make a small CMS change and verify it appears on the site
- [ ] Test navigation menu and all links
- [ ] Verify certifications display correctly
- [ ] Check hero slider images load and transition

## Ongoing Maintenance

### Making Content Changes:
1. Go to `https://yourdomain.com/admin/`
2. Log in with Netlify Identity
3. Edit any content
4. Click "Publish"
5. Changes appear on site within 1-2 minutes

### Making Code Changes:
1. Edit files locally in your project
2. Commit changes: `git add . && git commit -m "Description of changes"`
3. Push to GitHub: `git push`
4. Netlify automatically rebuilds and deploys (1-2 minutes)

### Monitoring Form Submissions:
- Log into Formspree dashboard to see all submissions
- You'll also receive email notifications for each submission
- Upgrade to paid plan if you exceed 50 submissions/month

## Support Resources

- **Netlify Documentation:** https://docs.netlify.com
- **Formspree Documentation:** https://help.formspree.io
- **Decap CMS Documentation:** https://decapcms.org/docs/intro/

## Troubleshooting

**CMS login not working?**
- Ensure Netlify Identity is enabled
- Check that Git Gateway is enabled
- Verify you've been invited as a user

**Forms not submitting?**
- Check Formspree form IDs are correct in HTML
- Verify Formspree account is active
- Check browser console for errors

**Changes not appearing on site?**
- Check Netlify deploy log for errors
- Verify changes were committed to GitHub
- Clear browser cache and hard refresh (Cmd+Shift+R or Ctrl+Shift+F5)

**Google Maps not showing?**
- Verify the full iframe HTML was pasted in CMS
- Check browser console for errors
- Ensure Google Maps embed URL is publicly accessible

---

## Quick Reference

**Local Development:**
```bash
# Start web server (http://localhost:8080)
npx http-server -p 8080

# Start CMS proxy server (in new terminal)
npx netlify-cms-proxy-server
```

**Deploy Changes:**
```bash
git add .
git commit -m "Your change description"
git push
```

**Important URLs:**
- Production site: `https://yourdomain.com`
- CMS admin: `https://yourdomain.com/admin/`
- Netlify dashboard: https://app.netlify.com
- GitHub repository: https://github.com/YOUR_USERNAME/ejona-website
- Formspree dashboard: https://formspree.io/forms

---

**Need Help?** Refer to the documentation links above or contact your developer.
