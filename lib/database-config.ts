// Environment-specific Prisma schema configuration
// This file helps switch between SQLite (development) and PostgreSQL (production)

const isDevelopment = process.env.NODE_ENV === 'development'
const isLocal = process.env.VERCEL_ENV === undefined

export const databaseConfig = {
  // Use SQLite for local development, PostgreSQL for production
  provider: isDevelopment || isLocal ? 'sqlite' : 'postgresql',
  
  // Database URLs
  url: process.env.DATABASE_URL,
  directUrl: process.env.DIRECT_URL,
  shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  
  // Migration settings
  enableShadowDatabase: !isDevelopment && !isLocal
}

// Function to get the correct database URL based on environment
export function getDatabaseUrl() {
  if (isDevelopment || isLocal) {
    return process.env.DATABASE_URL || 'file:./prisma/dev.db'
  }
  
  return process.env.DATABASE_URL
}
