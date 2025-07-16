import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst()
    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/profile called')
    const session = await getServerSession(authOptions)
    console.log('Session:', session)
    
    if (!session || session.user.role !== 'admin') {
      console.log('Unauthorized access attempt')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    console.log('Received data:', data)
    
    // Check if profile already exists
    const existingProfile = await prisma.profile.findFirst()
    console.log('Existing profile:', existingProfile)
    
    let profile
    if (existingProfile) {
      // Update existing profile
      profile = await prisma.profile.update({
        where: { id: existingProfile.id },
        data: {
          name: data.name,
          title: data.title,
          bio: data.bio,
          email: data.email,
          phone: data.phone,
          location: data.location,
          website: data.website,
          avatar: data.avatar,
          resume: data.resume,
          github: data.github,
          linkedin: data.linkedin,
          twitter: data.twitter,
          instagram: data.instagram,
        }
      })
      console.log('Updated profile:', profile)
    } else {
      // Create new profile
      profile = await prisma.profile.create({
        data: {
          name: data.name,
          title: data.title,
          bio: data.bio,
          email: data.email,
          phone: data.phone,
          location: data.location,
          website: data.website,
          avatar: data.avatar,
          resume: data.resume,
          github: data.github,
          linkedin: data.linkedin,
          twitter: data.twitter,
          instagram: data.instagram,
        }
      })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error saving profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
