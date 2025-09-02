
import { promises as fs } from 'fs'
import path from 'path'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AlertTriangle, User, Bell } from 'lucide-react'
import PainChart from '@/components/charts/PainChart'
import { Badge } from '@/components/ui/badge'
import AIInsightsCard from '@/components/doctor/AIInsightsCard'

type Patient = {
  id: string
  name: string
  painScore: number
}

type Alert = {
  patient: string
  painScore: number
  time: string
}

export default async function DoctorDashboard() {
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'patients.json')
  const file = await fs.readFile(jsonPath, 'utf8')
  const patients: Patient[] = JSON.parse(file)
  
  const highPainAlerts: Alert[] = [
    { patient: 'John Doe', painScore: 8, time: '15 mins ago' },
    { patient: 'Robert Johnson', painScore: 7, time: '1 hour ago' },
  ]
  
  return (
    <div className="grid gap-6">
      <AIInsightsCard patientId="P-12345" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-2xl font-bold font-headline">Patient List</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {patients.map((patient) => (
              <Card key={patient.id} className="transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-medium">
                    {patient.name}
                  </CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">{patient.id}</div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold">
                      {patient.painScore}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / 10
                    </span>
                    {patient.painScore > 6 && <Badge variant="destructive">High</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <h2 className="mb-4 text-2xl font-bold font-headline">High Pain Alerts</h2>
          <Card className="h-full">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {highPainAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold">{alert.patient}</p>
                      <p className="text-sm text-muted-foreground">
                        Pain score of {alert.painScore} reported {alert.time}.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pain Trend (John Doe)</CardTitle>
          <CardDescription>
            Pain scores for the selected patient over the last week.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PainChart />
        </CardContent>
      </Card>
    </div>
  )
}
