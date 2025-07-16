#!/usr/bin/env node

// Check if we're in a build environment and set placeholder DATABASE_URL if needed
if (process.env.VERCEL && !process.env.DATABASE_URL) {
  console.log('🔧 Build environment detected, setting placeholder DATABASE_URL...')
  process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@placeholder:5432/placeholder'
}

// For local development, check if .env exists
const fs = require('fs')
const path = require('path')

const envPath = path.join(process.cwd(), '.env')
if (!fs.existsSync(envPath) && !process.env.DATABASE_URL) {
  console.log('⚠️  No .env file found and no DATABASE_URL set')
  console.log('📝 Creating .env.local with placeholder values...')
  
  const envContent = `# Local Development Environment Variables
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="local-development-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_PASSWORD="Gaganrai@907"
`
  
  fs.writeFileSync('.env.local', envContent)
  console.log('✅ Created .env.local file')
}

console.log('✅ Environment check completed')
