'use client'

import { useEffect, useState } from 'react'

interface Skill {
  id: string
  name: string
  category: string
  level: number
  icon?: string
  color?: string
}

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSkills()
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

  const categories = Object.keys(skillsByCategory)

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-gray-800/50">
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
    <section id="skills" className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Here are the technologies and skills I work with to bring ideas to life.
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-xl font-semibold text-white mb-6 capitalize">
                  {category.replace('-', ' ')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skillsByCategory[category].map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No skills data available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white font-medium">{skill.name}</h4>
        {skill.icon && (
          <span className="text-2xl" style={{ color: skill.color || '#ffffff' }}>
            {skill.icon}
          </span>
        )}
      </div>
      
      {/* Skill Level Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Proficiency</span>
          <span className="text-gray-400 text-sm">{skill.level}/5</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(skill.level / 5) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
