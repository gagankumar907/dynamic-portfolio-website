#!/usr/bin/env node

const { execSync } = require('child_process')

console.log('🔧 Starting Vercel build process...')

// Set placeholder DATABASE_URL if not exists
if (!process.env.DATABASE_URL) {
  console.log('📝 Setting placeholder DATABASE_URL for build...')
  process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/db'
}

try {
  console.log('📦 Generating Prisma client...')
  execSync('prisma generate', { stdio: 'inherit' })
  
  console.log('🏗️  Building Next.js application...')
  execSync('next build', { stdio: 'inherit' })
  
  console.log('✅ Build completed successfully!')
} catch (error) {
  console.error('❌ Build failed:', error.message)
  process.exit(1)
}
