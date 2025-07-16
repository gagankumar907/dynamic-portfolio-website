'use client'

import { useEffect, useState } from 'react'
import { Code, Coffee, Heart, Zap, Users, Target, Award, Lightbulb } from 'lucide-react'

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
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    fetchProfile()
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('about')
    if (element) observer.observe(element)

    return () => observer.disconnect()
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

  const highlights = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Always exploring new technologies and creative solutions'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working effectively with teams and clients'
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Focused on delivering results that exceed expectations'
    }
  ]

  return (
    <section id="about" className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gray-800/50 px-6 py-3 rounded-full mb-6 glass-morphism">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-gray-300 font-medium">About Me</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Passionate{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Developer
            </span>
          </h2>
          
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Crafting digital experiences with creativity, precision, and a touch of magic. 
            Always learning, always growing, always coding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Coffee className="w-6 h-6 text-yellow-500" />
                <h3 className="text-3xl font-bold text-white">
                  Hello! I&apos;m {profile?.name?.split(' ')[0] || 'Gagan'}
                </h3>
              </div>
              
              <div className="text-gray-300 space-y-6 text-lg leading-relaxed">
                <p className="relative">
                  <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></span>
                  {profile?.bio || "I'm a passionate full-stack developer with a love for creating innovative digital solutions. My journey in web development started several years ago, and I've been constantly learning and evolving ever since."}
                </p>
                
                <p>
                  I enjoy working on challenging projects that push the boundaries of what&apos;s possible on the web. 
                  When I&apos;m not coding, you can find me exploring new technologies, contributing to open source projects, 
                  or sharing knowledge with the developer community.
                </p>
                
                <p>
                  I believe in writing clean, maintainable code and creating user experiences that are both beautiful 
                  and functional. Let&apos;s build something amazing together! ✨
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-gray-700/50">
              {profile?.email && (
                <div className="group">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Email
                  </h4>
                  <a 
                    href={`mailto:${profile.email}`}
                    className="text-white hover:text-blue-400 transition-all duration-300 group-hover:scale-105 inline-block"
                  >
                    {profile.email}
                  </a>
                </div>
              )}
              
              {profile?.phone && (
                <div className="group">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Phone
                  </h4>
                  <a 
                    href={`tel:${profile.phone}`}
                    className="text-white hover:text-green-400 transition-all duration-300 group-hover:scale-105 inline-block"
                  >
                    {profile.phone}
                  </a>
                </div>
              )}
              
              {profile?.location && (
                <div className="group">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    Location
                  </h4>
                  <p className="text-white group-hover:text-purple-400 transition-colors duration-300">{profile.location}</p>
                </div>
              )}
              
              {profile?.website && (
                <div className="group">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    Website
                  </h4>
                  <a 
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-cyan-400 transition-all duration-300 group-hover:scale-105 inline-block"
                  >
                    {profile.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Highlights */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <div 
                  key={index}
                  className="group relative p-6 bg-gray-800/50 hover:bg-gray-700/50 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl glass-morphism"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Enhanced Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          {[
            { number: '3+', label: 'Years Experience', icon: Award, color: 'blue' },
            { number: '50+', label: 'Projects Completed', icon: Target, color: 'purple' },
            { number: '20+', label: 'Technologies', icon: Code, color: 'green' },
            { number: '100%', label: 'Client Satisfaction', icon: Zap, color: 'yellow' }
          ].map((stat, index) => {
            const Icon = stat.icon
            const colorClasses = {
              blue: 'from-blue-500 to-cyan-500 text-blue-400',
              purple: 'from-purple-500 to-pink-500 text-purple-400',
              green: 'from-green-500 to-emerald-500 text-green-400',
              yellow: 'from-yellow-500 to-orange-500 text-yellow-400'
            }
            
            return (
              <div 
                key={index}
                className="group relative p-6 bg-gray-800/50 hover:bg-gray-700/50 rounded-2xl text-center border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl glass-morphism"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[stat.color as keyof typeof colorClasses].split(' text-')[0]} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[2]}`} />
                  </div>
                  <div className={`text-4xl font-bold ${colorClasses[stat.color as keyof typeof colorClasses].split(' ')[2]} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
