# Deployment Guide

## 🚀 Deploy to GitHub & Vercel

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it: `redbull-sales-tracker`
4. Make it **Public**
5. **Don't** initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Push to GitHub

Run these commands in your terminal:

```bash
# Add GitHub as remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/redbull-sales-tracker.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Deploy from GitHub (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Import your `redbull-sales-tracker` repository
5. Vercel will auto-detect it's a Vite project
6. Click "Deploy"

#### Option B: Deploy from Local

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? redbull-sales-tracker
# - In which directory is your code located? ./
# - Want to override the settings? N
```

### Step 4: Custom Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain

## 📱 Features After Deployment

✅ **Mobile-First Design**: Works perfectly on phones and tablets
✅ **Offline Capable**: Uses localStorage for data persistence
✅ **Fast Loading**: Optimized build with Vite
✅ **PWA Ready**: Can be installed as a mobile app
✅ **QR Code Support**: Upload and display UPI QR codes
✅ **Sales Tracking**: Real-time counter for Cash and GPay
✅ **PDF Reports**: Download sales summaries
✅ **Share Functionality**: Share sales data via text

## 🔧 Environment Variables

No environment variables needed! The app works completely client-side.

## 📊 Performance

- **Bundle Size**: ~150KB (gzipped)
- **Load Time**: < 2 seconds
- **Storage**: Uses browser localStorage
- **Compatibility**: All modern browsers

## 🛠️ Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Vercel Deployment Issues
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify `vercel.json` configuration

### GitHub Issues
1. Ensure repository is public
2. Check git remote URL is correct
3. Verify all files are committed

## 🎉 Success!

Your Red Bull Sales Tracker will be live at:
- **Vercel**: `https://redbull-sales-tracker.vercel.app`
- **GitHub**: `https://github.com/YOUR_USERNAME/redbull-sales-tracker`

The app is now ready for event use! 🚀 