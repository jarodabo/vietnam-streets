# Temporary Logo Solution

For now, we're using a text-based logo in the header.

## Current Implementation
The logo is styled with CSS in `css/styles.css`

## To Create Proper Logo Files:

### Option 1: Quick Canva Logo (15 minutes)
1. Go to https://canva.com (free account)
2. Search for "Logo" template (500x500px)
3. Type "Vietnam Streets"
4. Choose Vietnamese-inspired font or clean modern font
5. Add optional graphic element (camera, street icon, etc.)
6. Download as PNG (transparent background)
7. Save as `logo.png` in this folder
8. Change background to black, download as `logo-white.png`

### Option 2: Simple SVG Logo (Copy this code)

Save this as `logo.svg` in this folder:

```svg
<svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="40" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="600" fill="#d73027">
    Vietnam Streets
  </text>
</svg>
```

Then update index.html to use it:
```html
<div class="logo">
    <a href="/" class="logo-link">
        <img src="assets/images/general/logo.svg" alt="Vietnam Streets" height="40">
    </a>
</div>
```

### Option 3: Hire Designer on Fiverr
Budget: $20-50
Turnaround: 1-3 days
Deliverables requested:
- logo.png (color, transparent)
- logo-white.png (white, transparent)
- favicon.png (512x512px)
- Vector files (.svg, .ai)

## Favicon Creation

Once you have a logo, create favicon:
1. Go to https://favicon.io/favicon-converter/
2. Upload your logo.png
3. Download favicon package
4. Save the 512x512 version as `favicon.png`
5. Update index.html:

```html
<link rel="icon" type="image/png" sizes="512x512" href="assets/images/general/favicon.png">
<link rel="icon" type="image/png" sizes="192x192" href="assets/images/general/favicon.png">
<link rel="icon" type="image/png" sizes="32x32" href="assets/images/general/favicon.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/images/general/favicon.png">
```
