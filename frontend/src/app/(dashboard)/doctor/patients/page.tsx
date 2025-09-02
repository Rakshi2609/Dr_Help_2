
import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type Patient = {
  id: string
  name: string
  painScore: number
}

export default async function DoctorPatientsPage() {
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'patients.json')
  const file = await fs.readFile(jsonPath, 'utf8')
  const patients: Patient[] = JSON.parse(file)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Management</CardTitle>
        <CardDescription>
          View and manage your patients' health records.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Pain Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.painScore}</TableCell>
                <TableCell>
                  {patient.painScore > 6 ? (
                    <Badge variant="destructive">High</Badge>
                  ) : patient.painScore > 3 ? (
                    <Badge variant="secondary">Medium</Badge>
                  ) : (
                    <Badge>Low</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline">
                    <Link href={`/doctor/patients/${patient.id}`}>Manage</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
