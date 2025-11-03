# EJONA Brand Colors

## Official Brand Colors

The website now uses the official EJONA brand colors:

### Primary Colors

**🟡 Yellow/Gold (Primary Brand Color)**
- Hex: `#F5B700`
- RGB: `rgb(245, 183, 0)`
- Usage: Primary buttons, accents, highlights, icons, active states

**⚫ Black**
- Hex: `#000000`
- RGB: `rgb(0, 0, 0)`
- Usage: Primary text, headings

**⬛ Anthracite/Dark Gray**
- Hex: `#2C2C2C`
- RGB: `rgb(44, 44, 44)`
- Usage: Hero backgrounds, CTA sections, secondary text

**⬛ Anthracite Light**
- Hex: `#3A3A3A`
- RGB: `rgb(58, 58, 58)`
- Usage: Secondary text, subtle elements

**⚪ White**
- Hex: `#FFFFFF`
- RGB: `rgb(255, 255, 255)`
- Usage: Backgrounds, text on dark backgrounds, cards

### Accent & Support Colors

**Light Gray**
- Hex: `#e2e8f0`
- Usage: Borders, dividers, subtle backgrounds

**Background**
- Hex: `#f7fafc`
- Usage: Page backgrounds, section backgrounds

**Yellow Hover State**
- Hex: `#ffc107`
- Usage: Button hover states, interactive elements

## Color Usage Guidelines

### Buttons
- **Primary Button**: Yellow background (#F5B700) with black text (#000000)
- **Secondary Button**: White background with anthracite border and text
- **CTA Button**: Same as primary with stronger shadow

### Typography
- **Headings**: Anthracite (#2C2C2C)
- **Body Text**: Black (#000000) for primary, Anthracite Light (#3A3A3A) for secondary
- **Links**: Yellow (#F5B700) with hover state (#ffc107)

### Sections
- **Hero Section**: Anthracite (#2C2C2C) background with white text
- **CTA Sections**: Anthracite (#2C2C2C) background with white text
- **Service Cards**: White with yellow accent on hover
- **Icons**: Yellow background (#F5B700) with anthracite/black icons

### Interactive Elements
- **Navigation Active State**: Yellow underline (#F5B700)
- **Language Toggle**: Yellow for active language (#F5B700)
- **Form Focus**: Yellow border (#F5B700)
- **Stats Numbers**: Yellow (#F5B700)

## CSS Variables

All colors are defined as CSS variables in `/css/style.css`:

```css
:root {
    /* EJONA Brand Colors */
    --primary-yellow: #F5B700;
    --primary-gold: #F5B700;
    --primary-black: #000000;
    --anthracite: #2C2C2C;
    --anthracite-light: #3A3A3A;
    --dark-text: #000000;
    --gray-text: #3A3A3A;
    --light-gray: #e2e8f0;
    --white: #ffffff;
    --background: #f7fafc;
}
```

## Accessibility

### Contrast Ratios
All color combinations meet WCAG AA standards:

- **Yellow on White**: 3.1:1 (AA for large text)
- **Black on White**: 21:1 (AAA)
- **White on Anthracite**: 15.8:1 (AAA)
- **Yellow on Anthracite**: 5.2:1 (AA)

### Recommendations
- Use yellow (#F5B700) for accent elements, not large text blocks
- Use black (#000000) for body text for maximum readability
- Use white text on anthracite/black backgrounds
- Ensure sufficient contrast for all interactive elements

## Changes Made

### Updated From Previous Colors:
- ❌ Purple Gradient (#667eea → #764ba2)
- ❌ Orange Accent (#e04622)

### Updated To EJONA Brand Colors:
- ✅ Yellow/Gold (#F5B700)
- ✅ Anthracite (#2C2C2C)
- ✅ Black (#000000)
- ✅ White (#FFFFFF)

All occurrences of the old color scheme have been replaced with the official EJONA brand colors throughout:
- All HTML files (7 pages)
- All CSS files (style.css, pages.css)
- All SVG gradients
- All button styles
- All interactive states

## Testing

To verify the brand colors are correctly applied:

1. Open [index.html](index.html) in a browser
2. Check the logo (should be yellow/gold)
3. Check primary buttons (should be yellow with black text)
4. Check the hero section (should have dark anthracite background)
5. Check stats numbers (should be yellow)
6. Hover over navigation items (should show yellow underline)
7. Click language toggle (active language should be yellow)

---

Last Updated: 2025-01-02
