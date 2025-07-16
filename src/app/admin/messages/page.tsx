'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { 
  Mail, 
  User, 
  Calendar, 
  MessageSquare, 
  Phone,
  Eye,
  Trash2,
  X,
  Reply
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact')
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ read: true })
      })

      if (response.ok) {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === id ? { ...msg, read: true } : msg
          )
        )
      }
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await fetch(`/api/contact/${id}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          setMessages(prev => prev.filter(msg => msg.id !== id))
          if (selectedMessage?.id === id) {
            setShowMessageModal(false)
            setSelectedMessage(null)
          }
        }
      } catch (error) {
        console.error('Error deleting message:', error)
      }
    }
  }

  const openMessage = async (message: ContactMessage) => {
    setSelectedMessage(message)
    setShowMessageModal(true)
    
    if (!message.read) {
      await markAsRead(message.id)
    }
  }

  const closeMessageModal = () => {
    setShowMessageModal(false)
    setSelectedMessage(null)
  }

  const sendEmail = (email: string, subject: string) => {
    const mailtoLink = `mailto:${email}?subject=Re: ${subject}`
    window.open(mailtoLink, '_blank')
  }

  const filteredMessages = messages.filter(message => {
    if (filter === 'unread') return !message.read
    if (filter === 'read') return message.read
    return true
  })

  const unreadCount = messages.filter(msg => !msg.read).length

  if (loading) {
    return (
      <AdminLayout title="Contact Messages">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Contact Messages">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Contact Messages ({messages.length})</h1>
            {unreadCount > 0 && (
              <p className="text-yellow-400 text-sm mt-1">
                {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All ({messages.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === 'unread' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === 'read' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Read ({messages.length - unreadCount})
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`bg-gray-800 rounded-lg p-6 border-l-4 transition-all hover:bg-gray-750 cursor-pointer ${
                message.read ? 'border-gray-600' : 'border-yellow-500'
              }`}
              onClick={() => openMessage(message)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-white font-medium">{message.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-gray-300 text-sm">{message.email}</span>
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-400" />
                        <span className="text-gray-300 text-sm">{message.phone}</span>
                      </div>
                    )}
                    {!message.read && (
                      <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">
                        NEW
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-medium text-white mb-2">
                    {message.subject}
                  </h3>
                  
                  <p className="text-gray-300 line-clamp-2 mb-3">
                    {message.message}
                  </p>
                  
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar size={14} />
                    {formatDate(message.createdAt)}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      openMessage(message)
                    }}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    <Eye size={14} />
                    View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      sendEmail(message.email, message.subject)
                    }}
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    <Reply size={14} />
                    Reply
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteMessage(message.id)
                    }}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-20">
            <MessageSquare size={64} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg mb-2">
              {filter === 'all' ? 'No messages found.' : `No ${filter} messages found.`}
            </p>
            <p className="text-gray-500">
              Messages from your contact form will appear here.
            </p>
          </div>
        )}

        {/* Message Detail Modal */}
        {showMessageModal && selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Message Details</h2>
                <button
                  onClick={closeMessageModal}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Sender Info */}
                <div className="bg-gray-750 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-white mb-3">From</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-white">{selectedMessage.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" />
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                    {selectedMessage.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-400" />
                        <a
                          href={`tel:${selectedMessage.phone}`}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          {selectedMessage.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-300">{formatDate(selectedMessage.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Subject</h3>
                  <p className="text-gray-300 bg-gray-750 rounded-lg p-3">
                    {selectedMessage.subject}
                  </p>
                </div>

                {/* Message */}
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Message</h3>
                  <div className="bg-gray-750 rounded-lg p-4">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-700">
                  <button
                    onClick={() => sendEmail(selectedMessage.email, selectedMessage.subject)}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <Reply size={18} />
                    Reply via Email
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                    Delete Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
