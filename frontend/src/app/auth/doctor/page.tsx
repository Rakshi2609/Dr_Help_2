
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
import { loginDoctor } from '@/lib/actions'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Stethoscope, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { storeAuthData } from '@/lib/cookies'

export default function DoctorLoginPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const { toast } = useToast()
  const router = useRouter()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  
  // Show error toast if there's an error param in URL
  useEffect(() => {
    if (error) {
      toast({
        title: "Login Failed",
        description: error,
        variant: "destructive"
      })
    }
  }, [error, toast])

  async function handleSubmit(formData: FormData) {
    setIsLoggingIn(true)
    setFormError(null)

    try {
      const result = await loginDoctor(formData)
      
      if (result.success) {
        // Extract name if available, or use email username as fallback
        const emailValue = formData.get('email')?.toString() || '';
        const userName = emailValue.split('@')[0] || 'Doctor';
        
        // Save auth info in both localStorage and cookies
        storeAuthData(result.token || '', result.role || 'doctor', userName);
        
        // Show success toast
        toast({
          title: "Login Successful",
          description: "Welcome to PainSense Doctor Dashboard",
        })
        
        // Navigate to the doctor dashboard with replace to prevent back navigation to login
        console.log('Redirecting to:', result.redirectTo)
        
        // Use window.location.href instead of router.push for a full page navigation
        setTimeout(() => {
          window.location.href = result.redirectTo || '/doctor/dashboard';
        }, 1000) // Longer delay to ensure toast is visible and cookies are set
      } else {
        // Show error message
        setFormError(result.error || 'Authentication failed');
        toast({
          title: "Login Failed",
          description: result.error || 'Authentication failed',
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      setFormError("An unexpected error occurred. Please try again.")
      toast({
        title: "Error",
        description: "Could not connect to the server",
        variant: "destructive"
      })
    } finally {
      setIsLoggingIn(false)
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
            <CardTitle className="text-2xl">Doctor Login</CardTitle>
            <CardDescription>
            Enter your credentials to access the doctor dashboard.
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
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                name="email"
                type="email"
                placeholder="doctor@example.com"
                required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
                <div className="text-right">
                  <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
            </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full font-medium"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
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
