'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      // Since we're manually updating passwords as mentioned by the user, 
      // we'll just show instructions rather than making an actual API call
      setIsSubmitted(true);
      toast({
        title: "Password reset instructions",
        description: "Please contact the administrator to manually reset your password in the database.",
      });
      
      // You could implement an actual password reset API call here in a real application
      // Example:
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.msg || 'Failed to send reset email');
      
    } catch (error: any) {
      console.error('Forgot password error:', error);
      setError(error.message || 'Failed to process request');
      toast({
        title: "Error",
        description: "Failed to process password reset request",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to receive password reset instructions
          </CardDescription>
        </CardHeader>
        
        {!isSubmitted ? (
          <form onSubmit={handleForgotPassword}>
            <CardContent className="grid gap-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-2">
              <Button type="submit" className="w-full">Reset Password</Button>
              <div className="text-sm text-center mt-2">
                <Link href="/auth/login" className="text-primary hover:underline">
                  Back to login
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="grid gap-4">
            <Alert>
              <AlertDescription>
                If your email exists in our system, we&apos;ll send you instructions to reset your password. 
                Please note that for this development version, passwords are stored directly in the database 
                and need to be manually updated by an administrator.
              </AlertDescription>
            </Alert>
            
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-semibold mb-2">Instructions for Administrator:</h3>
              <ol className="list-decimal ml-5 space-y-1">
                <li>Access MongoDB database</li>
                <li>Navigate to the &quot;users&quot; collection</li>
                <li>Find the user document with email: <strong>{email}</strong></li>
                <li>Update the password field with the new password</li>
                <li>Save changes</li>
              </ol>
            </div>
            
            <div className="text-center mt-4">
              <Link href="/auth/login" className="text-primary hover:underline">
                Return to login page
              </Link>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
