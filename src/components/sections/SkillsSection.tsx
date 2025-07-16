'use client'

import React, { useEffect, useState } from 'react'
import { 
  Zap, Code, Database, Wrench, Star, TrendingUp, 
  Globe, Server, Layers, Settings, Smartphone, 
  Monitor, HardDrive, Cloud, GitBranch,
  Package, Palette, Component, FileCode,
  Braces, Triangle
} from 'lucide-react'

interface Skill {
  id: string
  name: string
  category: string
  level: number
  icon?: string
  color?: string
}

// Skill icon mapping based on skill names
const getSkillIcon = (skillName: string) => {
  const name = skillName.toLowerCase()
  
  // Frontend technologies
  if (name.includes('react')) return <Component className="w-6 h-6" style={{ color: '#61DAFB' }} />
  if (name.includes('vue')) return <Triangle className="w-6 h-6" style={{ color: '#4FC08D' }} />
  if (name.includes('angular')) return <Code className="w-6 h-6" style={{ color: '#DD0031' }} />
  if (name.includes('javascript') || name.includes('js')) return <FileCode className="w-6 h-6" style={{ color: '#F7DF1E' }} />
  if (name.includes('typescript') || name.includes('ts')) return <Braces className="w-6 h-6" style={{ color: '#3178C6' }} />
  if (name.includes('html')) return <Globe className="w-6 h-6" style={{ color: '#E34F26' }} />
  if (name.includes('css')) return <Palette className="w-6 h-6" style={{ color: '#1572B6' }} />
  if (name.includes('tailwind')) return <Palette className="w-6 h-6" style={{ color: '#06B6D4' }} />
  if (name.includes('bootstrap')) return <Layers className="w-6 h-6" style={{ color: '#7952B3' }} />
  if (name.includes('sass') || name.includes('scss')) return <Palette className="w-6 h-6" style={{ color: '#CC6699' }} />
  if (name.includes('next')) return <Triangle className="w-6 h-6" style={{ color: '#000000' }} />
  if (name.includes('nuxt')) return <Triangle className="w-6 h-6" style={{ color: '#00DC82' }} />
  
  // Backend technologies
  if (name.includes('node')) return <Server className="w-6 h-6" style={{ color: '#339933' }} />
  if (name.includes('express')) return <Server className="w-6 h-6" style={{ color: '#000000' }} />
  if (name.includes('django')) return <Server className="w-6 h-6" style={{ color: '#092E20' }} />
  if (name.includes('flask')) return <Server className="w-6 h-6" style={{ color: '#000000' }} />
  if (name.includes('fastapi')) return <Server className="w-6 h-6" style={{ color: '#009688' }} />
  if (name.includes('spring')) return <Server className="w-6 h-6" style={{ color: '#6DB33F' }} />
  if (name.includes('laravel')) return <Server className="w-6 h-6" style={{ color: '#FF2D20' }} />
  if (name.includes('ruby')) return <Server className="w-6 h-6" style={{ color: '#CC342D' }} />
  if (name.includes('php')) return <Code className="w-6 h-6" style={{ color: '#777BB4' }} />
  if (name.includes('python')) return <Code className="w-6 h-6" style={{ color: '#3776AB' }} />
  if (name.includes('java')) return <Code className="w-6 h-6" style={{ color: '#ED8B00' }} />
  if (name.includes('c#') || name.includes('csharp')) return <Code className="w-6 h-6" style={{ color: '#239120' }} />
  if (name.includes('go') || name.includes('golang')) return <Code className="w-6 h-6" style={{ color: '#00ADD8' }} />
  if (name.includes('rust')) return <Code className="w-6 h-6" style={{ color: '#000000' }} />
  
  // Databases
  if (name.includes('mysql')) return <Database className="w-6 h-6" style={{ color: '#4479A1' }} />
  if (name.includes('postgresql') || name.includes('postgres')) return <Database className="w-6 h-6" style={{ color: '#336791' }} />
  if (name.includes('mongodb')) return <Database className="w-6 h-6" style={{ color: '#47A248' }} />
  if (name.includes('redis')) return <HardDrive className="w-6 h-6" style={{ color: '#DC382D' }} />
  if (name.includes('sqlite')) return <Database className="w-6 h-6" style={{ color: '#003B57' }} />
  if (name.includes('firebase')) return <Database className="w-6 h-6" style={{ color: '#FFCA28' }} />
  if (name.includes('supabase')) return <Database className="w-6 h-6" style={{ color: '#3ECF8E' }} />
  
  // Cloud & DevOps
  if (name.includes('aws')) return <Cloud className="w-6 h-6" style={{ color: '#FF9900' }} />
  if (name.includes('azure')) return <Cloud className="w-6 h-6" style={{ color: '#0078D4' }} />
  if (name.includes('gcp') || name.includes('google cloud')) return <Cloud className="w-6 h-6" style={{ color: '#4285F4' }} />
  if (name.includes('docker')) return <Package className="w-6 h-6" style={{ color: '#2496ED' }} />
  if (name.includes('kubernetes')) return <Settings className="w-6 h-6" style={{ color: '#326CE5' }} />
  if (name.includes('vercel')) return <Triangle className="w-6 h-6" style={{ color: '#000000' }} />
  if (name.includes('netlify')) return <Globe className="w-6 h-6" style={{ color: '#00C7B7' }} />
  
  // Tools & Version Control
  if (name.includes('git')) return <GitBranch className="w-6 h-6" style={{ color: '#F05032' }} />
  if (name.includes('github')) return <GitBranch className="w-6 h-6" style={{ color: '#181717' }} />
  if (name.includes('gitlab')) return <GitBranch className="w-6 h-6" style={{ color: '#FC6D26' }} />
  if (name.includes('vscode')) return <Code className="w-6 h-6" style={{ color: '#007ACC' }} />
  if (name.includes('webpack')) return <Package className="w-6 h-6" style={{ color: '#8DD6F9' }} />
  if (name.includes('vite')) return <Zap className="w-6 h-6" style={{ color: '#646CFF' }} />
  if (name.includes('npm')) return <Package className="w-6 h-6" style={{ color: '#CB3837' }} />
  if (name.includes('yarn')) return <Package className="w-6 h-6" style={{ color: '#2C8EBB' }} />
  if (name.includes('pnpm')) return <Package className="w-6 h-6" style={{ color: '#F69220' }} />
  
  // Mobile
  if (name.includes('react native')) return <Smartphone className="w-6 h-6" style={{ color: '#61DAFB' }} />
  if (name.includes('flutter')) return <Smartphone className="w-6 h-6" style={{ color: '#02569B' }} />
  if (name.includes('swift')) return <Smartphone className="w-6 h-6" style={{ color: '#FA7343' }} />
  if (name.includes('kotlin')) return <Smartphone className="w-6 h-6" style={{ color: '#7F52FF' }} />
  
  // Default fallback based on category
  if (name.includes('frontend') || name.includes('ui') || name.includes('ux')) return <Monitor className="w-6 h-6" style={{ color: '#61DAFB' }} />
  if (name.includes('backend') || name.includes('server') || name.includes('api')) return <Server className="w-6 h-6" style={{ color: '#68D391' }} />
  if (name.includes('database') || name.includes('db')) return <Database className="w-6 h-6" style={{ color: '#9F7AEA' }} />
  if (name.includes('tool') || name.includes('dev')) return <Wrench className="w-6 h-6" style={{ color: '#F6AD55' }} />
  
  // Final fallback
  return <Code className="w-6 h-6" style={{ color: '#A0AEC0' }} />
}

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    fetchSkills()
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    const element = document.getElementById('skills')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills')
      if (response.ok) {
        const data = await response.json()
        setSkills(data)
      }
    } catch (error) {
      console.error('Error fetching skills:', error)
    } finally {
      setLoading(false)
    }
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const categoryIcons = {
    frontend: Code,
    backend: Database,
    database: Database,
    tools: Wrench,
    all: Star
  }

  const categoryColors = {
    frontend: 'from-blue-500 to-cyan-500',
    backend: 'from-green-500 to-emerald-500',
    database: 'from-purple-500 to-pink-500',
    tools: 'from-yellow-500 to-orange-500'
  }

  const categories = ['all', ...Object.keys(skillsByCategory)]
  
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skillsByCategory[activeCategory] || []

  if (loading) {
    return (
      <section id="skills" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="relative py-32 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-purple-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-lg rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-sm rotate-12 animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-48 right-1/3 w-10 h-10 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-xl rotate-45 animate-spin" style={{ animationDuration: '25s', animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-800/80 via-purple-800/40 to-slate-800/80 backdrop-blur-xl border border-purple-500/20 px-8 py-4 rounded-full mb-8 shadow-2xl shadow-purple-500/10">
            <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
            <span className="text-gray-200 font-semibold text-lg tracking-wide">Skills & Technologies</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Technical{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              Mastery
            </span>
          </h2>
          
          <p className="text-gray-300 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-12 font-light">
            Continuously evolving toolkit of cutting-edge technologies and frameworks that power modern web development. 
            Each skill represents countless hours of dedication, learning, and real-world application.
          </p>

          {/* Enhanced Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons] || Code
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-110 backdrop-blur-xl border ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 text-white shadow-2xl shadow-purple-500/30 border-purple-400/50 scale-110'
                      : 'bg-slate-800/60 text-gray-300 hover:bg-slate-700/80 hover:text-white border-slate-600/50 hover:border-purple-400/50 hover:shadow-xl hover:shadow-purple-500/20'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'animate-pulse' : 'group-hover:scale-125'}`} />
                  <span className="text-base tracking-wide">
                    {category === 'all' ? 'All Skills' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl animate-pulse"></div>
                  )}
                  
                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400/60 rounded-full animate-ping"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${20 + i * 20}%`,
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: `${2 + i * 0.5}s`
                        }}
                      />
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <div className={`${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          {filteredSkills.length > 0 ? (
            <>
              {activeCategory === 'all' ? (
                // Show by categories when "all" is selected
                <div className="space-y-24">
                  {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                    <div key={category} className="group">
                      <div className="flex items-center gap-6 mb-12 bg-gradient-to-r from-slate-800/60 via-purple-800/30 to-slate-800/60 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 shadow-2xl shadow-purple-500/10">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          {React.createElement(categoryIcons[category as keyof typeof categoryIcons] || Code, {
                            className: "w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
                          })}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-3xl font-black text-white capitalize mb-2 group-hover:text-purple-300 transition-colors duration-300">
                            {category.replace('-', ' ')}
                          </h3>
                          <p className="text-gray-400 text-lg">
                            {categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'} mastered
                          </p>
                        </div>
                        <div className={`h-1 w-32 rounded-full bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors] || 'from-gray-500 to-gray-600'} group-hover:w-40 transition-all duration-500`}></div>
                      </div>
                      <div className="grid skills-grid gap-8">
                        {categorySkills.map((skill, index) => (
                          <SkillCard 
                            key={skill.id} 
                            skill={skill} 
                            index={index}
                            category={category}
                            isVisible={isVisible}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Show filtered skills
                <div className="grid skills-grid gap-8">
                  {filteredSkills.map((skill, index) => (
                    <SkillCard 
                      key={skill.id} 
                      skill={skill} 
                      index={index}
                      category={activeCategory}
                      isVisible={isVisible}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="w-12 h-12 text-gray-500" />
              </div>
              <p className="text-gray-400 text-xl">
                No skills found for this category. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Enhanced Skills Summary */}
        <div className={`mt-32 grid grid-cols-1 md:grid-cols-3 gap-10 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="group text-center p-10 bg-gradient-to-br from-slate-800/80 via-emerald-800/20 to-slate-800/80 backdrop-blur-xl border border-emerald-500/30 rounded-3xl shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500/30 to-green-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <TrendingUp className="w-10 h-10 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
            </div>
            <h4 className="text-3xl font-black text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300">Always Learning</h4>
            <p className="text-gray-300 text-lg leading-relaxed">Constantly updating skills with latest technologies, frameworks, and industry best practices</p>
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-emerald-400/60 rounded-full animate-ping"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${15 + i * 25}%`,
                    animationDelay: `${i * 0.4}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="group text-center p-10 bg-gradient-to-br from-slate-800/80 via-yellow-800/20 to-slate-800/80 backdrop-blur-xl border border-yellow-500/30 rounded-3xl shadow-2xl shadow-yellow-500/10 hover:shadow-yellow-500/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <Star className="w-10 h-10 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
            </div>
            <h4 className="text-3xl font-black text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300">Quality Focus</h4>
            <p className="text-gray-300 text-lg leading-relaxed">Committed to writing clean, maintainable, scalable, and well-documented code</p>
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400/60 rounded-full animate-ping"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${15 + i * 25}%`,
                    animationDelay: `${i * 0.4}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="group text-center p-10 bg-gradient-to-br from-slate-800/80 via-blue-800/20 to-slate-800/80 backdrop-blur-xl border border-blue-500/30 rounded-3xl shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <Zap className="w-10 h-10 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            </div>
            <h4 className="text-3xl font-black text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">Performance</h4>
            <p className="text-gray-300 text-lg leading-relaxed">Optimizing applications for lightning-fast speed, efficiency, and exceptional user experience</p>
            
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/60 rounded-full animate-ping"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${15 + i * 25}%`,
                    animationDelay: `${i * 0.4}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillCard({ skill, index, category, isVisible }: { skill: Skill; index: number; category: string; isVisible: boolean }) {
  
  const categoryColors = {
    frontend: 'from-blue-500/30 to-cyan-500/30',
    backend: 'from-green-500/30 to-emerald-500/30',
    database: 'from-purple-500/30 to-pink-500/30',
    tools: 'from-yellow-500/30 to-orange-500/30'
  }

  const levelLabels = {
    1: 'Beginner',
    2: 'Basic',
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert'
  }

  const levelColors = {
    1: 'from-red-400 to-red-600',
    2: 'from-orange-400 to-orange-600',
    3: 'from-yellow-400 to-yellow-600',
    4: 'from-blue-400 to-blue-600',
    5: 'from-green-400 to-green-600'
  }

  return (
    <div 
      className="skill-card group relative bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-xl border border-slate-600/50 hover:border-purple-400/60 p-6 sm:p-8 rounded-3xl transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-2"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Enhanced Background gradient with animation */}
      <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors] || 'from-gray-500/20 to-gray-600/20'} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700`}></div>
      
      {/* Animated border effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-white font-black text-lg sm:text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500">
            {skill.name}
          </h4>
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-slate-700/60 to-slate-900/80 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:bg-gradient-to-br group-hover:from-blue-500/30 group-hover:to-purple-500/30 shadow-xl group-hover:shadow-purple-500/30">
            {getSkillIcon(skill.name)}
            
            {/* Rotating border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 animate-spin transition-opacity duration-500" style={{ animationDuration: '3s' }}></div>
          </div>
        </div>
        
        {/* Enhanced Skill Level */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className={`text-sm sm:text-base font-bold px-4 py-2 rounded-xl bg-gradient-to-r ${levelColors[skill.level as keyof typeof levelColors]} text-white shadow-lg transform group-hover:scale-105 transition-all duration-300`}>
              {levelLabels[skill.level as keyof typeof levelLabels]}
            </span>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-black text-white group-hover:text-purple-300 transition-colors duration-300">
                {skill.level}
              </span>
              <span className="text-gray-400 text-sm">/5</span>
            </div>
          </div>
          
          {/* Ultra-enhanced Progress Bar */}
          <div className="relative">
            <div className="w-full bg-slate-700/60 rounded-full h-4 overflow-hidden shadow-inner">
              <div 
                className={`h-4 rounded-full transition-all duration-1500 ease-out bg-gradient-to-r ${levelColors[skill.level as keyof typeof levelColors]} relative overflow-hidden ${
                  isVisible ? 'animate-pulse' : ''
                }`}
                style={{ 
                  width: isVisible ? `${(skill.level / 5) * 100}%` : '0%',
                  transitionDelay: `${index * 0.2}s`
                }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-full group-hover:animate-ping"></div>
              </div>
            </div>
            
            {/* Enhanced skill level indicators */}
            <div className="flex justify-between mt-4">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
                    level <= skill.level 
                      ? `bg-gradient-to-r ${levelColors[skill.level as keyof typeof levelColors]} shadow-lg transform scale-110` 
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                >
                  {level <= skill.level && (
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${levelColors[skill.level as keyof typeof levelColors]} animate-ping opacity-30`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced floating particles for extra visual appeal */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-700 animate-bounce"
            style={{
              left: `${15 + i * 25}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
    </div>
  )
}
