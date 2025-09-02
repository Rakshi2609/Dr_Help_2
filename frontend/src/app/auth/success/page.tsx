'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function AuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  useEffect(() => {
    // Get the authentication data from the URL parameters
    const token = searchParams.get('token');
    const role = searchParams.get('role');
    const redirectTo = searchParams.get('redirectTo') || '/';
    const action = searchParams.get('action') || 'login';
    
    console.log("Auth success page loaded with params:", { 
      token: token ? `${token.substring(0, 10)}...` : null,  // Log truncated token for security 
      role, 
      redirectTo, 
      action 
    });
    
    if (!token || !role) {
      console.error("Missing token or role in authentication success URL parameters");
      toast({
        title: "Authentication Failed",
        description: "Something went wrong during authentication. Please try again.",
        variant: "destructive"
      });
      router.push('/auth/login?error=Authentication failed');
      return;
    }
    
    // Store auth data in localStorage
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);
      console.log("Auth data stored in localStorage");
    } catch (error) {
      console.error("Failed to store auth data in localStorage:", error);
      toast({
        title: "Warning",
        description: "Could not store login information. You may need to login again later.",
        variant: "destructive"
      });
    }
    
    // Show success toast
    toast({
      title: action === 'signup' ? "Account Created Successfully!" : "Login Successful!",
      description: `Welcome to PainSense ${role === 'doctor' ? 'Doctor' : 'Patient'} Dashboard`,
      variant: "default"
    });
    
    // Navigate to the redirect page
    router.push(redirectTo);
  }, [router, searchParams]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 text-center items-center">
            <h2 className="text-2xl font-semibold">Authentication Successful</h2>
            <p className="text-muted-foreground">Redirecting you to your dashboard...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
