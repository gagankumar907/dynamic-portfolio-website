import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    // Get the first (and only) home stats record, or create default one
    let homeStats = await prisma.homeStats.findFirst()
    
    if (!homeStats) {
      homeStats = await prisma.homeStats.create({
        data: {
          yearsExperience: "3+",
          projectsDone: "50+",
          clientSatisfaction: "100%",
          heroTitle: "Full Stack Developer",
          heroBio: "I create beautiful, functional, and user-friendly websites and applications with cutting-edge technologies. Welcome to my digital portfolio where innovation meets creativity."
        }
      })
    }
    
    return NextResponse.json(homeStats)
  } catch (error) {
    console.error('Error fetching home stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    // Validate required fields
    if (!data.yearsExperience || !data.projectsDone || !data.clientSatisfaction || !data.heroTitle || !data.heroBio) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Get the first record or create if none exists
    let homeStats = await prisma.homeStats.findFirst()
    
    if (homeStats) {
      // Update existing record
      homeStats = await prisma.homeStats.update({
        where: { id: homeStats.id },
        data: {
          yearsExperience: data.yearsExperience,
          projectsDone: data.projectsDone,
          clientSatisfaction: data.clientSatisfaction,
          heroTitle: data.heroTitle,
          heroBio: data.heroBio,
        }
      })
    } else {
      // Create new record
      homeStats = await prisma.homeStats.create({
        data: {
          yearsExperience: data.yearsExperience,
          projectsDone: data.projectsDone,
          clientSatisfaction: data.clientSatisfaction,
          heroTitle: data.heroTitle,
          heroBio: data.heroBio,
        }
      })
    }

    return NextResponse.json(homeStats)
  } catch (error) {
    console.error('Error updating home stats:', error)
    
    if (error instanceof Error) {
      return NextResponse.json({ 
        error: 'Failed to update home stats', 
        details: error.message 
      }, { status: 500 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
