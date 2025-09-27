'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Calendar, FileText, Activity, Pill, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Mock medical history data based on cadet ID
const getMedicalHistoryForCadet = (cadetId: string) => {
  const histories: Record<string, any[]> = {
    '1': [ // Vipin Kumar
      {
        id: 1,
        date: '2025-09-20',
        type: 'injury',
        icon: Activity,
        title: 'Ankle Sprain',
        diagnosis: 'Grade 2 Ankle Sprain',
        treatment: 'Rest, Ice, Compression, Elevation (RICE), Physical therapy',
        leaveDays: 5,
        remarks: 'Cadet sustained injury during physical training. Prescribed 5 days medical leave.',
        doctor: 'Dr. Nitish',
      },
      {
        id: 2,
        date: '2025-09-26',
        type: 'checkup',
        icon: FileText,
        title: 'Follow-up Checkup',
        diagnosis: 'Recovery Progress - Satisfactory',
        treatment: 'Continue physical therapy exercises',
        leaveDays: 0,
        remarks: 'Ankle showing good recovery progress. No additional leave required.',
        doctor: 'Dr. Nitish',
      },
    ],
    '2': [ // Ankush Sharma
      {
        id: 3,
        date: '2025-09-14',
        type: 'illness',
        icon: Pill,
        title: 'Viral Fever',
        diagnosis: 'Acute Viral Infection',
        treatment: 'Antipyretics, Hydration, Rest',
        leaveDays: 8,
        remarks: 'High fever and body ache. Prescribed 8 days rest for recovery.',
        doctor: 'Dr. Nitish',
      },
      {
        id: 4,
        date: '2025-09-22',
        type: 'checkup',
        icon: FileText,
        title: 'Dental Checkup',
        diagnosis: 'Routine Dental Examination - Normal',
        treatment: 'Oral hygiene maintenance',
        leaveDays: 0,
        remarks: 'Regular dental checkup completed. No issues found.',
        doctor: 'Dr. Nitish',
      },
      {
        id: 5,
        date: '2025-09-26',
        type: 'vaccination',
        icon: Pill,
        title: 'Annual Vaccination',
        diagnosis: 'Preventive Healthcare',
        treatment: 'Typhoid vaccination administered',
        leaveDays: 0,
        remarks: 'Annual vaccination schedule completed successfully.',
        doctor: 'Dr. Nitish',
      },
    ],
    '3': [ // Gaurav Singh
      {
        id: 6,
        date: '2025-08-15',
        type: 'injury',
        icon: Activity,
        title: 'Minor Cut',
        diagnosis: 'Superficial Wound - Right Hand',
        treatment: 'Wound dressing, Antibiotic ointment',
        leaveDays: 1,
        remarks: 'Minor cut sustained during kitchen duty. Prescribed 1 day medical leave.',
        doctor: 'Dr. Nitish',
      },
    ],
  }

  return histories[cadetId] || []
}

// Mock cadet data
const getCadetInfo = (cadetId: string) => {
  const cadets: Record<string, any> = {
    '1': {
      name: 'Vipin Kumar',
      id: 'CAD-2025-001',
      battalion: '12th Battalion, Alpha Company',
      age: 21,
      bloodGroup: 'O+',
      height: '175 cm',
      weight: '68 kg',
      allergies: 'None',
      chronicConditions: 'None',
      emergencyContact: '+91 98765 43211',
      totalLeaveDays: 5, // Sum of all leave days from medical records
    },
    '2': {
      name: 'Ankush Sharma',
      id: 'CAD-2025-002',
      battalion: '12th Battalion, Gamma Company',
      age: 22,
      bloodGroup: 'A+',
      height: '178 cm',
      weight: '72 kg',
      allergies: 'Dust',
      chronicConditions: 'None',
      emergencyContact: '+91 98765 43212',
      totalLeaveDays: 8, // Sum of all leave days from medical records
    },
    '3': {
      name: 'Gaurav Singh',
      id: 'CAD-2025-003',
      battalion: '12th Battalion, Beta Company',
      age: 20,
      bloodGroup: 'B+',
      height: '176 cm',
      weight: '70 kg',
      allergies: 'None',
      chronicConditions: 'None',
      emergencyContact: '+91 98765 43213',
      totalLeaveDays: 1, // Sum of all leave days from medical records
    },
  }

  return cadets[cadetId] || null
}

export default function MedicalHistoryPage() {
  const params = useParams()
  const cadetId = params.id as string
  const cadetInfo = getCadetInfo(cadetId)
  const medicalHistory = getMedicalHistoryForCadet(cadetId)

  if (!cadetInfo) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cadet Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400">The requested cadet record does not exist.</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Back Button and Page Header */}
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Cadet Medical History
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Complete medical records and history for {cadetInfo.name}
              </p>
              {/* Total Leave Days Display */}
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Total Medical Leave: {cadetInfo.totalLeaveDays} days
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/medical-records/new?cadetId=${cadetId}&cadetName=${encodeURIComponent(cadetInfo.name)}&battalion=${encodeURIComponent(cadetInfo.battalion.split(',')[0])}&company=${encodeURIComponent(cadetInfo.battalion.split(',')[1]?.trim() || 'Alpha')}`}
                className="btn-primary"
              >
                Add New Record
              </Link>
              <button className="btn-secondary">
                Print Records
              </button>
            </div>
          </div>
        </div>

        {/* Cadet Information Card */}
        <div className="card p-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
              <span className="text-5xl font-bold">
                {cadetInfo.name.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{cadetInfo.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">{cadetInfo.battalion}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ID: {cadetInfo.id}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Age</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{cadetInfo.age} years</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Blood Group</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{cadetInfo.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Height</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{cadetInfo.height}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Weight</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{cadetInfo.weight}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Allergies</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{cadetInfo.allergies}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Chronic Conditions</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{cadetInfo.chronicConditions}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Emergency Contact</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{cadetInfo.emergencyContact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Records Timeline */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Medical Records Timeline</h2>
          {medicalHistory.length > 0 ? (
            <div className="flow-root">
              <ul className="-mb-8" role="list">
                {medicalHistory.map((record, idx) => {
                  const Icon = record.icon
                  const isLast = idx === medicalHistory.length - 1

                  return (
                    <li key={record.id}>
                      <div className="relative pb-8">
                        {!isLast && (
                          <span
                            className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                            aria-hidden="true"
                          />
                        )}
                        <div className="relative flex space-x-3 items-start">
                          <div>
                            <div className="relative px-1">
                              <div className={`
                                h-8 w-8 rounded-full flex items-center justify-center ring-8
                                ring-background-light dark:ring-background-dark
                                ${record.type === 'injury'
                                  ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                                  : record.type === 'vaccination'
                                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                  : 'bg-primary/10 dark:bg-primary/20 text-primary'
                                }
                              `}>
                                <Icon className="h-4 w-4" />
                              </div>
                            </div>
                          </div>

                          <div className="min-w-0 flex-1 py-1.5">
                            <div className="card">
                              <div className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                  <p className="text-md font-semibold text-gray-900 dark:text-white">
                                    {record.title}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {record.date}
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                                  <div className="col-span-1 sm:col-span-2">
                                    <p className="font-medium text-gray-500 dark:text-gray-400">Diagnosis</p>
                                    <p className="text-gray-800 dark:text-gray-200">{record.diagnosis}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-500 dark:text-gray-400">Treatment</p>
                                    <p className="text-gray-800 dark:text-gray-200">{record.treatment}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-500 dark:text-gray-400">Doctor/Staff</p>
                                    <p className="text-gray-800 dark:text-gray-200">{record.doctor}</p>
                                  </div>
                                  {record.leaveDays > 0 && (
                                    <div>
                                      <p className="font-medium text-gray-500 dark:text-gray-400">Medical Leave</p>
                                      <p className="text-red-600 dark:text-red-400 font-medium">{record.leaveDays} days</p>
                                    </div>
                                  )}
                                  <div className="col-span-1 sm:col-span-2">
                                    <p className="font-medium text-gray-500 dark:text-gray-400">Remarks</p>
                                    <p className="text-gray-800 dark:text-gray-200">{record.remarks}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : (
            <div className="card p-12 text-center">
              <div className="text-gray-500 dark:text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No medical history available</p>
                <p className="text-sm">Medical records for this cadet will appear here once they are added.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
