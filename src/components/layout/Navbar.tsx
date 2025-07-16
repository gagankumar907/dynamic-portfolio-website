'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Settings } from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Keyboard shortcut for admin (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault()
        window.open('/admin/login', '_blank')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const openAdminPanel = () => {
    window.open('/admin/login', '_blank')
  }

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={() => {
                    const element = document.querySelector(item.href)
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Admin Link */}
          <div className="hidden md:block">
            <button
              onClick={openAdminPanel}
              className="group relative inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 transform hover:scale-105"
              title="Admin Panel (Ctrl+Shift+A)"
            >
              <Settings className="w-4 h-4 mr-1.5" />
              Admin
              <span className="absolute inset-0 border border-blue-400 rounded-md opacity-0 group-hover:opacity-50 transition-opacity duration-200"></span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-md"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => {
                  setIsMenuOpen(false)
                  const element = document.querySelector(item.href)
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false)
                openAdminPanel()
              }}
              className="group flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium w-full transition-all duration-200"
              title="Admin Panel (Ctrl+Shift+A)"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin Panel
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
