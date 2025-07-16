import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateShort(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}

export function parseJSON<T>(json: string | null, fallback: T): T {
  if (!json) return fallback
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

// Utility function to safely handle form data from API responses
export function safeFormData<T extends Record<string, unknown>>(data: T): T {
  const safeData = {} as T
  
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key]
      // Convert null to empty string for string fields, keep other types as is
      if (value === null && typeof value !== 'boolean' && typeof value !== 'number') {
        (safeData as Record<string, unknown>)[key] = ''
      } else {
        safeData[key] = value
      }
    }
  }
  
  return safeData
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}
