# Vietnam Streets - Image Assets Guide

## 📁 Folder Structure

All images should be placed in the `assets/images/` directory with the following organized structure:

```
Vietnam Streets/
└── assets/
    └── images/
        ├── hero/           # Homepage hero images
        ├── stories/        # Story feature images
        ├── photographers/  # Photographer profiles & work
        ├── events/         # Cultural events photos
        ├── prints/         # Fine art prints
        ├── diaspora/       # Diaspora community images
        ├── store/          # Store/merchandise photos
        ├── learn/          # Educational content images
        └── general/        # Logos, icons, misc assets
```

---

## 🎨 Image Requirements & Recommendations

### General Guidelines
- **Format**: JPG for photos, PNG for graphics/logos, WebP for modern browsers
- **Quality**: High resolution but optimized (use TinyPNG or similar)
- **Max File Size**: 500KB per image (compressed)
- **Naming**: Use lowercase, hyphens, descriptive names (e.g., `street-vendor-hanoi.jpg`)

### Aspect Ratios by Section

| Section | Aspect Ratio | Recommended Size |
|---------|-------------|------------------|
| Hero Images | 16:9 | 1920x1080px |
| Story Cards | 16:10 | 1200x750px |
| Photographer Portraits | 4:5 | 800x1000px |
| Event Photos | 16:10 | 1200x750px |
| Print Products | 4:5 | 1000x1250px |
| Category Cards | 16:10 | 1200x750px |

---

## 📍 Where to Add Images

### 1. **Homepage Hero** (`assets/images/hero/`)

**Folder Path**: `Vietnam Streets/assets/images/hero/`

**Purpose**: Large, impactful hero image for the homepage

**Recommended Images**:
- Dramatic Vietnamese street scenes
- Cultural celebrations (Tết, festivals)
- Vibrant city life or peaceful countryside
- Black & white documentary style preferred

**Example Filenames**:
- `hero-saigon-streets.jpg`
- `hero-tet-celebration.jpg`
- `hero-hanoi-old-quarter.jpg`

**Code Reference** (index.html):
```html
<div class="hero-image">
    <img src="assets/images/hero/hero-saigon-streets.jpg" alt="Saigon Streets">
</div>
```

---

### 2. **Stories Section** (`assets/images/stories/`)

**Folder Path**: `Vietnam Streets/assets/images/stories/`

**Purpose**: Feature images for story cards on Stories page

**Recommended Images**:
- Personal narratives visuals
- Family history photos
- Cultural traditions
- Daily life documentation

**Example Filenames**:
- `story-family-reunion.jpg`
- `story-traditional-cooking.jpg`
- `story-grandmother-portrait.jpg`

**Code Reference** (pages/stories.html):
```html
<div class="story-image">
    <img src="../assets/images/stories/story-family-reunion.jpg" alt="Family Reunion">
</div>
```

---

### 3. **Photographers Section** (`assets/images/photographers/`)

**Folder Path**: `Vietnam Streets/assets/images/photographers/`

**Purpose**: Photographer profiles and featured work

**Recommended Images**:
- Professional headshots (portraits/)
- Featured photography work (work/)
- Behind-the-scenes photos

**Subfolders**:
```
photographers/
├── portraits/        # Photographer headshots
└── work/            # Their featured photography
```

**Example Filenames**:
- `portraits/minh-nguyen.jpg`
- `work/minh-nguyen-saigon-night.jpg`

**Code Reference** (pages/photographers.html):
```html
<div class="photographer-image">
    <img src="../assets/images/photographers/portraits/minh-nguyen.jpg" alt="Minh Nguyen">
</div>
```

---

### 4. **Cultural Events** (`assets/images/events/`)

**Folder Path**: `Vietnam Streets/assets/images/events/`

**Purpose**: Event promotion and documentation photos

**Recommended Images**:
- Event venue photos
- Past event highlights
- Performance shots
- Community gatherings

**Example Filenames**:
- `event-film-screening-2024.jpg`
- `event-lunar-new-year.jpg`
- `event-photography-workshop.jpg`

**Code Reference** (pages/events.html):
```html
<div class="event-image">
    <img src="../assets/images/events/event-film-screening-2024.jpg" alt="Film Screening">
</div>
```

---

### 5. **Fine Prints** (`assets/images/prints/`)

**Folder Path**: `Vietnam Streets/assets/images/prints/`

**Purpose**: High-quality print products for sale

**Recommended Images**:
- Professional photography prints
- Framed/mounted examples
- Product mockups

**Example Filenames**:
- `print-hanoi-street-vendor.jpg`
- `print-mekong-delta-sunset.jpg`
- `print-ao-dai-portrait.jpg`

**Code Reference** (pages/prints.html):
```html
<div class="print-image">
    <img src="../assets/images/prints/print-hanoi-street-vendor.jpg" alt="Hanoi Street Vendor Print">
</div>
```

---

### 6. **Diaspora Stories** (`assets/images/diaspora/`)

**Folder Path**: `Vietnam Streets/assets/images/diaspora/`

**Purpose**: Vietnamese diaspora community stories and experiences

**Recommended Images**:
- Little Saigon communities
- Cultural preservation abroad
- Cross-cultural experiences
- Family heritage photos

**Example Filenames**:
- `diaspora-little-saigon-festival.jpg`
- `diaspora-family-tradition.jpg`
- `diaspora-second-generation.jpg`

**Code Reference** (pages/diaspora.html):
```html
<div class="diaspora-image">
    <img src="../assets/images/diaspora/diaspora-little-saigon-festival.jpg" alt="Little Saigon Festival">
</div>
```

---

### 7. **Store/Merchandise** (`assets/images/store/`)

**Folder Path**: `Vietnam Streets/assets/images/store/`

**Purpose**: Product photos for merchandise and books

**Recommended Images**:
- Book covers
- Apparel mockups
- Accessory photos
- Product lifestyle shots

**Example Filenames**:
- `product-photobook-vol1.jpg`
- `product-tshirt-saigon.jpg`
- `product-poster-hanoi.jpg`

**Code Reference** (pages/store.html):
```html
<div class="product-image">
    <img src="../assets/images/store/product-photobook-vol1.jpg" alt="Photo Book Volume 1">
</div>
```

---

### 8. **Learn Section** (`assets/images/learn/`)

**Folder Path**: `Vietnam Streets/assets/images/learn/`

**Purpose**: Educational content visuals and cultural guides

**Recommended Images**:
- Traditional crafts
- Cultural ceremonies
- Historical landmarks
- Language/writing examples
- Food and cuisine

**Example Filenames**:
- `learn-water-puppets.jpg`
- `learn-traditional-dress.jpg`
- `learn-vietnamese-cuisine.jpg`

**Code Reference** (pages/learn.html):
```html
<div class="category-image">
    <img src="../assets/images/learn/learn-water-puppets.jpg" alt="Traditional Water Puppets">
</div>
```

---

### 9. **General Assets** (`assets/images/general/`)

**Folder Path**: `Vietnam Streets/assets/images/general/`

**Purpose**: Logos, icons, and miscellaneous site assets

**Recommended Files**:
- `logo.png` - Main site logo
- `logo-white.png` - White version for dark backgrounds
- `favicon.png` - Browser favicon (512x512px)
- `og-image.jpg` - Social media share image (1200x630px)

---

## 🔄 How to Replace Placeholder Images

### Step 1: Prepare Your Image
1. Resize to recommended dimensions
2. Compress for web (use TinyPNG.com or similar)
3. Rename with descriptive, lowercase filename

### Step 2: Add to Correct Folder
Drag and drop your image into the appropriate folder:
```
Vietnam Streets/assets/images/[section-name]/your-image.jpg
```

### Step 3: Update HTML
Find the image placeholder in the HTML file and replace:

**Before**:
```html
<div class="image-placeholder" data-caption="Story thumbnail"></div>
```

**After**:
```html
<img src="../assets/images/stories/your-image.jpg" alt="Descriptive alt text">
```

### Step 4: Test
1. Refresh your browser (Cmd+Shift+R / Ctrl+Shift+R)
2. Verify image loads correctly
3. Check responsive behavior on mobile

---

## 📋 Quick Reference Checklist

When adding images, ensure:
- [ ] Image is in correct folder
- [ ] File is properly compressed (< 500KB)
- [ ] Filename is lowercase with hyphens
- [ ] Image meets recommended aspect ratio
- [ ] Alt text is descriptive and meaningful
- [ ] Image displays correctly on mobile
- [ ] Page loads quickly with new image

---

## 🎯 Priority Image Recommendations

### Immediate Impact (Add These First):
1. **Homepage Hero** - Sets the tone for entire site
2. **Featured Stories** - 3-5 compelling story images
3. **Site Logo** - Brand identity in navigation
4. **About/Learn Categories** - Visual category identifiers

### Secondary Priority:
1. Photographer profiles
2. Event photos
3. Print products
4. Diaspora stories

### Nice to Have:
1. Store merchandise
2. Additional story archives
3. Background textures
4. Decorative elements

---

## 💡 Content Suggestions

### Photography Style Guidelines:
- **Black & white preferred** for documentary/storytelling
- **Rich colors** for cultural celebrations
- **Natural lighting** for authenticity
- **Candid moments** over posed shots
- **Street photography aesthetic** throughout

### Subject Matter:
- Vietnamese daily life
- Street vendors and markets
- Traditional ceremonies
- Family gatherings
- Cultural heritage sites
- Food preparation and dining
- Urban and rural landscapes
- Intergenerational stories

---

## 🛠️ Tools & Resources

### Image Optimization:
- **TinyPNG** - https://tinypng.com (compress JPG/PNG)
- **Squoosh** - https://squoosh.app (compress/convert formats)
- **ImageOptim** - https://imageoptim.com (Mac app)

### Free Stock Photos (Vietnamese Culture):
- **Unsplash** - Search "Vietnam"
- **Pexels** - Vietnamese street photography
- **Pixabay** - Cultural images

### Image Editing:
- **Photopea** - https://photopea.com (free Photoshop alternative)
- **GIMP** - Free desktop editor
- **Canva** - Easy mockup creation

---

## 📞 Need Help?

If you need assistance:
1. Check that images are in correct folders
2. Verify file paths in HTML are correct
3. Clear browser cache and hard refresh
4. Check browser console for errors (F12)

---

**Last Updated**: October 2025
**Version**: 1.0
