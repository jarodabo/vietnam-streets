# Railway Deployment Guide - Vietnam Streets

**Deploy your site for FREE** to show the photographer demo

---

## 🚀 Quick Deployment (5 Minutes)

### Step 1: Create Railway Account

1. Go to **https://railway.app**
2. Click **"Start a New Project"**
3. Sign up with GitHub (recommended) or email
4. ✅ **No credit card required for free tier**

---

### Step 2: Deploy from Local Repository

#### Option A: Deploy via GitHub (Recommended)

**2.1 Create GitHub Repository**

1. Go to https://github.com/new
2. Name: `vietnam-streets` (or any name you prefer)
3. Keep it **Public** (required for free deployment)
4. **Don't** initialize with README (we already have files)
5. Click **"Create repository"**

**2.2 Push Your Code to GitHub**

Open Terminal and run these commands:

```bash
cd "/Users/jackross-cpgio/Vietnam Streets"

# Add GitHub as remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/vietnam-streets.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**2.3 Deploy on Railway**

1. Go to https://railway.app/new
2. Click **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub
4. Select `vietnam-streets` repository
5. Click **"Deploy Now"**
6. Wait 2-3 minutes for deployment

**2.4 Get Your Live URL**

1. In Railway dashboard, click **"Settings"**
2. Scroll to **"Domains"**
3. Click **"Generate Domain"**
4. Your site will be live at: `https://vietnam-streets-production.up.railway.app`

---

#### Option B: Deploy via Railway CLI (Alternative)

**2.1 Install Railway CLI**

```bash
npm install -g @railway/cli
```

Or with Homebrew:
```bash
brew install railway
```

**2.2 Login to Railway**

```bash
railway login
```

This opens a browser to authenticate.

**2.3 Deploy**

```bash
cd "/Users/jackross-cpgio/Vietnam Streets"
railway init
railway up
```

**2.4 Add Custom Domain**

```bash
railway domain
```

---

## 📊 Railway Free Tier Limits

✅ **What's FREE:**
- 500 hours/month (enough for full-time hosting)
- $5 of usage credit
- Unlimited projects
- Custom domains
- SSL certificates included
- No credit card required

⚠️ **Limitations:**
- Projects sleep after 7 days of inactivity
- 100GB bandwidth/month
- 1GB RAM per service

**Perfect for demos and small sites like Vietnam Streets!**

---

## ⚙️ Configuration Files (Already Created)

Your site is already configured for Railway with these files:

### `railway.json`
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "python3 -m http.server $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### `nixpacks.toml`
```toml
[phases.setup]
nixPkgs = ["python3"]

[start]
cmd = "python3 -m http.server $PORT"
```

### `Procfile`
```
web: python3 -m http.server $PORT
```

**These tell Railway:**
- Use Python 3
- Start a simple HTTP server
- Listen on Railway's assigned port
- Restart on failures

---

## 🧪 Testing Your Deployment

Once deployed, test these features:

### Homepage
- [ ] Visit your Railway URL
- [ ] Hero image and text loads
- [ ] Events section displays
- [ ] Instagram feed shows

### Event Registration
- [ ] Click any "Register" button
- [ ] Modal opens with event name
- [ ] Fill out form and submit
- [ ] Check email arrives at vietnamstreetscommunity@gmail.com
- [ ] Success message appears

### Navigation
- [ ] Test mobile menu (resize browser)
- [ ] Click through to story pages
- [ ] Visit events page
- [ ] All links work

---

## 🔧 Updating Your Live Site

After making changes locally:

**Via GitHub:**
```bash
cd "/Users/jackross-cpgio/Vietnam Streets"
git add .
git commit -m "Update: describe your changes"
git push origin main
```

Railway automatically redeploys when you push to GitHub! ✨

**Via Railway CLI:**
```bash
railway up
```

---

## 🌐 Custom Domain (Optional)

Want `vietnamstreets.com` instead of `*.railway.app`?

1. Buy domain from Namecheap, Google Domains, etc.
2. In Railway dashboard → Settings → Domains
3. Click "Custom Domain"
4. Enter your domain: `vietnamstreets.com`
5. Add CNAME record at your domain registrar:
   ```
   Type: CNAME
   Name: www
   Value: [railway-provided-value]
   ```

**Cost:** Only domain registration (~$12/year). Railway hosting stays free!

---

## 📧 Formspree Still Works!

Your event registration system works the same on Railway:
- Forms submit to `https://formspree.io/f/xwprrraw`
- Emails arrive at vietnamstreetscommunity@gmail.com
- No changes needed!

---

## 🐛 Troubleshooting

### Deployment Failed

**Check Railway logs:**
1. Railway dashboard → Deployments
2. Click failed deployment
3. View build logs

**Common fixes:**
- Make sure all files are committed to git
- Check that `railway.json` exists
- Verify Python is specified in `nixpacks.toml`

### Site Shows 404 or Blank Page

**Fix:**
1. Check Railway logs for errors
2. Verify `index.html` is in root directory
3. Ensure port is set correctly: `python3 -m http.server $PORT`

### Images Not Loading

**Paths issue:**
- Use relative paths: `assets/images/hero.jpg`
- Not absolute paths: `/assets/images/hero.jpg`
- Check case sensitivity (Railway is case-sensitive)

### Registration Forms Not Working

**CORS issue:**
- Formspree should work cross-origin
- If issues, check Formspree dashboard settings
- Verify form action URL is correct

---

## 💡 Alternative Free Hosting Options

If Railway doesn't work for you, try these:

### **Netlify** (Recommended Alternative)
- Drag & drop deployment
- Free SSL
- 100GB bandwidth/month
- https://netlify.com

**Deploy:**
1. Drag your `Vietnam Streets` folder to Netlify
2. Get instant URL
3. Done!

### **Vercel**
- GitHub integration
- Free SSL
- Great for static sites
- https://vercel.com

### **GitHub Pages**
- Free forever
- Works with public repos
- URL: `username.github.io/vietnam-streets`

---

## 📋 Pre-Deployment Checklist

Before showing to photographer:

- [ ] Hard refresh browser (Cmd+Shift+R)
- [ ] Test all registration buttons
- [ ] Verify Instagram feed loads
- [ ] Check mobile responsiveness
- [ ] Test form submission once
- [ ] Confirm email arrives
- [ ] Review all page content
- [ ] Fix any placeholder text

---

## 🎯 Deployment Steps Summary

**Quick Version:**

1. **Create Railway account** → https://railway.app
2. **Push to GitHub** → Create repo, push code
3. **Deploy on Railway** → Connect GitHub repo
4. **Generate domain** → Get live URL
5. **Test everything** → Especially registration forms
6. **Share URL** → Show photographer!

**Total time:** 5-10 minutes

---

## 🌟 What the Photographer Will See

**Live URL example:**
`https://vietnam-streets-production.up.railway.app`

**Features working:**
✅ Professional homepage with Vietnamese cultural branding
✅ Dynamic events calendar
✅ Live Instagram feed
✅ Working event registration forms
✅ Story pages with rich content
✅ Mobile-responsive design
✅ Smooth animations and interactions

---

## 📞 Support

**Railway Documentation:**
https://docs.railway.app

**Railway Discord:**
https://discord.gg/railway

**Formspree Support:**
https://help.formspree.io

---

## 🎉 You're Ready!

Your Vietnam Streets site is **fully configured** and ready to deploy for free on Railway.

**Next steps:**
1. Follow Step 1 & 2 above
2. Get your live URL
3. Demo to the photographer
4. Collect feedback
5. Make updates and push again

**The site will be live 24/7 at no cost!**

---

**Questions?** Check the troubleshooting section or Railway's excellent docs.

**Good luck with your demo!** 🚀📸
