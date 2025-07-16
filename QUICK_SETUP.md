# Quick Vercel Setup Guide

## 🚀 Your website is deployed at: https://dynamic-portfolio-website-eight.vercel.app

## ⚠️ Current Issue: Database not connected

### Fix this in 5 minutes:

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click your project**: `dynamic-portfolio-website`
3. **Click "Storage" tab** → **"Create Database"** → **"Postgres"**
4. **Database settings**:
   - Name: `portfolio-db`
   - Region: `Mumbai, India (bom1)`
5. **Click "Create"** → **"Connect Project"** → Select your project → **"Connect"**

6. **Add Environment Variables** (Settings → Environment Variables):
   ```
   NEXTAUTH_SECRET=your-super-secret-key-here-change-this-in-production-12345
   NEXTAUTH_URL=https://dynamic-portfolio-website-eight.vercel.app
   ADMIN_PASSWORD=Gaganrai@907
   ```

7. **Redeploy**: Deployments tab → "..." menu → "Redeploy"

### After redeploy, your admin login will be:
- **URL**: https://dynamic-portfolio-website-eight.vercel.app/admin/login
- **Email**: gaganrai907@gmail.com  
- **Password**: Gaganrai@907

## 🎉 That's it! Your portfolio will be live with admin panel!
