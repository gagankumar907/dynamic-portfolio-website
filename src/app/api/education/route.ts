import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: 'asc' }
    })

    return NextResponse.json(education)
  } catch (error) {
    console.error('Error fetching education:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const education = await prisma.education.create({
      data: {
        institution: data.institution,
        degree: data.degree,
        field: data.field,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        gpa: data.gpa,
        description: data.description,
        location: data.location,
        website: data.website,
        order: data.order,
      }
    })

    return NextResponse.json(education)
  } catch (error) {
    console.error('Error creating education:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
