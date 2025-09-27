'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Download, Calendar, Clock, Filter, FileText } from 'lucide-react'
import { format } from 'date-fns'

interface ReportRecord {
  id: number
  name: string
  battalion: string
  company: string
  lastVisit: string
  condition: string
  status: string
  healthStatus: string
  doctor: string
}

// Mock data for different time periods
const generateMockData = (period: string): ReportRecord[] => {
  const allRecords: ReportRecord[] = [
    {
      id: 1,
      name: 'Vipin Kumar',
      battalion: '12th Battalion',
      company: 'Alpha',
      lastVisit: '2025-09-20',
      condition: 'Ankle Sprain',
      status: 'Active',
      healthStatus: 'Under Treatment',
      doctor: 'Dr. Nitish',
    },
    {
      id: 2,
      name: 'Vipin Kumar',
      battalion: '12th Battalion',
      company: 'Alpha',
      lastVisit: '2025-09-26',
      condition: 'Follow-up Checkup',
      status: 'Active',
      healthStatus: 'Fit',
      doctor: 'Dr. Nitish',
    },
    {
      id: 3,
      name: 'Ankush Sharma',
      battalion: '12th Battalion',
      company: 'Gamma',
      lastVisit: '2025-09-14',
      condition: 'Viral Fever',
      status: 'Active',
      healthStatus: 'Under Treatment',
      doctor: 'Dr. Nitish',
    },
    {
      id: 4,
      name: 'Ankush Sharma',
      battalion: '12th Battalion',
      company: 'Gamma',
      lastVisit: '2025-09-22',
      condition: 'Dental Checkup',
      status: 'Active',
      healthStatus: 'Fit',
      doctor: 'Dr. Nitish',
    },
    {
      id: 5,
      name: 'Ankush Sharma',
      battalion: '12th Battalion',
      company: 'Gamma',
      lastVisit: '2025-09-26',
      condition: 'Annual Vaccination',
      status: 'Active',
      healthStatus: 'Fit',
      doctor: 'Dr. Nitish',
    },
    {
      id: 6,
      name: 'Gaurav Singh',
      battalion: '12th Battalion',
      company: 'Beta',
      lastVisit: '2025-08-15',
      condition: 'Minor Cut',
      status: 'Active',
      healthStatus: 'Fit',
      doctor: 'Dr. Nitish',
    },
  ]

  if (period === 'custom') {
    return allRecords // Return all for custom range for now
  }

  // Filter based on period
  const now = new Date()
  const filterDate = new Date()

  switch (period) {
    case '12hours':
      filterDate.setHours(now.getHours() - 12)
      break
    case 'day':
      filterDate.setDate(now.getDate() - 1)
      break
    case 'week':
      filterDate.setDate(now.getDate() - 7)
      break
    case 'month':
      filterDate.setMonth(now.getMonth() - 1)
      break
    default:
      return []
  }

  return allRecords.filter(record => new Date(record.lastVisit) >= filterDate)
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [reportData, setReportData] = useState<ReportRecord[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')
  const [useCustomRange, setUseCustomRange] = useState(false)

  useEffect(() => {
    // Load data based on selected period or custom range
    if (useCustomRange && customStartDate && customEndDate) {
      // For custom range, we'll simulate fetching data for the date range
      // In real implementation, this would call an API with startDate and endDate
      const data = generateMockData('custom')
      setReportData(data)
    } else if (!useCustomRange) {
      const data = generateMockData(selectedPeriod)
      setReportData(data)
    }
  }, [selectedPeriod, useCustomRange, customStartDate, customEndDate])

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period)
    setUseCustomRange(false)
    setCustomStartDate('')
    setCustomEndDate('')
  }

  const handleCustomRangeToggle = () => {
    setUseCustomRange(!useCustomRange)
    if (!useCustomRange) {
      setCustomStartDate('')
      setCustomEndDate('')
    }
  }

  const handleCustomDateChange = () => {
    if (customStartDate && customEndDate) {
      // Validate that start date is not after end date
      if (new Date(customStartDate) > new Date(customEndDate)) {
        alert('Start date cannot be after end date')
        return
      }
      // Trigger data reload
      setReportData(generateMockData('custom'))
    }
  }

  const downloadCSV = () => {
    if (reportData.length === 0) {
      alert('No data available for the selected time period.')
      return
    }

    setIsGenerating(true)

    // Simulate processing time
    setTimeout(() => {
      const headers = ['ID', 'Cadet Name', 'Battalion', 'Company', 'Last Visit', 'Condition', 'Status', 'Health Status', 'Doctor']
      const csvContent = [
        headers.join(','),
        ...reportData.map(record => [
          record.id,
          `"${record.name}"`,
          `"${record.battalion}"`,
          `"${record.company}"`,
          record.lastVisit,
          `"${record.condition}"`,
          record.status,
          `"${record.healthStatus}"`,
          `"${record.doctor}"`
        ].join(','))
      ].join('\n')

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)

      link.setAttribute('href', url)
      link.setAttribute('download', useCustomRange && customStartDate && customEndDate
        ? `mirroom-report-custom-${customStartDate}-to-${customEndDate}.csv`
        : `mirroom-report-${selectedPeriod}-${format(new Date(), 'yyyy-MM-dd')}.csv`
      )
      link.style.visibility = 'hidden'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setIsGenerating(false)
    }, 1000)
  }

  const getPeriodLabel = (period: string) => {
    if (useCustomRange && customStartDate && customEndDate) {
      return `Custom (${customStartDate} to ${customEndDate})`
    }

    switch (period) {
      case '12hours': return 'Last 12 Hours'
      case 'day': return 'Last 24 Hours'
      case 'week': return 'Last Week'
      case 'month': return 'Last Month'
      default: return 'Last Week'
    }
  }

  const getPeriodDescription = (period: string) => {
    if (useCustomRange && customStartDate && customEndDate) {
      return `Medical records from ${customStartDate} to ${customEndDate}`
    }

    switch (period) {
      case '12hours': return 'Medical records from the past 12 hours'
      case 'day': return 'Medical records from the past 24 hours'
      case 'week': return 'Medical records from the past week'
      case 'month': return 'Medical records from the past month'
      default: return 'Medical records from the past week'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Generate and download medical records reports
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Time Period Filters
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => handlePeriodChange('12hours')}
              className={`p-4 rounded-lg border-2 transition-all ${
                !useCustomRange && selectedPeriod === '12hours'
                  ? 'border-primary bg-primary/10 dark:bg-primary/20 text-primary'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
              }`}
              disabled={useCustomRange}
            >
              <Clock className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm font-medium">12 Hours</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Recent activity</div>
            </button>

            <button
              onClick={() => handlePeriodChange('day')}
              className={`p-4 rounded-lg border-2 transition-all ${
                !useCustomRange && selectedPeriod === 'day'
                  ? 'border-primary bg-primary/10 dark:bg-primary/20 text-primary'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
              }`}
              disabled={useCustomRange}
            >
              <Calendar className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm font-medium">24 Hours</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Daily report</div>
            </button>

            <button
              onClick={() => handlePeriodChange('week')}
              className={`p-4 rounded-lg border-2 transition-all ${
                !useCustomRange && selectedPeriod === 'week'
                  ? 'border-primary bg-primary/10 dark:bg-primary/20 text-primary'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
              }`}
              disabled={useCustomRange}
            >
              <FileText className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Week</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Weekly summary</div>
            </button>

            <button
              onClick={() => handlePeriodChange('month')}
              className={`p-4 rounded-lg border-2 transition-all ${
                !useCustomRange && selectedPeriod === 'month'
                  ? 'border-primary bg-primary/10 dark:bg-primary/20 text-primary'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
              }`}
              disabled={useCustomRange}
            >
              <Filter className="h-6 w-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Month</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Monthly report</div>
            </button>
          </div>

          {/* Custom Date Range Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">
                Custom Date Range
              </h4>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={useCustomRange}
                  onChange={handleCustomRangeToggle}
                  className="mr-2 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Use custom range
                </span>
              </label>
            </div>

            {useCustomRange && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleCustomDateChange}
                    disabled={!customStartDate || !customEndDate}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full"
                  >
                    Apply Range
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Report Summary */}
        <div className="card p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {getPeriodLabel(selectedPeriod)} Report
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {getPeriodDescription(selectedPeriod)}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <div className="text-2xl font-bold text-primary">{reportData.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">records found</div>
              </div>
            </div>

            <button
              onClick={downloadCSV}
              disabled={isGenerating || reportData.length === 0}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Download CSV'}
            </button>
          </div>
        </div>

        {/* Data Preview */}
        <div className="card">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Data Preview
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Preview of records that will be included in the CSV export
            </p>
          </div>

          {reportData.length > 0 ? (
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
                      Condition
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Last Visit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {reportData.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {record.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {record.battalion}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {record.company}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {record.condition}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          record.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {record.lastVisit}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-gray-500 dark:text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No records found</p>
                <p className="text-sm">No medical records available for the selected time period.</p>
                <p className="text-sm mt-2 text-gray-400 dark:text-gray-500">
                  Records will appear here when data becomes available.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
