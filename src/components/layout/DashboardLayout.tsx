'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from './Header'
import Sidebar from './Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [router])

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 lg:p-8 bg-background-light dark:bg-background-dark">
          {children}
        </main>
      </div>
    </div>
  )
}
