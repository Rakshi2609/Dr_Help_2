
'use client'

import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
import { Alert, AlertDescription } from '@/components/ui/alert'
import { signupPatient } from '@/lib/actions'
import { Stethoscope, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { storeAuthData } from '@/lib/cookies'

export default function PatientSignupPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const { toast } = useToast()
  const router = useRouter()
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  
  // Show error toast if there's an error param in URL
  useEffect(() => {
    if (error) {
      toast({
        title: "Registration Failed",
        description: error,
        variant: "destructive"
      })
    }
  }, [error, toast])

  async function handleSubmit(formData: FormData) {
    setIsSigningUp(true)
    setFormError(null)

    try {
      const result = await signupPatient(formData)
      
      if (result.success) {
        // Get user's name from form data
        const name = formData.get('name')?.toString() || 'Patient';
        
        // Save auth info using the helper function
        storeAuthData(result.token || '', result.role || 'patient', name);
        
        // Show success toast
        toast({
          title: "Account Created Successfully!",
          description: "Welcome to PainSense Patient Dashboard",
        })
        
        // Navigate to the patient dashboard with replace to prevent back navigation to signup
        console.log('Redirecting to:', result.redirectTo)
        setTimeout(() => {
          window.location.href = result.redirectTo || '/patient/dashboard';
        }, 1000) // Longer delay to ensure toast is visible and cookies are set
      } else {
        // Show error message
        setFormError(result.error || 'Registration failed');
        toast({
          title: "Registration Failed",
          description: result.error || 'Registration failed',
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Signup error:", error)
      setFormError("An unexpected error occurred. Please try again.")
      toast({
        title: "Error",
        description: "Could not connect to the server",
        variant: "destructive"
      })
    } finally {
      setIsSigningUp(false)
    }
  }
  
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
        <form action={handleSubmit}>
          <CardContent className="grid gap-4">
            {(error || formError) && (
              <Alert variant="destructive">
                <AlertDescription>{formError || error}</AlertDescription>
              </Alert>
            )}
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
            
            <div className="text-sm text-muted-foreground mt-2">
              <p>Your doctor will fill in your medical information during your appointment.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full font-medium"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
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
