'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Save, Home, TrendingUp } from 'lucide-react'

interface HomeStats {
  id?: string
  yearsExperience: string
  projectsDone: string
  clientSatisfaction: string
  heroTitle: string
  heroBio: string
}

export default function AdminHomeSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<HomeStats>({
    yearsExperience: '3+',
    projectsDone: '50+',
    clientSatisfaction: '100%',
    heroTitle: 'Full Stack Developer',
    heroBio: 'I create beautiful, functional, and user-friendly websites and applications with cutting-edge technologies. Welcome to my digital portfolio where innovation meets creativity.'
  })

  useEffect(() => {
    fetchHomeStats()
  }, [])

  const fetchHomeStats = async () => {
    try {
      const response = await fetch('/api/home-stats')
      if (response.ok) {
        const data = await response.json()
        setFormData(data)
      }
    } catch (error) {
      console.error('Error fetching home stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/home-stats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const updatedData = await response.json()
        setFormData(updatedData)
        alert('Home settings updated successfully!')
      } else {
        const errorData = await response.json()
        console.error('Error response:', errorData)
        alert(`Error: ${errorData.error || 'Failed to update home settings'}`)
      }
    } catch (error) {
      console.error('Error saving home stats:', error)
      alert('Error saving home settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout title="Home Settings">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Home Settings">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Home Page Settings</h2>
                <p className="text-gray-600">Manage hero section content and statistics</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Hero Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Hero Title
                  </label>
                  <input
                    type="text"
                    id="heroTitle"
                    name="heroTitle"
                    value={formData.heroTitle}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Full Stack Developer"
                  />
                </div>

                <div>
                  <label htmlFor="heroBio" className="block text-sm font-medium text-gray-700 mb-2">
                    Hero Bio / Description
                  </label>
                  <textarea
                    id="heroBio"
                    name="heroBio"
                    value={formData.heroBio}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Write your bio description here..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This will appear as the main description in your hero section
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 mb-2">
                    Years Experience
                  </label>
                  <input
                    type="text"
                    id="yearsExperience"
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., 3+"
                  />
                </div>

                <div>
                  <label htmlFor="projectsDone" className="block text-sm font-medium text-gray-700 mb-2">
                    Projects Done
                  </label>
                  <input
                    type="text"
                    id="projectsDone"
                    name="projectsDone"
                    value={formData.projectsDone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., 50+"
                  />
                </div>

                <div>
                  <label htmlFor="clientSatisfaction" className="block text-sm font-medium text-gray-700 mb-2">
                    Client Satisfaction
                  </label>
                  <input
                    type="text"
                    id="clientSatisfaction"
                    name="clientSatisfaction"
                    value={formData.clientSatisfaction}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., 100%"
                  />
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <Home className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
              </div>

              <div className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-indigo-900/30 p-8 rounded-xl text-white">
                <div className="space-y-6">
                  <h4 className="text-2xl font-bold text-center">{formData.heroTitle}</h4>
                  
                  <p className="text-gray-300 leading-relaxed text-center max-w-2xl mx-auto">
                    {formData.heroBio}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-6 mt-8">
                    <div className="text-center p-4 bg-slate-800/60 rounded-xl">
                      <div className="text-2xl font-bold text-blue-400 mb-1">{formData.yearsExperience}</div>
                      <div className="text-sm text-gray-300">Years Experience</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/60 rounded-xl">
                      <div className="text-2xl font-bold text-purple-400 mb-1">{formData.projectsDone}</div>
                      <div className="text-sm text-gray-300">Projects Done</div>
                    </div>
                    <div className="text-center p-4 bg-slate-800/60 rounded-xl">
                      <div className="text-2xl font-bold text-emerald-400 mb-1">{formData.clientSatisfaction}</div>
                      <div className="text-sm text-gray-300">Client Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
