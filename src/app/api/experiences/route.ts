import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [
        { current: 'desc' },
        { startDate: 'desc' }
      ]
    })
    return NextResponse.json(experiences)
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const experience = await prisma.experience.create({
      data: {
        company: data.company,
        position: data.position,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        current: data.current || false,
        location: data.location,
        website: data.website,
        technologies: data.technologies ? JSON.stringify(data.technologies) : null,
        order: data.order || 0,
      }
    })

    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    console.error('Error creating experience:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
