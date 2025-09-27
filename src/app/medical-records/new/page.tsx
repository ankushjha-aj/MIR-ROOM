'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { ArrowLeft, Save, X } from 'lucide-react'
import Link from 'next/link'

function NewMedicalRecordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    cadetName: '',
    company: '',
    battalion: '',
    dateOfReporting: '',
    medicalProblem: '',
    diagnosis: '',
    status: '',
    attendC: '',
    trainingMissed: '',
    contactNo: '',
    remarks: '',
    treatment: '',
    medications: '',
    followUpDate: '',
    doctorName: '',
  })

  // Check if form is pre-populated from cadet history
  const isPrePopulated = searchParams.has('cadetName') || searchParams.has('battalion') || searchParams.has('company')

  // Pre-populate form data from URL parameters if available
  useEffect(() => {
    const cadetName = searchParams.get('cadetName')
    const battalion = searchParams.get('battalion')
    const company = searchParams.get('company')

    if (cadetName || battalion || company) {
      setFormData(prev => ({
        ...prev,
        cadetName: cadetName || prev.cadetName,
        battalion: battalion || prev.battalion,
        company: company || prev.company,
      }))
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally send the data to your backend
    console.log('Form submitted:', formData)
    
    // Show success message and redirect
    alert('Medical record added successfully!')
    router.push('/dashboard')
  }

  const handleReset = () => {
    setFormData({
      cadetName: '',
      company: '',
      battalion: '',
      dateOfReporting: '',
      medicalProblem: '',
      diagnosis: '',
      status: '',
      attendC: '',
      trainingMissed: '',
      contactNo: '',
      remarks: '',
      treatment: '',
      medications: '',
      followUpDate: '',
      doctorName: '',
    })
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isPrePopulated ? 'Add Medical Record' : 'Add New Medical Record'}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isPrePopulated 
              ? `Enter the medical details for ${formData.cadetName}. Required fields are marked with an asterisk (*).` 
              : 'Enter the medical details for a new cadet record. Required fields are marked with an asterisk (*).'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="cadetName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cadet Name {isPrePopulated && <span className="text-xs text-gray-500 dark:text-gray-400">(Pre-filled from cadet record)</span>} *
                </label>
                <input
                  type="text"
                  id="cadetName"
                  name="cadetName"
                  required
                  readOnly={isPrePopulated}
                  value={formData.cadetName}
                  onChange={handleChange}
                  className={`input-field ${isPrePopulated ? 'bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed' : ''}`}
                  placeholder="Enter cadet name"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company {isPrePopulated && <span className="text-xs text-gray-500 dark:text-gray-400">(Pre-filled from cadet record)</span>} *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  readOnly={isPrePopulated}
                  value={formData.company}
                  onChange={handleChange}
                  className={`input-field ${isPrePopulated ? 'bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed' : ''}`}
                  placeholder="Enter company"
                />
              </div>
              
              <div>
                <label htmlFor="battalion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Battalion {isPrePopulated && <span className="text-xs text-gray-500 dark:text-gray-400">(Pre-filled from cadet record)</span>} *
                </label>
                <input
                  type="text"
                  id="battalion"
                  name="battalion"
                  required
                  readOnly={isPrePopulated}
                  value={formData.battalion}
                  onChange={handleChange}
                  className={`input-field ${isPrePopulated ? 'bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed' : ''}`}
                  placeholder="Enter battalion"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label htmlFor="dateOfReporting" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date of Reporting *
              </label>
              <input
                type="date"
                id="dateOfReporting"
                name="dateOfReporting"
                required
                value={formData.dateOfReporting}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          {/* Medical Information */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Medical Information
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="medicalProblem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Medical Problem *
                </label>
                <textarea
                  id="medicalProblem"
                  name="medicalProblem"
                  required
                  value={formData.medicalProblem}
                  onChange={handleChange}
                  rows={3}
                  className="input-field"
                  placeholder="Describe the cadet's medical problem"
                />
              </div>
              
              <div>
                <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Diagnosis *
                </label>
                <textarea
                  id="diagnosis"
                  name="diagnosis"
                  required
                  value={formData.diagnosis}
                  onChange={handleChange}
                  rows={3}
                  className="input-field"
                  placeholder="Enter the diagnosis"
                />
              </div>
              
              <div>
                <label htmlFor="treatment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Treatment Plan
                </label>
                <textarea
                  id="treatment"
                  name="treatment"
                  value={formData.treatment}
                  onChange={handleChange}
                  rows={3}
                  className="input-field"
                  placeholder="Describe the treatment plan"
                />
              </div>
              
              <div>
                <label htmlFor="medications" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Medications Prescribed
                </label>
                <textarea
                  id="medications"
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  rows={2}
                  className="input-field"
                  placeholder="List any medications prescribed"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="followUpDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    id="followUpDate"
                    name="followUpDate"
                    value={formData.followUpDate}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Attending Doctor/Medical Staff
                  </label>
                  <input
                    type="text"
                    id="doctorName"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter doctor/staff name"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Administrative Information */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Administrative Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select Status</option>
                  <option value="active-duty">Active Duty</option>
                  <option value="sick-report">Sick Report</option>
                  <option value="hospitalized">Hospitalized</option>
                  <option value="recovered">Recovered</option>
                  <option value="under-observation">Under Observation</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="attendC" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Attend C
                </label>
                <select
                  id="attendC"
                  name="attendC"
                  value={formData.attendC}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select</option>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="trainingMissed" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Days Training Missed
                </label>
                <input
                  type="number"
                  id="trainingMissed"
                  name="trainingMissed"
                  value={formData.trainingMissed}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter number of days"
                  min="0"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contact Number (Admin-only)
              </label>
              <input
                type="text"
                id="contactNo"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter contact number"
              />
            </div>
            
            <div className="mt-6">
              <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Additional Remarks
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows={3}
                className="input-field"
                placeholder="Enter any additional remarks"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary"
            >
              <X className="h-4 w-4 mr-2" />
              Reset Form
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <Save className="h-4 w-4 mr-2" />
              Submit Record
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}

export default function NewMedicalRecordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewMedicalRecordForm />
    </Suspense>
  )
}
