
'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { loginDoctor } from '@/lib/actions'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Stethoscope } from 'lucide-react'

export default function DoctorLoginPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
     <div className="flex flex-col items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Stethoscope className="h-8 w-8" />
            <h1 className="text-3xl">PainSense</h1>
        </Link>
        <Card className="w-full max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl">Doctor Login</CardTitle>
            <CardDescription>
            Enter your credentials to access the doctor dashboard.
            </CardDescription>
        </CardHeader>
        <form action={loginDoctor}>
            <CardContent className="grid gap-4">
            {error && (
                <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                id="username"
                name="username"
                placeholder="doctor"
                required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
            </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full font-medium">
                Sign In
            </Button>
            <div className="text-center text-sm">
                <Link
                href="/auth/login"
                className="underline hover:text-primary"
                >
                Login as a Patient
                </Link>
            </div>
            </CardFooter>
        </form>
        </Card>
    </div>
  )
}
