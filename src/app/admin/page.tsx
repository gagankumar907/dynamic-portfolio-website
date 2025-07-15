'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { 
  FolderOpen, 
  Award, 
  Briefcase, 
  Mail, 
  User,
  TrendingUp,
  Eye,
  MessageSquare,
  GraduationCap
} from 'lucide-react'

interface Stats {
  projects: number
  skills: number
  experiences: number
  education: number
  messages: number
  unreadMessages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    skills: 0,
    experiences: 0,
    education: 0,
    messages: 0,
    unreadMessages: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [projectsRes, skillsRes, experiencesRes, educationRes, messagesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/experiences'),
        fetch('/api/education'),
        fetch('/api/contact')
      ])

      const [projects, skills, experiences, education, messages] = await Promise.all([
        projectsRes.json(),
        skillsRes.json(),
        experiencesRes.json(),
        educationRes.json(),
        messagesRes.json()
      ])

      // Ensure all data is an array, fallback to empty array if not
      const projectsArray = Array.isArray(projects) ? projects : []
      const skillsArray = Array.isArray(skills) ? skills : []
      const experiencesArray = Array.isArray(experiences) ? experiences : []
      const educationArray = Array.isArray(education) ? education : []
      const messagesArray = Array.isArray(messages) ? messages : []

      const unreadMessages = messagesArray.filter((msg: any) => !msg.read).length

      setStats({
        projects: projectsArray.length || 0,
        skills: skillsArray.length || 0,
        experiences: experiencesArray.length || 0,
        education: educationArray.length || 0,
        messages: messagesArray.length || 0,
        unreadMessages: unreadMessages || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      name: 'Total Projects',
      value: stats.projects,
      icon: FolderOpen,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      name: 'Skills',
      value: stats.skills,
      icon: Award,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      name: 'Work Experience',
      value: stats.experiences,
      icon: Briefcase,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
    {
      name: 'Education',
      value: stats.education,
      icon: GraduationCap,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-400/10'
    },
    {
      name: 'Total Messages',
      value: stats.messages,
      icon: Mail,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    },
    {
      name: 'Unread Messages',
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10'
    }
  ]

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            Welcome to Your Portfolio Admin Panel
          </h1>
          <p className="text-gray-400">
            Manage your portfolio content, view messages, and update your information from here.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.name}</p>
                    <p className="text-2xl font-bold text-white">
                      {loading ? '-' : stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon size={24} className={stat.color} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a
                href="/admin/projects"
                className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <FolderOpen size={20} className="text-blue-400" />
                <span className="text-white">Manage Projects</span>
              </a>
              <a
                href="/admin/profile"
                className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <User size={20} className="text-green-400" />
                <span className="text-white">Update Profile</span>
              </a>
              <a
                href="/admin/messages"
                className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <MessageSquare size={20} className="text-yellow-400" />
                <span className="text-white">View Messages</span>
              </a>
              <a
                href="/"
                target="_blank"
                className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Eye size={20} className="text-purple-400" />
                <span className="text-white">View Live Site</span>
              </a>
            </div>
          </div>

          {/* Portfolio Status */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Portfolio Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Profile Completion</span>
                <span className="text-green-400 font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Last Updated</span>
                  <span className="text-white">Today</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Total Views</span>
                  <span className="text-white">1,234</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Featured Projects</span>
                  <span className="text-white">{stats.projects > 0 ? '2' : '0'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-400 mb-2">💡 Tips</h2>
          <ul className="text-gray-300 space-y-1 text-sm">
            <li>• Keep your profile information up to date for better visibility</li>
            <li>• Add featured projects to showcase your best work</li>
            <li>• Regularly check and respond to messages from potential clients</li>
            <li>• Update your skills list as you learn new technologies</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  )
}
