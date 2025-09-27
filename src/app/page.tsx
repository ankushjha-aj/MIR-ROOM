'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Simple validation
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    // Mock authentication - in real app, this would call an API
    if (formData.username === 'admin' && formData.password === 'admin123') {
      // Store auth status in localStorage for demo
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('username', formData.username)
      router.push('/dashboard')
    } else {
      setError('Invalid username or password')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                MIRROOM
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              User Login
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please enter your credentials to access the system.
            </p>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
              Demo credentials: username: <span className="font-mono">admin</span>, password: <span className="font-mono">admin123</span>
            </p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label 
                  htmlFor="username" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:text-primary/80">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  Login
                </button>
              </div>
            </form>
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            MIRROOM © 2024
          </p>
        </div>
      </main>
    </div>
  )
}
