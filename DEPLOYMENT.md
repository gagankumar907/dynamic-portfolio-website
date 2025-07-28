# Deployment Instructions

## For Vercel Deployment:

### 1. Environment Variables Setup
Add these environment variables in your Vercel dashboard:

```
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
NEXTAUTH_SECRET=your-super-secret-nextauth-key-for-production-change-this-immediately
NEXTAUTH_URL=https://your-domain.vercel.app
ADMIN_PASSWORD=Gaganrai@907
```

### 2. Database Setup (PostgreSQL)
- Use services like Supabase, PlanetScale, or Neon
- Get the connection string and add to DATABASE_URL

### 3. Build Commands
- Build Command: `npm run build`
- Install Command: `npm install`

### 4. After Deployment
Run database migration:
```bash
npx prisma db push
npx prisma db seed
```

## For Netlify Deployment:

### 1. Environment Variables
Add the same variables in Netlify environment settings

### 2. Build Settings
- Build command: `npm run build`
- Publish directory: `.next`

## Common Issues:

### Login not working on production:
1. Check NEXTAUTH_URL matches your domain
2. Ensure NEXTAUTH_SECRET is set
3. Database connection is working
4. Admin user exists in production database

### Database Issues:
1. Make sure DATABASE_URL is correct
2. Run migrations after deployment
3. Seed database with admin user

## Testing Deployment:
1. Visit your deployed site
2. Go to /admin/login
3. Use credentials: gaganrai907@gmail.com / Gaganrai@907
