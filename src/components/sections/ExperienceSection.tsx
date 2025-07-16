'use client'

import { useEffect, useState } from 'react'
import { MapPin, ExternalLink, Calendar, Briefcase, Building, TrendingUp } from 'lucide-react'
import { formatDateShort, parseJSON } from '@/lib/utils'

interface Experience {
  id: string
  company: string
  position: string
  description: string
  startDate: string
  endDate?: string
  current: boolean
  location?: string
  website?: string
  technologies?: string
}

export function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    fetchExperiences()
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    const element = document.getElementById('experience')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/api/experiences')
      if (response.ok) {
        const data = await response.json()
        setExperiences(data)
      }
    } catch (error) {
      console.error('Error fetching experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="experience" className="py-24">
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
    <section id="experience" className="relative py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gray-800/50 px-6 py-3 rounded-full mb-6 glass-morphism">
            <Briefcase className="w-5 h-5 text-orange-500" />
            <span className="text-gray-300 font-medium">Professional Journey</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Work{' '}
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            My professional journey through different roles and companies, building experience 
            and expertise in modern web development.
          </p>
        </div>

        {experiences.length > 0 ? (
          <div className={`relative ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-red-500 to-pink-500 transform md:-translate-x-0.5"></div>
            
            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <ExperienceCard 
                  key={experience.id} 
                  experience={experience} 
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-12 h-12 text-gray-500" />
            </div>
            <p className="text-gray-400 text-xl">
              No experience data available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function ExperienceCard({ experience, index, isVisible }: { experience: Experience; index: number; isVisible: boolean }) {
  const technologies = parseJSON<string[]>(experience.technologies || '[]', [])
  const isEven = index % 2 === 0
  
  return (
    <div 
      className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      {/* Timeline node */}
      <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transform md:-translate-x-2 z-10 shadow-lg shadow-orange-500/50">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-ping opacity-75"></div>
      </div>
      
      {/* Content card */}
      <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${isEven ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
        <div className="group relative bg-gray-800/50 p-6 md:p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl glass-morphism">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Building className="w-5 h-5 text-orange-400" />
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                    {experience.company}
                  </h3>
                  {experience.website && (
                    <a
                      href={experience.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <h4 className="text-lg font-semibold text-gray-200 mb-3">
                  {experience.position}
                </h4>
              </div>
              
              {experience.current && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-300 text-sm font-medium rounded-full border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Current
                </span>
              )}
            </div>

            {/* Duration and location */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-400" />
                <span>
                  {formatDateShort(experience.startDate)} - {experience.current ? 'Present' : formatDateShort(experience.endDate!)}
                </span>
              </div>
              {experience.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-6">
              {experience.description}
            </p>

            {/* Technologies */}
            {technologies.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium text-gray-400">Technologies Used</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600/50 hover:border-orange-500/50 hover:text-orange-300 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
