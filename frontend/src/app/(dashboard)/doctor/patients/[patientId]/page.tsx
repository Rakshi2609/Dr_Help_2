
'use client'

import { useState } from 'react'
import { notFound, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Heart,
  Thermometer,
  Activity,
  Bell,
  AlertTriangle,
  Loader2,
} from 'lucide-react'
import PainChart from '@/components/charts/PainChart'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { doctorAPI } from '@/lib/api'
import { updatePatient } from '@/lib/actions'

type Patient = {
  _id: string
  name: string
  painScore?: number
  painLevel?: number
  age?: number
  bmi?: number
  gender?: string
  hasDiabetes?: boolean
  surgeryDuration?: number
  surgeryType?: string
  anesthesiaType?: string
  vitals?: {
    heartRate?: string
    bloodPressure?: string
    temperature?: string
  }
  alerts?: {
    title: string
    time: string
    description: string
  }[]
  painHistory?: any[]
  notes?: string
}

export default function PatientDetailPage({
  params,
}: {
  params: { patientId: string }
}) {
  const router = useRouter()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const { toast } = useToast()
  const { patientId } = params
  
  useEffect(() => {
    async function loadPatient() {
      try {
        console.log(`Fetching patient details for ID: ${patientId}`);
        // First check if patient exists in mock data
        if (patientId === 'P-12345' || patientId === 'P-23456' || patientId === 'P-34567') {
          // Mock data for each patient
          const mockPatients = {
            'P-12345': {
              _id: 'P-12345',
              name: 'John Smith',
              age: 45,
              gender: 'Male',
              painLevel: 7,
              hasDiabetes: false,
              surgeryType: 'Orthopedic',
              surgeryDuration: 120,
              anesthesiaType: 'General',
              bmi: 24.5,
              vitals: {
                heartRate: '75',
                bloodPressure: '120/80',
                temperature: '98.6'
              },
              notes: 'Patient is recovering well after surgery.',
              painScores: [
                { score: 8, timestamp: '2025-08-30T10:00:00Z' },
                { score: 7, timestamp: '2025-08-31T10:00:00Z' },
                { score: 6, timestamp: '2025-09-01T10:00:00Z' }
              ]
            },
            'P-23456': {
              _id: 'P-23456',
              name: 'Sarah Johnson',
              age: 38,
              gender: 'Female',
              painLevel: 4,
              hasDiabetes: true,
              surgeryType: 'General',
              surgeryDuration: 90,
              anesthesiaType: 'Local',
              bmi: 22.1,
              vitals: {
                heartRate: '68',
                bloodPressure: '118/75',
                temperature: '98.2'
              },
              notes: 'Patient experiencing moderate pain but improving.',
              painScores: [
                { score: 6, timestamp: '2025-08-30T10:00:00Z' },
                { score: 5, timestamp: '2025-08-31T10:00:00Z' },
                { score: 4, timestamp: '2025-09-01T10:00:00Z' }
              ]
            },
            'P-34567': {
              _id: 'P-34567',
              name: 'Michael Brown',
              age: 52,
              gender: 'Male',
              painLevel: 2,
              hasDiabetes: false,
              surgeryType: 'Neurological',
              surgeryDuration: 180,
              anesthesiaType: 'General',
              bmi: 26.8,
              vitals: {
                heartRate: '72',
                bloodPressure: '130/85',
                temperature: '98.4'
              },
              notes: 'Patient showing excellent recovery with minimal pain.',
              painScores: [
                { score: 5, timestamp: '2025-08-30T10:00:00Z' },
                { score: 3, timestamp: '2025-08-31T10:00:00Z' },
                { score: 2, timestamp: '2025-09-01T10:00:00Z' }
              ]
            }
          };
          
          // Get the mock patient by ID
          const mockPatient = mockPatients[patientId as keyof typeof mockPatients];
          setPatient(mockPatient);
        } else {
          // Try to fetch from API
          const data = await doctorAPI.getPatient(patientId);
          setPatient(data);
        }
      } catch (error) {
        console.error('Failed to fetch patient data:', error);
        
        // Create a generic patient with the given ID if the API fails
        const genericPatient = {
          _id: patientId,
          name: `Patient ${patientId}`,
          age: 0,
          gender: 'Not specified',
          painLevel: 0,
          hasDiabetes: false,
          surgeryType: 'Not specified',
          surgeryDuration: 0,
          anesthesiaType: 'Not specified',
          bmi: 0,
          vitals: {
            heartRate: 'N/A',
            bloodPressure: 'N/A',
            temperature: 'N/A'
          },
          notes: '',
          painScores: []
        };
        
        setPatient(genericPatient);
        
        toast({
          title: 'Using Demo Data',
          description: 'Could not load patient data from server - using placeholder data',
          variant: 'default',
        });
      } finally {
        setLoading(false);
      }
    }
    
    loadPatient();
  }, [patientId, toast])
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setUpdating(true)
    
    try {
      const form = event.currentTarget
      const formData = new FormData(form)
      
      // Get token from localStorage
      const token = localStorage.getItem('token')
      
      if (!token) {
        toast({
          title: 'Authorization Error',
          description: 'You must be logged in to update patient data',
          variant: 'destructive',
        })
        return
      }
      
      const result = await updatePatient(formData, patientId, token)
      
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Patient data updated successfully',
        })
        
        // Refresh patient data
        try {
          const updatedPatient = await doctorAPI.getPatient(patientId)
          setPatient(updatedPatient)
        } catch (fetchError) {
          console.error('Failed to fetch updated patient data:', fetchError)
          
          // Just update the current patient object with the form data
          // This ensures the UI reflects the changes even if the API call fails
          const formValues = Object.fromEntries(formData.entries())
          setPatient(prevPatient => {
            if (!prevPatient) return prevPatient
            
            return {
              ...prevPatient,
              age: formValues.age ? Number(formValues.age) : prevPatient.age,
              bmi: formValues.bmi ? Number(formValues.bmi) : prevPatient.bmi,
              gender: formValues.gender?.toString() || prevPatient.gender,
              hasDiabetes: formValues.hasDiabetes === 'true',
              painLevel: formValues.painLevel ? Number(formValues.painLevel) : prevPatient.painLevel,
              surgeryDuration: formValues.surgeryDuration ? Number(formValues.surgeryDuration) : prevPatient.surgeryDuration,
              surgeryType: formValues.surgeryType?.toString() || prevPatient.surgeryType,
              anesthesiaType: formValues.anesthesiaType?.toString() || prevPatient.anesthesiaType,
              notes: formValues.notes?.toString() || prevPatient.notes
            }
          })
        }
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to update patient data',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error updating patient:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setUpdating(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading patient data...</span>
      </div>
    )
  }
  
  if (!patient) {
    return notFound()
  }

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{patient.name}</CardTitle>
            <CardDescription>ID: {patient._id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Basic Information</h3>
                  <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      Age: {patient.age || 'Not specified'}
                    </p>
                    <p className="flex items-center gap-2">
                      BMI: {patient.bmi || 'Not specified'}
                    </p>
                    <p className="flex items-center gap-2">
                      Gender: {patient.gender || 'Not specified'}
                    </p>
                    <p className="flex items-center gap-2">
                      Diabetes: {patient.hasDiabetes ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
                <div>
                    <h3 className="font-semibold">Current Pain Score</h3>
                    <p className="text-4xl font-bold">{patient.painLevel || patient.painScore || 0}/10</p>
                </div>
                <div>
                    <h3 className="font-semibold">Surgery Information</h3>
                    <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                      <p>Type: {patient.surgeryType || 'Not specified'}</p>
                      <p>Duration: {patient.surgeryDuration ? `${patient.surgeryDuration} min` : 'Not specified'}</p>
                      <p>Anesthesia: {patient.anesthesiaType || 'Not specified'}</p>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Update Patient Records</CardTitle>
                <CardDescription>Modify patient vitals and other information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input 
                          id="age" 
                          name="age" 
                          defaultValue={patient.age?.toString() || ''} 
                          type="number"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="bmi">BMI</Label>
                        <Input 
                          id="bmi" 
                          name="bmi" 
                          defaultValue={patient.bmi?.toString() || ''} 
                          type="number"
                          step="0.01"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Input 
                          id="gender" 
                          name="gender" 
                          defaultValue={patient.gender || 'Other'} 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hasDiabetes">Has Diabetes</Label>
                        <select 
                          id="hasDiabetes" 
                          name="hasDiabetes" 
                          defaultValue={patient.hasDiabetes ? 'true' : 'false'}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="painLevel">Pain Level (0-10)</Label>
                        <Input 
                          id="painLevel" 
                          name="painLevel" 
                          defaultValue={patient.painLevel?.toString() || patient.painScore?.toString() || '0'} 
                          type="number"
                          min="0"
                          max="10"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="surgeryDuration">Surgery Duration (mins)</Label>
                        <Input 
                          id="surgeryDuration" 
                          name="surgeryDuration" 
                          defaultValue={patient.surgeryDuration?.toString() || ''} 
                          type="number"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="surgeryType">Surgery Type</Label>
                        <Input 
                          id="surgeryType" 
                          name="surgeryType" 
                          defaultValue={patient.surgeryType || ''} 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="anesthesiaType">Anesthesia Type</Label>
                        <Input 
                          id="anesthesiaType" 
                          name="anesthesiaType" 
                          defaultValue={patient.anesthesiaType || ''} 
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="notes">Doctor's Notes</Label>
                    <Textarea 
                      id="notes" 
                      name="notes" 
                      defaultValue={patient.notes || ''}
                      placeholder="Add notes about the patient's condition..."
                    />
                </div>
                <Button type="submit" disabled={updating}>
                  {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {updating ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pain Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <PainChart 
            painHistory={patient.painScores} 
            currentPainLevel={patient.painLevel || patient.painScore}
          />
        </CardContent>
      </Card>
    </div>
  )
}
