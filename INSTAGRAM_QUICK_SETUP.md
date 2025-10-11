# Instagram Feed - Quick Setup Instructions

## Your website is ready for Instagram! Here's how to connect it:

---

## Current Status: ✅ Code Updated

The website now supports 3 Instagram widget services:
- **EmbedSocial** (Recommended)
- **Behold**
- **SnapWidget**

Currently showing: **Demo content** (until you connect Instagram)

---

## 3-Minute Setup with EmbedSocial (Recommended)

### Step 1: Create EmbedSocial Account (2 minutes)

1. Go to https://embedsocial.com
2. Click "Start Free Trial"
3. Sign up with email or Google
4. Choose "Instagram" as source

### Step 2: Connect Instagram (1 minute)

1. Click "Add Source" → Instagram
2. Login with your Instagram account
3. Authorize EmbedSocial
4. Done!

### Step 3: Create Widget (1 minute)

1. Click "Create Widget"
2. Choose "Grid" template
3. Settings:
   - Posts: 9
   - Columns: 3
   - Show captions: Yes
4. Click "Save"

### Step 4: Get Your Widget ID

1. Click "Get Widget"
2. Look for the code that says: `data-ref="abc123defg"`
3. Copy just the ID part: `abc123defg`

### Step 5: Update Your Website (30 seconds)

1. Open `/Users/jackross-cpgio/Vietnam Streets/js/main.js`
2. Find line 200 (around line 200)
3. Replace `YOUR_WIDGET_ID_HERE` with your actual widget ID

**Before:**
```javascript
const WIDGET_ID = 'YOUR_WIDGET_ID_HERE';
```

**After:**
```javascript
const WIDGET_ID = 'abc123defg'; // Your actual ID from EmbedSocial
```

4. Save the file
5. Refresh your website at http://localhost:8000

**That's it! Your Instagram feed is now live! 🎉**

---

## Alternative: Quick Free Option with SnapWidget

### If you want something even faster (no account needed):

1. Go to https://snapwidget.com/instagram-widget
2. Enter your Instagram username
3. Choose "Grid" layout
4. Set 9 photos
5. Click "Get Widget"
6. Copy the number from the URL (e.g., `123456`)
7. Update `js/main.js`:

```javascript
const WIDGET_SERVICE = 'snapwidget'; // Change this
const WIDGET_ID = '123456'; // Your SnapWidget ID
```

---

## Changing Widget Service

In `js/main.js` line 199, you can change the service:

```javascript
const WIDGET_SERVICE = 'embedsocial'; // or 'behold' or 'snapwidget'
```

**Options:**
- `'embedsocial'` - Best quality, free plan available
- `'behold'` - Clean design, $9/month
- `'snapwidget'` - 100% free, basic features
- `'demo'` - Show placeholder content

---

## Troubleshooting

### Feed Not Showing

**Check:**
1. Widget ID is correct (no spaces, exact match)
2. Instagram account is public
3. You have posts on Instagram
4. Browser console for errors (F12)

### Still Showing Demo Content

**Verify:**
1. `WIDGET_ID` is not `'YOUR_WIDGET_ID_HERE'`
2. `WIDGET_SERVICE` matches your chosen service
3. File is saved
4. Browser is refreshed (Cmd+Shift+R)

### Widget Looks Broken

**Try:**
1. Clear browser cache
2. Check that Instagram account is public
3. Verify widget is active in dashboard
4. Check browser console for script errors

---

## Testing Checklist

After updating the widget ID:

- [ ] Open http://localhost:8000
- [ ] Scroll to "Community Gallery" section
- [ ] Verify Instagram posts are loading
- [ ] Click on a post (should open Instagram)
- [ ] Test on mobile (resize browser)
- [ ] Check that images load properly

---

## What You'll See

### Before (Demo Content):
- Placeholder images with gradients
- Generic Vietnamese culture captions
- Note about Instagram integration

### After (Real Instagram):
- Your actual Instagram posts
- Real captions and engagement counts
- Live updates when you post new content
- Clickable posts that link to Instagram

---

## Next Steps After Setup

1. **Post regularly** - Widget auto-updates
2. **Use hashtags** - #vietnamstreets #vietnameseculture
3. **Engage with followers** - Builds community
4. **Monitor analytics** - See which posts perform best
5. **Curate your feed** - Archive posts you don't want shown

---

## Pro Tips

### For Best Results:

1. **Post Quality Content**
   - High-resolution images
   - Consistent visual style
   - Authentic cultural moments

2. **Maintain Feed Aesthetics**
   - Mix of close-ups and wide shots
   - Variety of subjects
   - Color coordination

3. **Write Good Captions**
   - Tell stories
   - Add context
   - Include calls-to-action

4. **Use Relevant Hashtags**
   - #vietnamstreets (your brand)
   - #vietnameseculture
   - #culturalheritage
   - #vietnamesecommunity
   - Location tags

5. **Post Consistently**
   - 3-5 times per week
   - Best times: evenings and weekends
   - Keep feed active and fresh

---

## Current Configuration

**File:** `js/main.js`
**Lines:** 193-268
**Status:** ✅ Ready for widget ID

**Default Settings:**
- Service: EmbedSocial
- Widget ID: Needs to be added
- Fallback: Demo content

---

## Need Help?

### If you get stuck:

1. **Check the full guide:** `INSTAGRAM_INTEGRATION_GUIDE.md`
2. **Review widget dashboard:** Each service has help docs
3. **Contact widget support:**
   - EmbedSocial: support@embedsocial.com
   - Behold: hello@behold.so
   - SnapWidget: support form on site

---

## Quick Reference

### File to Edit:
```
/Users/jackross-cpgio/Vietnam Streets/js/main.js
```

### Lines to Change:
```javascript
Line 199: const WIDGET_SERVICE = 'embedsocial';
Line 200: const WIDGET_ID = 'YOUR_WIDGET_ID_HERE'; // ← Change this
```

### After Editing:
1. Save file
2. Refresh browser
3. Scroll to Instagram section
4. Verify feed loads

---

**Ready to connect? Follow the 3-Minute Setup above and you'll have Instagram live in no time!**

**Don't have Instagram yet?** The demo content looks great until you're ready to set it up.
