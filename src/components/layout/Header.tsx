'use client'

import { User, Menu, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
import ThemeToggle from '@/components/theme/ThemeToggle'

export default function Header() {
  const [username, setUsername] = useState('')

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  return (
    <header className="border-b border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                MIRROOM
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Welcome, {username || 'User'}
              </span>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
