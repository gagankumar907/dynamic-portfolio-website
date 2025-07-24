import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const project = await prisma.project.findUnique({
      where: { id: id }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    // Validate required fields
    if (!data.title || !data.description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }

    // Handle date parsing safely
    let startDate = null
    let endDate = null
    
    if (data.startDate) {
      try {
        startDate = new Date(data.startDate)
        if (isNaN(startDate.getTime())) {
          startDate = null
        }
      } catch {
        startDate = null
      }
    }
    
    if (data.endDate) {
      try {
        endDate = new Date(data.endDate)
        if (isNaN(endDate.getTime())) {
          endDate = null
        }
      } catch {
        endDate = null
      }
    }

    const project = await prisma.project.update({
      where: { id: id },
      data: {
        title: data.title,
        description: data.description,
        content: data.content || '',
        image: data.image || null,
        images: data.images ? JSON.stringify(data.images) : null,
        technologies: JSON.stringify(data.technologies || []),
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        featured: Boolean(data.featured),
        status: data.status || 'completed',
        startDate,
        endDate,
        order: Number(data.order) || 0,
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating project:', error)
    
    // Provide more detailed error information
    if (error instanceof Error) {
      return NextResponse.json({ 
        error: 'Failed to update project', 
        details: error.message 
      }, { status: 500 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.project.delete({
      where: { id: id }
    })

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
