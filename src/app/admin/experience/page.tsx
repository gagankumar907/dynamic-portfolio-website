'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Briefcase,
  MapPin,
  Calendar,
  ExternalLink
} from 'lucide-react'
import { formatDateShort, parseJSON } from '@/lib/utils'

interface Experience {
  id?: string
  company: string
  position: string
  description: string
  startDate: string
  endDate: string
  current: boolean
  location: string
  website: string
  technologies: string[]
  order: number
}

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [formData, setFormData] = useState<Experience>({
    company: '',
    position: '',
    description: '',
    startDate: '',
    endDate: '',
    current: false,
    location: '',
    website: '',
    technologies: [],
    order: 0
  })
  const [saving, setSaving] = useState(false)
  const [techInput, setTechInput] = useState('')

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }))
      setTechInput('')
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }

  const openForm = (experience?: Experience) => {
    if (experience) {
      setEditingExperience(experience)
      setFormData({
        ...experience,
        // Ensure all string fields are not null
        company: experience.company || '',
        position: experience.position || '',
        description: experience.description || '',
        location: experience.location || '',
        website: experience.website || '',
        technologies: parseJSON(experience.technologies as any, []),
        startDate: experience.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
        endDate: experience.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : '',
        current: experience.current || false,
        order: experience.order || 0
      })
    } else {
      setEditingExperience(null)
      setFormData({
        company: '',
        position: '',
        description: '',
        startDate: '',
        endDate: '',
        current: false,
        location: '',
        website: '',
        technologies: [],
        order: 0
      })
    }
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingExperience(null)
    setTechInput('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = editingExperience ? `/api/experiences/${editingExperience.id}` : '/api/experiences'
      const method = editingExperience ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          startDate: new Date(formData.startDate),
          endDate: formData.endDate ? new Date(formData.endDate) : null,
        })
      })

      if (response.ok) {
        await fetchExperiences()
        closeForm()
      }
    } catch (error) {
      console.error('Error saving experience:', error)
    } finally {
      setSaving(false)
    }
  }

  const deleteExperience = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        const response = await fetch(`/api/experiences/${id}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          await fetchExperiences()
        }
      } catch (error) {
        console.error('Error deleting experience:', error)
      }
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Experience Management">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Experience Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Work Experience ({experiences.length})</h1>
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add Experience
          </button>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700"></div>
            
            <div className="space-y-8">
              {experiences.map((experience) => {
                const technologies = parseJSON<string[]>(experience.technologies as any, [])
                
                return (
                  <div key={experience.id} className="relative flex items-start">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-800 border-4 border-gray-700 flex items-center justify-center relative z-10">
                      <Briefcase size={20} className={experience.current ? 'text-green-400' : 'text-blue-400'} />
                    </div>
                    
                    {/* Content */}
                    <div className="ml-8 flex-1">
                      <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
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
                            <div className="flex flex-wrap gap-4 text-gray-400 text-sm mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {formatDateShort(experience.startDate)} - {experience.current ? 'Present' : experience.endDate ? formatDateShort(experience.endDate) : 'Present'}
                              </div>
                              {experience.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin size={14} />
                                  {experience.location}
                                </div>
                              )}
                              {experience.current && (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                  Current
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => openForm(experience)}
                              className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              <Edit size={14} />
                              Edit
                            </button>
                            <button
                              onClick={() => deleteExperience(experience.id!)}
                              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
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
              })}
            </div>
          </div>
        </div>

        {experiences.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No work experience found.</p>
            <button
              onClick={() => openForm()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Add Your First Experience
            </button>
          </div>
        )}

        {/* Experience Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  {editingExperience ? 'Edit Experience' : 'Add New Experience'}
                </h2>
                <button
                  onClick={closeForm}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Company & Position */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Company Name"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Position *
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Job Title/Position"
                    />
                  </div>
                </div>

                {/* Location & Website */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="City, Country"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Company Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://company.com"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      disabled={formData.current}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Current Job Checkbox */}
                <div>
                  <label className="flex items-center gap-2 text-white">
                    <input
                      type="checkbox"
                      name="current"
                      checked={formData.current}
                      onChange={handleInputChange}
                      className="rounded"
                    />
                    This is my current position
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Job Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Describe your role, responsibilities, and achievements..."
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Technologies Used
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter technology name"
                    />
                    <button
                      type="button"
                      onClick={addTechnology}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(tech)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-700">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        {editingExperience ? 'Update Experience' : 'Create Experience'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
