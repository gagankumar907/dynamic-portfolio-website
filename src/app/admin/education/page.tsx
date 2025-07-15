'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  GraduationCap,
  MapPin,
  Calendar,
  Award,
  ExternalLink
} from 'lucide-react'
import { formatDateShort } from '@/lib/utils'

interface Education {
  id?: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
  description?: string
  location?: string
  website?: string
  order: number
}

export default function AdminEducation() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | null>(null)
  const [formData, setFormData] = useState<Education>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: '',
    location: '',
    website: '',
    order: 0
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchEducation()
  }, [])

  const fetchEducation = async () => {
    try {
      const response = await fetch('/api/education')
      if (response.ok) {
        const data = await response.json()
        setEducation(data)
      }
    } catch (error) {
      console.error('Error fetching education:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const openForm = (educationItem?: Education) => {
    if (educationItem) {
      setEditingEducation(educationItem)
      setFormData({
        ...educationItem,
        // Ensure all string fields are not null
        institution: educationItem.institution || '',
        degree: educationItem.degree || '',
        field: educationItem.field || '',
        gpa: educationItem.gpa || '',
        description: educationItem.description || '',
        location: educationItem.location || '',
        website: educationItem.website || '',
        startDate: educationItem.startDate ? new Date(educationItem.startDate).toISOString().split('T')[0] : '',
        endDate: educationItem.endDate ? new Date(educationItem.endDate).toISOString().split('T')[0] : '',
        order: educationItem.order || 0
      })
    } else {
      setEditingEducation(null)
      setFormData({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: '',
        location: '',
        website: '',
        order: 0
      })
    }
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingEducation(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const url = editingEducation ? `/api/education/${editingEducation.id}` : '/api/education'
      const method = editingEducation ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          startDate: new Date(formData.startDate),
          endDate: new Date(formData.endDate),
        })
      })

      if (response.ok) {
        await fetchEducation()
        closeForm()
      }
    } catch (error) {
      console.error('Error saving education:', error)
    } finally {
      setSaving(false)
    }
  }

  const deleteEducation = async (id: string) => {
    if (confirm('Are you sure you want to delete this education record?')) {
      try {
        const response = await fetch(`/api/education/${id}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          await fetchEducation()
        }
      } catch (error) {
        console.error('Error deleting education:', error)
      }
    }
  }

  const getDegreeIcon = (degree: string) => {
    if (degree.toLowerCase().includes('phd') || degree.toLowerCase().includes('doctorate')) {
      return <Award className="text-yellow-400" size={20} />
    } else if (degree.toLowerCase().includes('master') || degree.toLowerCase().includes('mba')) {
      return <GraduationCap className="text-blue-400" size={20} />
    } else {
      return <GraduationCap className="text-green-400" size={20} />
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Education Management">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Education Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Education ({education.length})</h1>
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add Education
          </button>
        </div>

        {/* Education Cards */}
        <div className="grid gap-6">
          {education.map((edu) => (
            <div key={edu.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                    {getDegreeIcon(edu.degree)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {edu.degree} in {edu.field}
                    </h3>
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                      <span className="font-medium">{edu.institution}</span>
                      {edu.website && (
                        <a
                          href={edu.website}
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
                        {formatDateShort(edu.startDate)} - {formatDateShort(edu.endDate)}
                      </div>
                      {edu.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {edu.location}
                        </div>
                      )}
                      {edu.gpa && (
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          GPA: {edu.gpa}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openForm(edu)}
                    className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEducation(edu.id!)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
              
              {edu.description && (
                <p className="text-gray-300 leading-relaxed">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {education.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No education records found.</p>
            <button
              onClick={() => openForm()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Add Your First Education
            </button>
          </div>
        )}

        {/* Education Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  {editingEducation ? 'Edit Education' : 'Add New Education'}
                </h2>
                <button
                  onClick={closeForm}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Institution & Degree */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Institution *
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="University/College Name"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Degree *
                    </label>
                    <select
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Degree</option>
                      <option value="High School Diploma">High School Diploma</option>
                      <option value="Associate's Degree">Associate's Degree</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="MBA">MBA</option>
                      <option value="PhD">PhD</option>
                      <option value="Doctorate">Doctorate</option>
                      <option value="Certificate">Certificate</option>
                      <option value="Diploma">Diploma</option>
                    </select>
                  </div>
                </div>

                {/* Field of Study */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Field of Study *
                  </label>
                  <input
                    type="text"
                    name="field"
                    value={formData.field}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Computer Science, Business Administration, etc."
                  />
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
                      Institution Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://university.edu"
                    />
                  </div>
                </div>

                {/* Dates & GPA */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      GPA (Optional)
                    </label>
                    <input
                      type="text"
                      name="gpa"
                      value={formData.gpa}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="3.8/4.0"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Achievements, honors, relevant coursework, etc."
                  />
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
                        {editingEducation ? 'Update Education' : 'Create Education'}
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
