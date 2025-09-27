'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Search, Calendar, Clock, TrendingUp, AlertCircle } from 'lucide-react'
import Link from 'next/link'

// Mock data for medical histories
const medicalHistories = [
  {
    id: 1,
    cadetName: 'Vipin Kumar',
    battalion: '12th Battalion',
    lastVisit: '2025-09-26',
    totalVisits: 2,
    status: 'Healthy',
    recentDiagnosis: 'Follow-up Checkup - Satisfactory',
    totalLeaveDays: 5,
  },
  {
    id: 2,
    cadetName: 'Ankush Sharma',
    battalion: '12th Battalion',
    lastVisit: '2025-09-26',
    totalVisits: 3,
    status: 'Healthy',
    recentDiagnosis: 'Annual Vaccination - Completed',
    totalLeaveDays: 8,
  },
  {
    id: 3,
    cadetName: 'Gaurav Singh',
    battalion: '12th Battalion',
    lastVisit: '2025-08-15',
    totalVisits: 1,
    status: 'Healthy',
    recentDiagnosis: 'Minor Cut - Healed',
    totalLeaveDays: 1,
  },
]

export default function MedicalHistoryListPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredHistories = medicalHistories.filter(history => {
    const matchesSearch = history.cadetName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || history.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Healthy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'Under Treatment':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'Recovered':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'Chronic Condition':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Medical History
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              View and manage medical histories for all cadets.
            </p>
          </div>
          <Link href="/medical-records/new" className="btn-primary">
            Add New Record
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Records</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">6</p>
              </div>
              <Calendar className="h-8 w-8 text-primary/20" />
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
              </div>
              <Clock className="h-8 w-8 text-green-500/20" />
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Cases</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500/20" />
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Leave Days</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">14</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500/20" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by cadet name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="Healthy">Healthy</option>
              <option value="Under Treatment">Under Treatment</option>
              <option value="Recovered">Recovered</option>
              <option value="Chronic Condition">Chronic Condition</option>
            </select>
          </div>
        </div>

        {/* Medical Histories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistories.map((history) => (
            <Link
              key={history.id}
              href={`/medical-history/${history.id}`}
              className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {history.cadetName.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {history.cadetName}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {history.battalion}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(history.status)}`}>
                  {history.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Last Visit:</span>
                  <span className="text-gray-900 dark:text-white">{history.lastVisit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Total Visits:</span>
                  <span className="text-gray-900 dark:text-white">{history.totalVisits}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Total Leave:</span>
                  <span className="text-red-600 dark:text-red-400 font-medium">{history.totalLeaveDays} days</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">Recent Diagnosis:</p>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {history.recentDiagnosis}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
