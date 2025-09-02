
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ArrowUpRight,
  Heart,
  Thermometer,
  Activity,
  Bell,
} from 'lucide-react'
import PainChart from '@/components/charts/PainChart'
import { Badge } from '@/components/ui/badge'

const vitals = [
  {
    name: 'Heart Rate',
    value: '82 bpm',
    icon: Heart,
    change: '+2%',
    changeType: 'increase',
  },
  {
    name: 'Blood Pressure',
    value: '120/80 mmHg',
    icon: Activity,
    change: '-1%',
    changeType: 'decrease',
  },
  {
    name: 'Temperature',
    value: '98.6°F',
    icon: Thermometer,
    change: '0%',
    changeType: 'neutral',
  },
]

const alerts = [
  {
    title: 'Medication Reminder',
    time: '2 hours ago',
    description: 'Time to take your pain medication.',
  },
  {
    title: 'High Pain Score',
    time: '1 day ago',
    description: 'Pain score of 8 reported. Consider contacting your doctor.',
  },
  {
    title: 'Appointment Reminder',
    time: '2 days ago',
    description: 'Upcoming appointment with Dr. Smith tomorrow at 10 AM.',
  },
]

export default function PatientDashboard() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>ID: P-12345</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">John Doe</p>
            <p className="text-sm text-muted-foreground">
              Vitals Summary: Stable, monitoring pain levels.
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-center bg-primary text-primary-foreground lg:col-span-2">
          <CardHeader>
            <CardTitle>Our Commitment to You</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              We are dedicated to helping you manage your pain effectively and
              improve your quality of life during treatment.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>7-Day Pain Trend</CardTitle>
          <CardDescription>Your reported pain scores over the last week.</CardDescription>
        </CardHeader>
        <CardContent>
          <PainChart />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-3">
            <h2 className="mb-4 text-2xl font-bold font-headline">Vitals</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {vitals.map((vital) => (
                <Card key={vital.name} className="transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                        {vital.name}
                    </CardTitle>
                    <vital.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{vital.value}</div>
                    <p className="text-xs text-muted-foreground">
                        {vital.change} from last measurement
                    </p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>

        <div className="lg:col-span-1">
          <h2 className="mb-4 text-2xl font-bold font-headline">Alerts</h2>
          <Card className="h-full">
            <CardContent className="pt-6">
              <div className="relative space-y-6">
                {alerts.map((alert, index) => (
                  <div key={index} className="relative flex items-start">
                    <span className="absolute left-[11px] top-[12px] h-full w-0.5 bg-border"></span>
                    <div className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <p className="font-semibold">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {alert.time}
                      </p>
                      <p className="text-sm">{alert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
