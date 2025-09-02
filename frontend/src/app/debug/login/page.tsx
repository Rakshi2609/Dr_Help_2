'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function LoginDebugger() {
  const [email, setEmail] = useState('rakshithganjimut@gmail.com');
  const [password, setPassword] = useState('1234567890');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleDirectLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      toast({
        title: "Testing Login",
        description: "Making direct API call to test login functionality",
      });

      console.log(`Testing direct login for user: ${email}`);
      
      // Make the login request directly to the API
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      console.log(`Login response status: ${response.status}`);
      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed data:', data);
      } catch (e) {
        console.error('Failed to parse response as JSON');
        setError(`Failed to parse response: ${responseText}`);
        toast({
          title: "Error",
          description: "Failed to parse response from server",
          variant: "destructive"
        });
        return;
      }

      if (!response.ok) {
        setError(`Login failed: ${data?.msg || response.statusText}`);
        toast({
          title: "Login Failed",
          description: data?.msg || "Unknown error occurred",
          variant: "destructive"
        });
        return;
      }

      if (!data.token) {
        setError('No token received in response');
        toast({
          title: "Login Failed",
          description: "No authentication token received",
          variant: "destructive"
        });
        return;
      }

      // Store the token and role
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role || 'unknown');
      
      setResult(JSON.stringify(data, null, 2));
      toast({
        title: "Login Successful",
        description: `Authenticated as ${data.role || 'user'}`,
      });
    } catch (error) {
      console.error('Error during login test:', error);
      setError(`Login test error: ${error instanceof Error ? error.message : String(error)}`);
      toast({
        title: "Error",
        description: "Failed to connect to the server",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Login Debugging Tool</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Direct API Login Test</CardTitle>
            <CardDescription>
              Test login by making a direct API call to the backend
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleDirectLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Testing...' : 'Test Direct Login'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>
              The API response will be displayed here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {result && (
              <div className="bg-muted rounded-md p-4">
                <pre className="whitespace-pre-wrap text-sm">{result}</pre>
              </div>
            )}
            {!result && !error && (
              <div className="text-muted-foreground text-sm">
                Click the button to test login functionality
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col items-start space-y-2">
            <div className="text-sm text-muted-foreground">
              <strong>Local Storage:</strong>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const token = localStorage.getItem('token');
                const role = localStorage.getItem('userRole');
                setResult(JSON.stringify({ token: token ? `${token.substring(0, 15)}...` : null, role }, null, 2));
              }}
            >
              Check Stored Credentials
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
