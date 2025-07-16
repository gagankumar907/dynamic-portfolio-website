'use client'

import { useEffect, useState } from 'react'
import { Download, Github, Linkedin, Mail, MapPin, Sparkles, Code, Coffee } from 'lucide-react'
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
  const [currentWord, setCurrentWord] = useState(0)
  const [mounted, setMounted] = useState(false)
  
  const words = ['Developer', 'Creator', 'Designer', 'Innovator']

  // Stable particle positions - same on server and client
  const particles = [
    { left: 10, top: 20, delay: 0, duration: 4 },
    { left: 20, top: 60, delay: 1, duration: 5 },
    { left: 30, top: 30, delay: 2, duration: 3.5 },
    { left: 40, top: 80, delay: 0.5, duration: 4.5 },
    { left: 50, top: 15, delay: 1.5, duration: 3 },
    { left: 60, top: 70, delay: 2.5, duration: 5.5 },
    { left: 70, top: 45, delay: 0.8, duration: 4.2 },
    { left: 80, top: 25, delay: 1.8, duration: 3.8 },
    { left: 90, top: 85, delay: 2.2, duration: 4.8 },
    { left: 15, top: 50, delay: 0.3, duration: 3.3 },
    { left: 25, top: 90, delay: 1.3, duration: 5.3 },
    { left: 35, top: 10, delay: 2.8, duration: 4.3 },
    { left: 45, top: 65, delay: 0.7, duration: 3.7 },
    { left: 55, top: 35, delay: 1.7, duration: 5.7 },
    { left: 65, top: 75, delay: 2.3, duration: 4.7 },
    { left: 75, top: 55, delay: 0.9, duration: 3.9 },
    { left: 85, top: 40, delay: 1.9, duration: 5.9 },
    { left: 95, top: 5, delay: 2.9, duration: 4.9 },
    { left: 5, top: 95, delay: 0.1, duration: 3.1 },
    { left: 85, top: 15, delay: 1.1, duration: 5.1 }
  ]

  useEffect(() => {
    setMounted(true)
    fetchProfile()
    
    // Animated title words
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [words.length])

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
    <section id="home" className="relative pt-16 min-h-screen flex items-center overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-indigo-900/30"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/20 rounded-full blur-3xl animate-pulse opacity-80"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/15 via-cyan-500/20 to-blue-500/15 rounded-full blur-3xl animate-pulse opacity-70" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/15 to-purple-500/10 rounded-full blur-3xl animate-pulse opacity-60" style={{ animationDelay: '4s' }}></div>
        
        {/* Enhanced floating geometric shapes */}
        <div className="absolute top-20 left-20 w-12 h-12 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-2xl rotate-45 animate-spin opacity-60" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-32 right-32 w-8 h-8 bg-gradient-to-br from-pink-400/25 to-red-400/25 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/3 w-6 h-6 bg-gradient-to-br from-emerald-400/30 to-cyan-400/30 rounded-lg rotate-12 animate-pulse opacity-40" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-32 right-1/2 w-14 h-14 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-3xl rotate-45 animate-spin opacity-30" style={{ animationDuration: '20s', animationDelay: '2s' }}></div>
      </div>
      
      {/* Enhanced floating particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/50 via-purple-400/60 to-pink-400/50 rounded-full animate-float opacity-70 shadow-lg shadow-purple-500/30"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
          
          {/* Additional sparkle effects */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute w-1 h-1 bg-white/60 rounded-full animate-ping"
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${2 + (i % 3)}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fadeInUp">
            <div className="space-y-6">
              {/* Enhanced Greeting */}
              <div className="flex items-center gap-4 text-gray-300 bg-gradient-to-r from-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-purple-500/20 px-6 py-3 rounded-2xl shadow-2xl shadow-purple-500/10">
                <Coffee className="w-6 h-6 text-yellow-400 animate-pulse" />
                <span className="text-xl font-semibold tracking-wide">Hello, I&apos;m</span>
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-white leading-tight">
                <span className="block">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
                    {profile?.name?.split(' ')[0] || 'Gagan'}
                  </span>
                </span>
                <span className="block text-4xl md:text-6xl mt-4 text-gray-200 font-light tracking-wider">
                  {profile?.name?.split(' ').slice(1).join(' ') || 'Kumar'}
                </span>
              </h1>

              <div className="flex items-center gap-4 text-3xl md:text-4xl bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-xl border border-blue-500/20 px-8 py-4 rounded-2xl shadow-2xl shadow-blue-500/10">
                <Code className="w-10 h-10 text-blue-400 animate-pulse" />
                <span className="text-gray-200 font-bold">Full Stack</span>
                <span 
                  key={currentWord}
                  className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-black animate-slideInUp drop-shadow-lg"
                >
                  {words[currentWord]}
                </span>
              </div>

              <p className="text-gray-300 text-xl md:text-2xl leading-relaxed max-w-3xl bg-gradient-to-r from-slate-800/40 to-slate-700/20 backdrop-blur-xl border border-slate-600/30 p-8 rounded-3xl shadow-2xl shadow-slate-900/50">
                {profile?.bio || 'I create beautiful, functional, and user-friendly websites and applications with cutting-edge technologies. Welcome to my digital portfolio where innovation meets creativity.'}
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-8 py-8">
              {[
                { number: '3+', label: 'Years Experience', color: 'from-blue-400 to-cyan-400' },
                { number: '50+', label: 'Projects Done', color: 'from-purple-400 to-pink-400' },
                { number: '100%', label: 'Client Satisfaction', color: 'from-emerald-400 to-green-400' }
              ].map((stat, index) => (
                <div key={index} className="text-center group bg-gradient-to-br from-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-slate-600/30 p-6 rounded-2xl hover:scale-110 transition-all duration-500 shadow-xl hover:shadow-2xl">
                  <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-125 transition-transform duration-300 drop-shadow-lg`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm font-semibold mt-2 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Enhanced Contact Info */}
            <div className="flex flex-wrap gap-6 text-gray-300">
              {profile?.email && (
                <div className="flex items-center gap-4 group hover:text-white transition-all duration-500 bg-gradient-to-r from-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-blue-500/20 px-6 py-4 rounded-2xl hover:scale-105 shadow-xl hover:shadow-blue-500/20">
                  <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-all duration-300 group-hover:scale-110">
                    <Mail size={20} className="text-blue-400" />
                  </div>
                  <span className="font-semibold text-lg">{profile.email}</span>
                </div>
              )}
              {profile?.location && (
                <div className="flex items-center gap-4 group hover:text-white transition-all duration-500 bg-gradient-to-r from-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-purple-500/20 px-6 py-4 rounded-2xl hover:scale-105 shadow-xl hover:shadow-purple-500/20">
                  <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-all duration-300 group-hover:scale-110">
                    <MapPin size={20} className="text-purple-400" />
                  </div>
                  <span className="font-semibold text-lg">{profile.location}</span>
                </div>
              )}
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-wrap gap-6">
              {profile?.resume && (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30 backdrop-blur-xl border border-purple-400/30"
                >
                  <Download size={24} className="transition-transform duration-300 group-hover:scale-125" />
                  Download Resume
                  <Sparkles size={20} className="opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                  
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                </a>
              )}
              
              <a
                href="#contact"
                className="group relative flex items-center gap-4 border-2 border-slate-600 hover:border-purple-400 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 hover:bg-slate-800/80 transform hover:scale-110 backdrop-blur-xl shadow-xl hover:shadow-purple-500/20"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Get In Touch
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse group-hover:scale-125 transition-transform duration-300"></div>
                
                {/* Hover effect border */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </a>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex gap-6">
              {[
                { icon: Github, href: profile?.github, color: 'hover:text-gray-300', bgColor: 'hover:bg-gray-600/30', shadowColor: 'hover:shadow-gray-500/20' },
                { icon: Linkedin, href: profile?.linkedin, color: 'hover:text-blue-400', bgColor: 'hover:bg-blue-600/30', shadowColor: 'hover:shadow-blue-500/20' }
              ].map(({ icon: Icon, href, color, bgColor, shadowColor }, index) => 
                href && (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-6 bg-slate-800/60 ${bgColor} rounded-2xl text-gray-400 ${color} transition-all duration-500 hover:scale-125 hover:shadow-2xl ${shadowColor} backdrop-blur-xl border border-slate-600/50 hover:border-purple-400/50`}
                  >
                    <Icon size={28} className="transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating particles on hover */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-purple-400/60 rounded-full animate-ping"
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${20 + i * 20}%`,
                            animationDelay: `${i * 0.3}s`
                          }}
                        />
                      ))}
                    </div>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Enhanced Profile Image */}
          <div className="flex justify-center lg:justify-end items-center lg:items-start animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <div className="relative group mt-8 lg:mt-0">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 animate-pulse"></div>
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400 p-2 transform group-hover:scale-110 transition-all duration-700 shadow-2xl shadow-purple-500/30">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border-4 border-slate-800/50">
                  {profile?.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt={profile.name || 'Profile'}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover rounded-full filter group-hover:brightness-110 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center group-hover:from-slate-600 group-hover:to-slate-700 transition-all duration-500">
                      <span className="text-6xl md:text-8xl text-gray-400 group-hover:text-gray-300 transition-colors duration-300">👤</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Enhanced floating elements */}
              <div className="absolute -top-4 -right-4 w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl animate-float-up-down flex items-center justify-center shadow-xl shadow-blue-500/30 border border-blue-400/20">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl animate-float-up-down flex items-center justify-center shadow-xl shadow-purple-500/30 border border-purple-400/20" style={{ animationDelay: '1s' }}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-1/3 -right-6 w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl animate-float-up-down shadow-lg shadow-yellow-500/30 border border-yellow-400/20" style={{ animationDelay: '2s' }}>
                <Coffee className="w-5 h-5 text-white m-2.5" />
              </div>
              
              {/* Additional decorative elements */}
              <div className="absolute top-1/4 -left-8 w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-1/3 -right-10 w-4 h-4 bg-gradient-to-r from-rose-500 to-red-500 rounded-full animate-ping opacity-50" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
