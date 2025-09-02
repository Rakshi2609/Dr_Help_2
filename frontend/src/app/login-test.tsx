'use client';

// Utility function to test login flow from the browser console
// Copy and paste this into your browser console to test the login flow

// Extend the Window interface to allow our custom functions
declare global {
  interface Window {
    testLoginFlow: () => void;
  }
}

function testLoginFlow() {
  const email = 'rakshithganjimut@gmail.com';
  const password = '1234567890';
  
  console.log(`Testing login flow for user: ${email}`);
  
  // Step 1: Make the login request
  fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  })
  .then(response => {
    console.log(`Login response status: ${response.status}`);
    console.log('Response headers:', Object.fromEntries([...response.headers.entries()]));
    
    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }
    
    return response.text();
  })
  .then(text => {
    console.log('Raw response text:', text);
    
    try {
      const data = JSON.parse(text);
      console.log('Parsed response data:', data);
      
      if (data.token && data.role) {
        console.log('Login successful!');
        
        // Step 2: Store token and role in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);
        console.log('Auth data stored in localStorage');
        
        // Step 3: Redirect based on role
        const redirectUrl = data.role === 'doctor' ? '/doctor' : '/patient';
        console.log(`Would redirect to: ${redirectUrl}`);
        
        return data;
      } else {
        throw new Error('Response missing token or role');
      }
    } catch (parseError: unknown) {
      // TypeScript requires us to verify the error is an Error object before accessing message
      if (parseError instanceof Error) {
        console.error('Error parsing response as JSON:', parseError.message);
      } else {
        console.error('Error parsing response as JSON:', parseError);
      }
      throw parseError;
    }
  })
  .catch(error => {
    console.error('Error during login flow:', error.message);
  });
}

// Export the function so it's available in the global scope
window.testLoginFlow = testLoginFlow;

export default function LoginTestUtility() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Login Test Utility</h1>
      <p>Open your browser console and run the following command:</p>
      <pre className="bg-gray-100 p-2 mt-2">testLoginFlow()</pre>
    </div>
  );
}
