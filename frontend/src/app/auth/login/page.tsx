
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { loginPatient } from '@/lib/actions'
import { Stethoscope } from 'lucide-react'

export default function PatientLoginPage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
        <Stethoscope className="h-8 w-8" />
        <h1 className="text-3xl">PainSense</h1>
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Patient Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form action={loginPatient}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full font-medium"
            >
              Sign In
            </Button>
            <div className="text-center text-sm">
              <Link
                href="/auth/doctor"
                className="underline hover:text-primary"
              >
                Login as a Doctor
              </Link>
            </div>
          </CardFooter>
        </form>
        <div className="mb-6 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="underline hover:text-primary">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  )
}
