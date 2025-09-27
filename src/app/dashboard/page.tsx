'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Search, Calendar, Users, Activity, TrendingUp, X } from 'lucide-react'
import Link from 'next/link'

// Mock data for stats
const stats = [
  { label: 'Total Cadets', value: '3', icon: Users, change: '+0%' },
  { label: 'Active Cases', value: '2', icon: Activity, change: '-25%' },
  { label: 'This Month', value: '6', icon: Calendar, change: '+20%' },
  { label: 'Recovery Rate', value: '83%', icon: TrendingUp, change: '+5%' },
]

// Mock data for recent cadets
const recentCadets = [
  { id: 1, name: 'Vipin Kumar', battalion: '12th Battalion', company: 'Alpha', lastActivity: '2025-09-26', status: 'Active', joinDate: '2025-06-15' },
  { id: 2, name: 'Ankush Sharma', battalion: '12th Battalion', company: 'Gamma', lastActivity: '2025-09-26', status: 'Active', joinDate: '2025-07-01' },
  { id: 3, name: 'Gaurav Singh', battalion: '12th Battalion', company: 'Beta', lastActivity: '2025-08-15', status: 'Active', joinDate: '2025-05-20' },
].sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())

// Tooltip data for stats
const tooltipData = {
  'Total Cadets': {
    title: 'All Cadets',
    items: recentCadets.map(cadet => ({
      name: cadet.name,
      details: `${cadet.battalion}, ${cadet.company} - Joined: ${cadet.joinDate}`,
      status: cadet.status
    }))
  },
  'Active Cases': {
    title: 'Current Active Medical Cases',
    items: [
      {
        name: 'Vipin Kumar',
        details: 'Ankle Sprain (Grade 2) - 5 days leave',
        status: 'Active'
      },
      {
        name: 'Ankush Sharma',
        details: 'Viral Fever - 8 days leave',
        status: 'Active'
      }
    ]
  },
  'This Month': {
    title: 'September 2025 Activities',
    items: [
      { name: 'Vipin Kumar', details: 'Follow-up Checkup - 26 Sep', status: 'Completed' },
      { name: 'Ankush Sharma', details: 'Annual Vaccination - 26 Sep', status: 'Completed' },
      { name: 'Ankush Sharma', details: 'Dental Checkup - 22 Sep', status: 'Completed' },
      { name: 'Vipin Kumar', details: 'Ankle Sprain Treatment - 20 Sep', status: 'Active' },
      { name: 'Ankush Sharma', details: 'Viral Fever - 14 Sep', status: 'Completed' },
      { name: 'Gaurav Singh', details: 'Minor Cut Treatment - 15 Aug', status: 'Completed' }
    ]
  },
  'Recovery Rate': {
    title: 'Recovery Statistics',
    items: [
      { name: 'Total Cases', details: '6 medical cases recorded', status: 'Info' },
      { name: 'Recovered', details: '5 cases fully recovered (83%)', status: 'Success' },
      { name: 'Active', details: '1 case still under treatment (17%)', status: 'Active' },
      { name: 'Average Recovery', details: '3-8 days per case', status: 'Info' }
    ]
  }
}

export default function DashboardPage() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Overview of medical records and cadet health status
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <Link href="/medical-records/new" className="btn-primary">
              Add New Record
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="card p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm">
                      <span className={`font-medium ${
                        stat.change.startsWith('+')
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400"> from last month</span>
                    </p>
                  </div>
                  <div
                    className="p-3 bg-primary/10 dark:bg-primary/20 rounded-lg cursor-pointer hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors relative"
                    onMouseEnter={() => setActiveTooltip(stat.label)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <Icon className="h-6 w-6 text-primary" />

                    {/* Tooltip */}
                    {activeTooltip === stat.label && tooltipData[stat.label as keyof typeof tooltipData] && (
                      <div className="absolute z-50 top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {tooltipData[stat.label as keyof typeof tooltipData].title}
                          </h4>
                          <button
                            onClick={() => setActiveTooltip(null)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {tooltipData[stat.label as keyof typeof tooltipData].items.map((item, index) => (
                            <div key={index} className="flex items-start justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {item.details}
                                </p>
                              </div>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${
                                item.status === 'Active'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                  : item.status === 'Success'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : item.status === 'Completed'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Cadets Table */}
        <div className="card">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Cadet Activity
              </h3>
              <Link
                href="/cadets"
                className="text-sm text-primary hover:text-primary/80"
              >
                View all cadets →
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by cadet name..."
                  className="input-field pl-10"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Cadet Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Battalion
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentCadets.map((cadet) => (
                  <tr key={cadet.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-medium">
                            {cadet.name.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {cadet.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {cadet.battalion}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {cadet.company}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {cadet.joinDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        cadet.status === 'Active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}>
                        {cadet.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {cadet.lastActivity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/medical-history/${cadet.id}`}
                        className="text-primary hover:text-primary/80 font-medium text-sm"
                      >
                        View History
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
