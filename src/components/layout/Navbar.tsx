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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-b border-blue-500/20 shadow-lg shadow-blue-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="group text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent hover:scale-110 transition-all duration-300 hover:drop-shadow-lg"
            >
              <span className="relative">
                Portfolio
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group relative text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-700/50 hover:scale-105 hover:shadow-md"
                  onClick={() => {
                    const element = document.querySelector(item.href)
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Admin Link */}
          <div className="hidden md:block">
            <button
              onClick={openAdminPanel}
              className="group relative inline-flex items-center justify-center bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              title="Admin Panel (Ctrl+Shift+A)"
            >
              <Settings className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90" />
              <span className="relative z-10">Admin</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-50 blur transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group relative text-gray-400 hover:text-white hover:bg-gray-700/50 p-2 rounded-lg transition-all duration-300 hover:scale-110"
            >
              <div className="relative z-10">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-fadeIn">
          <div className="px-4 pt-4 pb-6 space-y-2 bg-gradient-to-br from-gray-800/95 via-gray-900/95 to-gray-800/95 backdrop-blur-xl border-t border-gray-700/50 shadow-lg">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative text-gray-300 hover:text-white hover:bg-gray-700/50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
                onClick={() => {
                  setIsMenuOpen(false)
                  const element = document.querySelector(item.href)
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false)
                openAdminPanel()
              }}
              className="group relative flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg text-base font-medium w-full transition-all duration-300 hover:scale-105 hover:shadow-lg mt-4"
              title="Admin Panel (Ctrl+Shift+A)"
            >
              <Settings className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:rotate-90" />
              <span className="relative z-10">Admin Panel</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
