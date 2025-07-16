'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Github, Calendar, Star, Code, Zap, Eye } from 'lucide-react'
import Image from 'next/image'
import { parseJSON, formatDate } from '@/lib/utils'

interface Project {
  id: string
  title: string
  description: string
  content?: string
  image?: string
  images?: string
  technologies: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  status: string
  startDate?: string
  endDate?: string
  createdAt: string
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    fetchProjects()
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    const element = document.getElementById('projects')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    if (filter === 'featured') return project.featured
    if (filter === 'completed') return project.status === 'completed'
    if (filter === 'in-progress') return project.status === 'in-progress'
    return true
  })

  if (loading) {
    return (
      <section id="projects" className="py-24">
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
    <section id="projects" className="relative py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gray-800/50 px-6 py-3 rounded-full mb-6 glass-morphism">
            <Code className="w-5 h-5 text-blue-500" />
            <span className="text-gray-300 font-medium">Portfolio</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Discover the projects that showcase my journey as a developer. Each represents unique challenges, 
            creative solutions, and continuous learning.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { key: 'all', label: 'All Projects', icon: Eye },
              { key: 'featured', label: 'Featured', icon: Star },
              { key: 'completed', label: 'Completed', icon: Zap },
              { key: 'in-progress', label: 'In Progress', icon: Code }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  filter === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
                {filter === key && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className={`${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                  featured={project.featured}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="w-12 h-12 text-gray-500" />
              </div>
              <p className="text-gray-400 text-xl">
                No projects found for this filter. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  const technologies = parseJSON<string[]>(project.technologies, [])
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className={`group relative bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl glass-morphism ${
        featured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Project Image */}
      <div className="relative h-56 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Code className="w-16 h-16 text-gray-500" />
          </div>
        )}
        
        {/* Overlay with quick actions */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-all duration-300 hover:scale-110"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-all duration-300 hover:scale-110"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${
            project.status === 'completed' 
              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
              : project.status === 'in-progress'
              ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
              : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
          }`}>
            {project.status === 'completed' ? 'Completed' : 
             project.status === 'in-progress' ? 'In Progress' : 
             project.status}
          </span>
        </div>

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 text-xs font-medium rounded-full border border-yellow-500/30 backdrop-blur-sm">
              <Star className="w-3 h-3" />
              Featured
            </div>
          </div>
        )}
      </div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
              {project.title}
            </h4>
            {project.startDate && (
              <div className="flex items-center text-gray-400 text-sm mb-3">
                <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                {formatDate(project.startDate)}
                {project.endDate && ` - ${formatDate(project.endDate)}`}
              </div>
            )}
          </div>
        </div>
        
        <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.slice(0, 5).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50 hover:border-blue-500/50 hover:text-blue-300 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 5 && (
            <span className="px-3 py-1 bg-gray-600/50 text-gray-400 text-xs rounded-full">
              +{technologies.length - 5} more
            </span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 border border-gray-600/50 hover:border-gray-500/50"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
