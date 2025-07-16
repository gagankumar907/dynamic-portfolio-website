# 🔧 Vercel Environment Variables Setup Guide

## Method 1: Vercel Dashboard (Easy Way)

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Select your project: `dynamic-portfolio-website`
3. Go to: **Settings** > **Environment Variables**

### Step 2: Add Environment Variables
Add these variables one by one:

```bash
# Variable Name: DATABASE_URL
# Value: Your PostgreSQL connection string
# Example: postgresql://username:password@hostname:port/database

# Variable Name: NEXTAUTH_SECRET  
# Value: gagan-portfolio-super-secure-secret-key-2024-vercel-production-random

# Variable Name: NEXTAUTH_URL
# Value: https://your-project-name.vercel.app

# Variable Name: ADMIN_PASSWORD
# Value: Gaganrai@907
```

### Step 3: Environment Selection
For each variable, select:
- ✅ Production
- ✅ Preview  
- ✅ Development

### Step 4: Save and Redeploy
1. Click **Save** for each variable
2. Go to **Deployments** tab
3. Click **Redeploy** on latest deployment

## Method 2: Using .env Files (Alternative)

Create `.env.production` file with:
```bash
DATABASE_URL="postgresql://username:password@hostname:port/database"
NEXTAUTH_SECRET="gagan-portfolio-super-secure-secret-key-2024-vercel-production-random"
NEXTAUTH_URL="https://your-project-name.vercel.app"
ADMIN_PASSWORD="Gaganrai@907"
```

## Common Issues & Solutions

### Issue: "Secret does not exist"
**Solution**: Don't use @ syntax in vercel.json, use direct env vars in dashboard

### Issue: Database connection error
**Solution**: Ensure PostgreSQL URL is correct and accessible

### Issue: NextAuth callback error
**Solution**: Make sure NEXTAUTH_URL matches your Vercel domain

## Database Setup Commands (After Environment Variables)

```bash
# After setting env vars, run these in Vercel:
npx prisma db push
npm run db:seed
```

## Quick Checklist
- [ ] DATABASE_URL set in Vercel
- [ ] NEXTAUTH_SECRET set in Vercel  
- [ ] NEXTAUTH_URL set in Vercel
- [ ] ADMIN_PASSWORD set in Vercel
- [ ] All variables applied to Production/Preview/Development
- [ ] Project redeployed
- [ ] Database migrated
- [ ] Seed data loaded
