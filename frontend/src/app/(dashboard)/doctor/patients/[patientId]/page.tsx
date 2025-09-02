
import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'

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
} from 'lucide-react'
import PainChart from '@/components/charts/PainChart'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type Patient = {
  id: string
  name: string
  painScore: number
  vitals: {
    heartRate: string
    bloodPressure: string
    temperature: string
  }
  alerts: {
    title: string
    time: string
    description: string
  }[]
  painHistory: any[]
}

async function getPatientData(patientId: string): Promise<Patient | undefined> {
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'patients.json')
  const file = await fs.readFile(jsonPath, 'utf8')
  const patients: Patient[] = JSON.parse(file)
  return patients.find((p) => p.id === patientId)
}

export default async function PatientDetailPage({
  params,
}: {
  params: { patientId: string }
}) {
  const patient = await getPatientData(params.patientId)

  if (!patient) {
    notFound()
  }

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{patient.name}</CardTitle>
            <CardDescription>ID: {patient.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Vitals</h3>
                  <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Heart className="h-4 w-4" /> Heart Rate: {patient.vitals.heartRate}
                    </p>
                    <p className="flex items-center gap-2">
                      <Activity className="h-4 w-4" /> Blood Pressure: {patient.vitals.bloodPressure}
                    </p>
                    <p className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" /> Temperature: {patient.vitals.temperature}
                    </p>
                  </div>
                </div>
                <div>
                    <h3 className="font-semibold">Current Pain Score</h3>
                    <p className="text-4xl font-bold">{patient.painScore}/10</p>
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="pain-score">Pain Score</Label>
                        <Input id="pain-score" defaultValue={patient.painScore} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="heart-rate">Heart Rate</Label>
                        <Input id="heart-rate" defaultValue={patient.vitals.heartRate} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="blood-pressure">Blood Pressure</Label>
                        <Input id="blood-pressure" defaultValue={patient.vitals.bloodPressure} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="temperature">Temperature</Label>
                        <Input id="temperature" defaultValue={patient.vitals.temperature} />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="notes">Doctor's Notes</Label>
                    <Textarea id="notes" placeholder="Add notes about the patient's condition..."/>
                </div>
                <Button>Save Changes</Button>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pain Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <PainChart />
        </CardContent>
      </Card>
    </div>
  )
}
