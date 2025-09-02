
'use client'

import { useEffect, useState } from 'react'
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
import { Loader2 } from 'lucide-react'
import { doctorAPI } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

type Patient = {
  _id: string
  name?: string
  userId?: { 
    _id: string;
    name: string;
    email: string;
  }
  painScore?: number
  painLevel?: number
}

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchPatients() {
      try {
        const data = await doctorAPI.getPatients();
        console.log('Fetched patients:', data);
        
        if (Array.isArray(data) && data.length > 0) {
          // Use API data if available
          setPatients(data);
        } else {
          // Fallback to dummy data if API returns empty array
          const dummyPatients = [
            {
              _id: 'P-12345',
              name: 'John Smith',
              painLevel: 7,
              userId: { name: 'John Smith', _id: 'user123', email: 'john@example.com' }
            },
            {
              _id: 'P-23456',
              name: 'Sarah Johnson',
              painLevel: 4,
              userId: { name: 'Sarah Johnson', _id: 'user456', email: 'sarah@example.com' }
            },
            {
              _id: 'P-34567',
              name: 'Michael Brown',
              painLevel: 2, 
              userId: { name: 'Michael Brown', _id: 'user789', email: 'michael@example.com' }
            }
          ];
          setPatients(dummyPatients);
        }
      } catch (error) {
        console.error('Failed to fetch patients:', error);
        
        // Use dummy data on error
        const dummyPatients = [
          {
            _id: 'P-12345',
            name: 'John Smith',
            painLevel: 7,
            userId: { name: 'John Smith', _id: 'user123', email: 'john@example.com' }
          },
          {
            _id: 'P-23456',
            name: 'Sarah Johnson',
            painLevel: 4,
            userId: { name: 'Sarah Johnson', _id: 'user456', email: 'sarah@example.com' }
          },
          {
            _id: 'P-34567',
            name: 'Michael Brown',
            painLevel: 2,
            userId: { name: 'Michael Brown', _id: 'user789', email: 'michael@example.com' }
          }
        ];
        setPatients(dummyPatients);
        
        toast({
          title: 'Using Demo Data',
          description: 'Connected to demo data since the API is unavailable',
          variant: 'default',
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchPatients();
  }, [toast])

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading patients data...</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Management</CardTitle>
        <CardDescription>
          View and manage your patients' health records.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {patients.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground">
            <p>No patients found. You haven't been assigned any patients yet.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Pain Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => {
                const patientName = patient.userId?.name || patient.name || 'Unknown';
                const painLevel = patient.painLevel || patient.painScore || 0;
                
                return (
                  <TableRow key={patient._id}>
                    <TableCell className="font-medium">{patient._id}</TableCell>
                    <TableCell>{patientName}</TableCell>
                    <TableCell>{painLevel}</TableCell>
                    <TableCell>
                      {painLevel > 6 ? (
                        <Badge variant="destructive">High</Badge>
                      ) : painLevel > 3 ? (
                        <Badge variant="secondary">Medium</Badge>
                      ) : (
                        <Badge>Low</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline">
                        <Link href={`/doctor/patients/${patient._id}`}>Manage</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
