'use client'

import { useEffect, useState } from 'react'
import { Download, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'

interface Profile {
  name: string
  title: string
  bio: string
  email: string
  location?: string
  avatar?: string
  resume?: string
  github?: string
  linkedin?: string
}

export function HeroSection() {
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
    <section id="home" className="pt-16 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {profile?.name || 'Your Name'}
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-300 font-medium">
                {profile?.title || 'Full Stack Developer'}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                {profile?.bio || 'I create beautiful, functional, and user-friendly websites and applications. Welcome to my digital portfolio where you can explore my work and get to know me better.'}
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-gray-400">
              {profile?.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{profile.email}</span>
                </div>
              )}
              {profile?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {profile?.resume && (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <Download size={18} />
                  Download Resume
                </a>
              )}
              
              <a
                href="#contact"
                className="flex items-center gap-2 border border-gray-600 hover:border-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-colors hover:bg-gray-800"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Get In Touch
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={24} />
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              )}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center overflow-hidden">
                  {profile?.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt={profile.name || 'Profile'}
                      width={320}
                      height={320}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-6xl text-gray-400">👤</span>
                    </div>
                  )}
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
