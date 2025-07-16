'use client'

import { Heart, Github, Linkedin, Twitter, Code, Sparkles } from 'lucide-react'

const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
      aria-label="Scroll to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Portfolio
            </h3>
            <p className="text-gray-400 max-w-md">
              Crafting digital experiences with passion and precision. Always learning, always growing.
            </p>
          </div>

          {/* Quick links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
              <Code className="w-5 h-5 text-blue-400" />
              Quick Links
            </h4>
            <div className="space-y-2">
              {['About', 'Projects', 'Skills', 'Experience', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-400 hover:text-white transition-colors duration-300 hover:scale-105 transform"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-center md:justify-end gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Connect
            </h4>
            <div className="flex justify-center md:justify-end space-x-4">
              {[
                { icon: Github, href: 'https://github.com/gagankumar907', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/gagankumar907', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://twitter.com/gagankumar907', label: 'Twitter' }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 flex items-center gap-2 text-center md:text-left">
              Made with 
              <Heart size={16} className="text-red-500 animate-pulse" /> 
              using 
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Next.js
              </span>
              & 
              <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tailwind CSS
              </span>
            </p>
            <p className="text-gray-500 text-sm">
              © {currentYear} Portfolio. All rights reserved.
            </p>
          </div>
        </div>

        {/* Scroll to top button */}
        <ScrollToTopButton />
      </div>
    </footer>
  )
}
