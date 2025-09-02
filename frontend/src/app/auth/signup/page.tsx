
import Link from 'next/link'
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
import { signupPatient } from '@/lib/actions'
import { Stethoscope } from 'lucide-react'

export default function PatientSignupPage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
        <Stethoscope className="h-8 w-8" />
        <h1 className="text-3xl">PainSense</h1>
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Patient Sign Up</CardTitle>
          <CardDescription>
            Create your account to start managing your pain.
          </CardDescription>
        </CardHeader>
        <form action={signupPatient}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required />
            </div>
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
              <Input id="password" name="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full font-medium"
            >
              Create Account
            </Button>
          </CardFooter>
        </form>
        <div className="mb-6 mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="underline hover:text-primary">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  )
}
