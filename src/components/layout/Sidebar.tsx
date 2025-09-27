'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Activity, Plus, FileText, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Cadet Records', href: '/cadets', icon: Users },
  { name: 'Medical History', href: '/medical-history', icon: Activity },
  { name: 'Add Record', href: '/medical-records/new', icon: Plus },
  { name: 'Reports', href: '/reports', icon: FileText },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
    router.push('/')
  }

  return (
    <aside className="w-64 flex-col bg-white dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700/50 p-4 hidden lg:flex">
      <div className="flex flex-col gap-y-2 mb-8">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">MIRROOM</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Attendant Portal</p>
      </div>
      
      <nav className="flex-1 flex flex-col gap-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors
                ${isActive 
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-auto"
      >
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>
    </aside>
  )
}
