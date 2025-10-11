# Instagram Feed Integration Guide

## Overview

There are several ways to embed an Instagram feed on your website. I'll provide 3 options from easiest to most customizable.

---

## Option 1: EmbedSocial (Recommended - Easiest)

**Best for:** Quick setup, beautiful design, auto-updates

### Pricing:
- **Free Plan:** Up to 150 posts, basic features
- **Pro Plan:** $29/month - Unlimited posts, custom styling, analytics

### Setup Steps:

#### 1. Create Account
1. Go to https://embedsocial.com
2. Click "Start Free Trial"
3. Sign up with email or Google account
4. Choose "Instagram" as your source

#### 2. Connect Instagram
1. Click "Add Source" → Instagram
2. Choose connection method:
   - **Option A: Instagram Account** (recommended)
     - Login with your Instagram credentials
     - Authorize EmbedSocial
   - **Option B: Hashtag Feed**
     - Enter hashtag (e.g., #vietnamstreets)
     - No login needed

#### 3. Create Feed Widget
1. Click "Create Widget"
2. Choose template:
   - **Grid** (like Instagram)
   - **Carousel** (slideshow)
   - **Wall** (masonry layout)
   - **Slider** (horizontal scroll)
3. Customize:
   - Number of posts to show
   - Columns (2, 3, or 4)
   - Spacing between posts
   - Show/hide captions
   - Show/hide likes/comments

#### 4. Get Embed Code
1. Click "Get Widget"
2. Copy the embed code
3. Choose "Automatic" (easiest) or "Manual"

Example code:
```html
<script src="https://embedsocial.com/cdn/ht.js" id="EmbedSocialHashtagScript"></script>
<div class="embedsocial-hashtag" data-ref="abc123"></div>
```

#### 5. Add to Your Website
Replace the demo content in `js/main.js` (line 198) with:

```javascript
setupInstagramFeed() {
    const instagramContainer = document.getElementById('instagram-feed');
    if (!instagramContainer) return;

    // Add EmbedSocial widget
    instagramContainer.innerHTML = `
        <script src="https://embedsocial.com/cdn/ht.js" id="EmbedSocialHashtagScript"></script>
        <div class="embedsocial-hashtag" data-ref="YOUR-WIDGET-REF"></div>
    `;

    // Load the script
    const script = document.createElement('script');
    script.src = 'https://embedsocial.com/cdn/ht.js';
    script.id = 'EmbedSocialHashtagScript';
    document.head.appendChild(script);
}
```

---

## Option 2: Behold (Simple, Clean)

**Best for:** Minimal design, easy management

### Pricing:
- **Free Plan:** 1 feed, watermark
- **Starter:** $9/month - Remove watermark, 5 feeds

### Setup Steps:

#### 1. Create Account
1. Go to https://behold.so
2. Sign up (email or Google)
3. Connect Instagram account

#### 2. Create Feed
1. Click "New Feed"
2. Choose source:
   - Your Instagram account
   - Specific hashtag
   - Tagged posts
3. Name your feed

#### 3. Customize Design
1. Choose layout (Grid or Carousel)
2. Set number of posts
3. Customize colors and spacing
4. Mobile responsiveness settings

#### 4. Get Embed Code
1. Click "Get Embed Code"
2. Copy the code snippet

Example:
```html
<figure data-behold-id="YOUR-FEED-ID"></figure>
<script src="https://w.behold.so/widget.js" type="module"></script>
```

#### 5. Add to Website
```javascript
setupInstagramFeed() {
    const instagramContainer = document.getElementById('instagram-feed');
    if (!instagramContainer) return;

    instagramContainer.innerHTML = `
        <figure data-behold-id="YOUR-FEED-ID"></figure>
    `;

    const script = document.createElement('script');
    script.src = 'https://w.behold.so/widget.js';
    script.type = 'module';
    document.head.appendChild(script);
}
```

---

## Option 3: SnapWidget (Free Option)

**Best for:** Completely free, basic needs

### Pricing:
- **100% Free** (with small branding)

### Setup Steps:

#### 1. Create Widget
1. Go to https://snapwidget.com/instagram-widget
2. No account needed for basic widget
3. Choose widget type:
   - Grid
   - Board
   - Scrolling
   - Slideshow

#### 2. Configure Settings
1. Enter Instagram username
2. Choose layout (Grid recommended)
3. Set number of photos
4. Choose photo size
5. Select theme (Light/Dark)

#### 3. Get Code
1. Click "Get Widget"
2. Copy the iframe code

Example:
```html
<iframe src="https://snapwidget.com/embed/123456"
        class="snapwidget-widget"
        allowtransparency="true"
        frameborder="0"
        scrolling="no"
        style="border:none; overflow:hidden; width:100%; ">
</iframe>
```

#### 4. Add to Website
```javascript
setupInstagramFeed() {
    const instagramContainer = document.getElementById('instagram-feed');
    if (!instagramContainer) return;

    instagramContainer.innerHTML = `
        <iframe src="https://snapwidget.com/embed/YOUR-WIDGET-ID"
                class="snapwidget-widget"
                allowtransparency="true"
                frameborder="0"
                scrolling="no"
                style="border:none; overflow:hidden; width:100%; height:600px;">
        </iframe>
    `;
}
```

---

## Option 4: Manual Instagram Embed (Individual Posts)

**Best for:** Highlighting specific posts

### Setup Steps:

#### 1. Get Instagram Post Embed Code
1. Go to the Instagram post on desktop
2. Click "..." (three dots)
3. Click "Embed"
4. Copy the embed code
5. Paste into your HTML

Example:
```html
<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/ABC123/">
    <!-- Instagram post content -->
</blockquote>
<script async src="//www.instagram.com/embed.js"></script>
```

---

## Comparison Table

| Service | Price | Pros | Cons |
|---------|-------|------|------|
| **EmbedSocial** | Free - $29/mo | Beautiful, customizable, analytics | Watermark on free plan |
| **Behold** | $9/mo | Simple, clean, affordable | Limited free plan |
| **SnapWidget** | Free | Completely free | Basic features, small branding |
| **Manual Embed** | Free | Official Instagram | Manual updates needed |

---

## My Recommendation

**Start with EmbedSocial Free Plan:**

**Why:**
1. Beautiful, professional design
2. Automatic updates (posts appear as you post)
3. Customizable layout
4. Free plan is generous (150 posts)
5. Easy to upgrade later
6. Great analytics

**If you don't have Instagram yet:**
- Set up Instagram account first (@vietnamstreets)
- Post 5-10 images
- Then connect with EmbedSocial

---

## Implementation for Vietnam Streets

### Current Code (Demo Content)

Located in `js/main.js` lines 193-272.

### Replace With EmbedSocial

```javascript
setupInstagramFeed() {
    const instagramContainer = document.getElementById('instagram-feed');
    if (!instagramContainer) return;

    // Check if we have a widget ID configured
    const EMBEDSOCIAL_WIDGET_ID = 'YOUR_WIDGET_ID_HERE'; // Replace this

    if (EMBEDSOCIAL_WIDGET_ID === 'YOUR_WIDGET_ID_HERE') {
        // No widget configured yet, show demo content
        this.loadInstagramDemo(instagramContainer);
        return;
    }

    // Load real Instagram feed
    instagramContainer.innerHTML = `
        <div class="embedsocial-hashtag" data-ref="${EMBEDSOCIAL_WIDGET_ID}"></div>
    `;

    // Load EmbedSocial script
    if (!document.getElementById('EmbedSocialHashtagScript')) {
        const script = document.createElement('script');
        script.src = 'https://embedsocial.com/cdn/ht.js';
        script.id = 'EmbedSocialHashtagScript';
        document.body.appendChild(script);
    }
}
```

---

## Step-by-Step Implementation

### Phase 1: Set Up Instagram Account (If Not Done)

1. **Create Instagram Account**
   - Username: @vietnamstreets (if available)
   - Bio: "Preserving Vietnamese Culture Through Lens & Story 📸"
   - Link: vietnamstreets.com (when live)

2. **Post Initial Content**
   - 5-10 posts minimum
   - Use content from your stories
   - Use hashtags: #vietnamstreets #vietnameseculture #culturalheritage

### Phase 2: Choose and Set Up Widget Service

**Recommended: EmbedSocial**

1. Sign up at https://embedsocial.com
2. Connect Instagram account
3. Create widget (Grid layout, 9 posts, 3 columns)
4. Get widget reference ID

### Phase 3: Update Website Code

1. Get your widget ID from EmbedSocial
2. Open `js/main.js`
3. Find the `setupInstagramFeed()` function (line 193)
4. Replace with the code I'll provide

### Phase 4: Test

1. Refresh your website
2. Scroll to Instagram section
3. Verify posts are loading
4. Check mobile responsiveness
5. Test clicking on posts

---

## Styling Tips

### Make Instagram Feed Match Your Design

Add to `css/styles.css`:

```css
/* Instagram Feed Customization */
#instagram-feed {
    padding: 60px 0;
}

/* EmbedSocial custom styling */
.embedsocial-hashtag {
    max-width: 1200px;
    margin: 0 auto;
}

/* Ensure images maintain aspect ratio */
.embedsocial-hashtag img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

/* Remove any default widget branding (if using pro plan) */
.embedsocial-branding {
    display: none !important;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    #instagram-feed {
        padding: 40px 20px;
    }
}
```

---

## Troubleshooting

### Feed Not Loading

**Check:**
1. Widget ID is correct
2. Instagram account is public
3. Posts exist on Instagram
4. Script is loading (check browser console)

### Images Not Showing

**Fix:**
1. Clear browser cache
2. Check Instagram account privacy settings
3. Verify widget is active in dashboard

### Slow Loading

**Solutions:**
1. Reduce number of posts (6-9 is optimal)
2. Enable lazy loading in widget settings
3. Use CDN-hosted widget scripts

---

## Alternative: Hashtag Feed

If you want to aggregate posts from community:

1. Create hashtag: #vietnamstreets
2. Encourage community to use it
3. Create widget based on hashtag instead of account
4. Curate/moderate posts from dashboard

**Benefits:**
- Community engagement
- User-generated content
- Broader reach

---

## Next Steps

1. **Decide which option** (EmbedSocial recommended)
2. **Create account** on chosen platform
3. **Connect Instagram** (create account if needed)
4. **Get widget code**
5. **I'll update the code** for you
6. **Test and launch**

---

## Quick Start (5 Minutes)

**If you have Instagram already:**

1. Go to https://embedsocial.com
2. Sign up
3. Connect Instagram
4. Create widget (Grid, 9 posts)
5. Copy widget ID
6. Give me the ID and I'll update the code

**If you don't have Instagram:**

1. Create Instagram account
2. Post 5-10 images
3. Then follow steps above

---

**Ready to set this up? Which option would you like to use?**

- **Option A:** Set up EmbedSocial now (recommended)
- **Option B:** Use SnapWidget (free, quick)
- **Option C:** Manual embed of specific posts
- **Option D:** Wait until Instagram account is ready

Let me know and I'll help you implement it!
