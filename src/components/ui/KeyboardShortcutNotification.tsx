'use client'

import { useState, useEffect } from 'react'
import { X, Keyboard } from 'lucide-react'

export function KeyboardShortcutNotification() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show notification after 3 seconds if user hasn't seen it before
    const hasSeenNotification = localStorage.getItem('keyboard-shortcut-seen')
    if (!hasSeenNotification) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('keyboard-shortcut-seen', 'true')
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 max-w-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Keyboard className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-white">
                Quick Admin Access
              </h4>
              <p className="text-xs text-gray-300 mt-1">
                Press <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded">Shift</kbd> + <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded">A</kbd> for quick admin access
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
