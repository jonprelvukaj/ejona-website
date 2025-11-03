# EJONA Website - Content Management System Guide

## 🎉 Visual Editor Installed!

You now have **Decap CMS** (formerly Netlify CMS) installed on your website. This gives you a visual, user-friendly interface to edit your website content without touching code!

---

## 🚀 Quick Start

### **Start the CMS (Local Development)**

```bash
cd /Users/jolle/ejona-website/
npm start
```

This will:
1. Start a local web server on `http://localhost:8080`
2. Open your browser to see the website
3. Access the CMS at: **`http://localhost:8080/admin`**

---

## 📝 What You Can Edit

### **1. Home Page Content**
- Hero title (English & Albanian)
- Hero subtitle (English & Albanian)
- Statistics (50+ engineers, 500+ projects, etc.)

### **2. Contact Information**
- Phone number
- Email addresses
- Physical address (both languages)

### **3. About Page**
- Company story
- Mission statement
- Vision statement
- All in both English and Albanian

### **4. Services**
- Add/edit/delete services
- Service names and descriptions
- Feature lists
- Available in both languages

### **5. Projects**
- Add new projects with photos
- Edit project names and descriptions
- Categorize by type (elevators, HVAC, waterworks)

### **6. Products & Brands**
- Add partner brands
- Upload brand logos
- Add descriptions

---

## 🎯 How to Use the CMS

### **Step 1: Access the Admin Panel**

```bash
# Start the server
cd /Users/jolle/ejona-website/
npm start
```

Then open your browser to:
```
http://localhost:8080/admin
```

### **Step 2: Navigate the Interface**

You'll see a clean interface with:
- **Collections** (left sidebar) - Different content types
- **Content list** (middle) - Existing content items
- **Editor** (right) - Edit form when you click an item

### **Step 3: Edit Content**

1. Click on a collection (e.g., "Pages")
2. Click on the item you want to edit (e.g., "Home Page")
3. Make your changes in the form
4. Click **"Save"** button at the top
5. Changes are saved to JSON files in `/content/` folder

### **Step 4: Upload Images**

1. Click on an image field
2. Click "Choose an image"
3. Either:
   - Upload a new image
   - Select from existing images
4. Image is automatically saved to `/images/` folder

---

## 📁 Where Content is Stored

Your editable content is stored in `/content/` folder as JSON files:

```
content/
├── home.json          # Home page content
├── contact.json       # Contact information
├── about.json         # About page content
├── services/          # Individual service files
├── projects/          # Individual project files
└── products/          # Individual product files
```

**These files control what appears on your website!**

---

## 🔄 Workflow

### **Local Editing (What you just set up)**
1. Run `npm start`
2. Edit content at `/admin`
3. Save changes (writes to JSON files)
4. **Manual step**: Update HTML to read from JSON files (see below)

### **Production Workflow (When you deploy)**
1. Deploy to Netlify, Vercel, or your hosting
2. Set up Git backend in `/admin/config.yml`
3. Edit live at `yourdomain.com/admin`
4. Changes saved to your Git repository

---

## 🛠️ Next Steps: Connect Content to Your Website

Right now, the CMS saves content to JSON files, but your HTML pages don't read from them yet. Here are your options:

### **Option A: Manual Updates (Simplest)**
- Edit content in CMS
- Copy-paste from JSON to HTML when needed
- Good for: Infrequent updates

### **Option B: Add JavaScript to Load JSON (Better)**
I can help you add JavaScript that:
- Reads content from JSON files
- Updates HTML dynamically
- No page refresh needed

### **Option C: Static Site Generator (Best)**
Convert to a framework that rebuilds pages automatically:
- Hugo
- Jekyll
- Eleventy
- Builds HTML from JSON content

---

## 📋 Common Tasks

### **Update Phone Number**
1. Go to `/admin`
2. Click "Pages" → "Contact Information"
3. Edit "Phone Number" field
4. Click Save
5. **Manual**: Copy the new number to HTML footer sections

### **Add a New Project**
1. Go to `/admin`
2. Click "Projects"
3. Click "New Projects"
4. Fill in:
   - Project name (both languages)
   - Category (elevators/hvac/waterworks)
   - Upload project image
   - Add description
5. Click "Save"
6. **Manual**: Add to `projects.html` gallery

### **Update Statistics**
1. Go to `/admin`
2. Click "Pages" → "Home Page"
3. Scroll to "Statistics"
4. Update numbers:
   - Engineers Count
   - Projects Count
   - Years of Excellence
5. Click "Save"
6. **Manual**: Update numbers in `index.html`

---

## 🚨 Important Notes

### **The CMS is Currently in "Local Mode"**
- Only works on your computer
- Changes saved to local files
- Need to upload changes to your website manually

### **To Go Live with the CMS:**

1. **Deploy to Netlify (Easiest)**
   ```bash
   # Push your site to GitHub first
   git init
   git add .
   git commit -m "Initial commit with CMS"
   git remote add origin YOUR_GITHUB_REPO
   git push -u origin main

   # Then connect to Netlify
   # Visit: netlify.com
   # Click "New site from Git"
   # Select your repository
   ```

2. **Enable Git Gateway**
   - In Netlify dashboard
   - Go to Settings → Identity
   - Enable Git Gateway
   - Now anyone can edit at `yoursite.com/admin`

---

## 🎨 Customizing the CMS

Edit `/admin/config.yml` to:
- Add new content fields
- Change field types
- Add validations
- Customize the interface

Example:
```yaml
- {label: "Company Name", name: "company", widget: "string", required: true}
```

Widget types available:
- `string` - Short text
- `text` - Long text
- `markdown` - Rich text editor
- `number` - Numbers
- `image` - Image upload
- `select` - Dropdown
- `list` - Repeatable items
- `object` - Grouped fields

---

## 🔧 Troubleshooting

### **CMS won't load**
```bash
# Check if server is running
npm start

# If port 8080 is in use, try:
http-server -p 8081
```

### **Changes not showing on website**
- CMS saves to JSON files
- HTML pages need to be updated manually
- Or add JavaScript to load JSON dynamically

### **Can't upload images**
- Check `/images/` folder exists
- Check file permissions
- Try smaller image files

---

## 💡 Recommendations

### **For Now:**
1. Use the CMS to organize your content
2. Manually update HTML when you edit something
3. Good for getting familiar with the system

### **Next Phase (I can help with this):**
1. Add JavaScript to load JSON content dynamically
2. Deploy to Netlify for live CMS access
3. Set up authentication for team members

### **Long Term:**
Consider converting to a static site generator (Hugo, Jekyll, Eleventy) that automatically rebuilds pages from CMS content.

---

## 📞 Need Help?

**I can help you:**
1. ✅ Add JavaScript to auto-load JSON content
2. ✅ Deploy to Netlify with live CMS
3. ✅ Add more content fields
4. ✅ Set up user authentication
5. ✅ Convert to a static site generator

**Would you like me to add JavaScript to automatically load the content from JSON files into your HTML pages?** This would make the CMS fully functional without manual updates.

---

## 🎯 Summary

✅ **CMS Installed** - Decap CMS is set up
✅ **Content Structure** - JSON files in `/content/` folder
✅ **Admin Panel** - Access at `/admin` when server running
✅ **Image Uploads** - Automatic to `/images/` folder
✅ **Bilingual Support** - English and Albanian fields

**Next Step:** Run `npm start` and visit `http://localhost:8080/admin` to try it out!

---

Last Updated: 2025-01-02
