'use client'

import { useEffect, useState } from 'react'

interface Profile {
  name: string
  title: string
  bio: string
  email: string
  phone?: string
  location?: string
  website?: string
}

export function AboutSection() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  return (
    <section id="about" className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get to know more about who I am, what I do, and what I'm passionate about.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Hello! I'm {profile?.name || 'a Developer'}
              </h3>
              <div className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  {profile?.bio || "I'm a passionate full-stack developer with a love for creating innovative digital solutions. My journey in web development started several years ago, and I've been constantly learning and evolving ever since."}
                </p>
                <p>
                  I enjoy working on challenging projects that push the boundaries of what's possible on the web. When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing knowledge with the developer community.
                </p>
                <p>
                  I believe in writing clean, maintainable code and creating user experiences that are both beautiful and functional. Let's build something amazing together!
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-700">
              {profile?.email && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Email
                  </h4>
                  <a 
                    href={`mailto:${profile.email}`}
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
              )}
              
              {profile?.phone && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Phone
                  </h4>
                  <a 
                    href={`tel:${profile.phone}`}
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    {profile.phone}
                  </a>
                </div>
              )}
              
              {profile?.location && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Location
                  </h4>
                  <p className="text-white">{profile.location}</p>
                </div>
              )}
              
              {profile?.website && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Website
                  </h4>
                  <a 
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    {profile.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Stats or Additional Info */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">3+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-300">Projects Completed</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">20+</div>
              <div className="text-gray-300">Technologies</div>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
