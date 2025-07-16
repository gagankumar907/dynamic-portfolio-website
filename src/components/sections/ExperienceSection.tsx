'use client'

import { useEffect, useState } from 'react'
import { MapPin, ExternalLink, Calendar } from 'lucide-react'
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

  useEffect(() => {
    fetchExperiences()
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
      <section id="experience" className="py-20">
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
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Work Experience
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey and the experiences that shaped my career.
          </p>
        </div>

        {experiences.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700"></div>
              
              <div className="space-y-8">
                {experiences.map((experience) => (
                  <ExperienceCard 
                    key={experience.id} 
                    experience={experience} 
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No work experience data available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function ExperienceCard({ experience }: { experience: Experience }) {
  const technologies = parseJSON<string[]>(experience.technologies || '', [])
  
  return (
    <div className="relative flex items-start">
      {/* Timeline dot */}
      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-800 border-4 border-gray-700 flex items-center justify-center relative z-10">
        <div className={`w-4 h-4 rounded-full ${experience.current ? 'bg-green-400' : 'bg-blue-400'}`}></div>
      </div>
      
      {/* Content */}
      <div className="ml-8 flex-1">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">
                {experience.position}
              </h3>
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <span className="font-medium">{experience.company}</span>
                {experience.website && (
                  <a
                    href={experience.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center text-gray-400 text-sm mb-1">
                <Calendar size={14} className="mr-1" />
                {formatDateShort(experience.startDate)} - {experience.current ? 'Present' : experience.endDate ? formatDateShort(experience.endDate) : 'Present'}
              </div>
              {experience.location && (
                <div className="flex items-center text-gray-400 text-sm">
                  <MapPin size={14} className="mr-1" />
                  {experience.location}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-gray-300 mb-4 leading-relaxed">
            {experience.description}
          </p>
          
          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
