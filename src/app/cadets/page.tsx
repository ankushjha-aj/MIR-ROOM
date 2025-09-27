'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Search, Download, ChevronDown, Eye, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

// Mock data for cadets
const mockCadets = [
  { id: 1, name: 'Vipin Kumar', battalion: '12th Battalion', company: 'Alpha', lastVisit: '2025-09-26', status: 'Active', healthStatus: 'Fit' },
  { id: 2, name: 'Ankush Sharma', battalion: '12th Battalion', company: 'Gamma', lastVisit: '2025-09-26', status: 'Active', healthStatus: 'Fit' },
  { id: 3, name: 'Gaurav Singh', battalion: '12th Battalion', company: 'Beta', lastVisit: '2025-08-15', status: 'Active', healthStatus: 'Fit' },
]

export default function CadetsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBattalion, setSelectedBattalion] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Filter cadets based on search and filters
  const filteredCadets = mockCadets.filter(cadet => {
    const matchesSearch = cadet.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBattalion = selectedBattalion === 'all' || cadet.battalion === selectedBattalion
    const matchesStatus = selectedStatus === 'all' || cadet.status === selectedStatus
    return matchesSearch && matchesBattalion && matchesStatus
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Cadet Records</h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Manage and access cadet medical information efficiently.
            </p>
          </div>
          <div className="mt-4 lg:mt-0 flex gap-2">
            <Link href="/medical-records/new" className="btn-primary">
              Add New Record
            </Link>
            <button className="btn-secondary">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by cadet name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select
                  value={selectedBattalion}
                  onChange={(e) => setSelectedBattalion(e.target.value)}
                  className="appearance-none input-field pr-10 text-sm"
                >
                  <option value="all">All Battalions</option>
                  <option value="12th Battalion">12th Battalion</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none input-field pr-10 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredCadets.length} of {mockCadets.length} cadets
            </p>
          </div>
        </div>

        {/* Cadets Table */}
        <div className="card overflow-hidden">
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
                    Last Visit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Health Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCadets.map((cadet) => (
                  <tr key={cadet.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-medium">
                            {cadet.name.split(' ').map(n => n[0]).join('')}
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
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {cadet.battalion}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {cadet.company}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {cadet.lastVisit}
                      </p>
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
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        cadet.healthStatus === 'Fit'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          : cadet.healthStatus === 'Under Treatment'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : cadet.healthStatus === 'Recovering'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {cadet.healthStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/medical-history/${cadet.id}`}
                          className="text-primary hover:text-primary/80"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
