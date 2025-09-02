
'use server'

import { redirect } from 'next/navigation'

// Define API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// For debugging
console.log(`Using API URL: ${API_BASE_URL}`);

// Server action for doctor login
export async function loginDoctor(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  try {
    console.log(`Attempting doctor login for email: ${email}`);
    
    // Make a direct fetch call from the server action
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    });

    console.log(`Login response status: ${response.status}`);
    
    // Handle non-200 responses
    if (!response.ok) {
      let errorMessage = 'Invalid credentials';
      try {
        const errorData = await response.json();
        errorMessage = errorData.msg || errorMessage;
      } catch (e) {
        // If not valid JSON, try to get text
        try {
          errorMessage = await response.text();
        } catch (textError) {
          console.error('Could not extract error message from response');
        }
      }
      console.error(`Login failed: ${errorMessage}`);
      return { success: false, error: errorMessage };
    }

    // Parse the JSON response
    let data;
    try {
      data = await response.json();
      console.log('Login response data:', data);
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      return { success: false, error: 'Invalid server response' };
    }
    
    // Check if data contains token and role
    if (!data || !data.token) {
      console.error('Response missing token:', data);
      return { success: false, error: 'Authentication failed: Missing token' };
    }
    
    // Check if user is a doctor
    if (data.role !== 'doctor') {
      console.log(`User has incorrect role: ${data.role}`);
      return { success: false, error: 'This account is not a doctor account' };
    }
    
    // Return success with auth data instead of redirecting
    return { 
      success: true, 
      token: data.token, 
      role: 'doctor', 
      redirectTo: '/doctor/dashboard' 
    };
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Server error. Please try again.' };
  }
}

// Server action for patient login
export async function loginPatient(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  try {
    console.log(`Attempting patient login for email: ${email}`);
    
    // Make a direct fetch call from the server action
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    });

    console.log(`Login response status: ${response.status}`);
    
    // Handle non-200 responses
    if (!response.ok) {
      let errorMessage = 'Invalid credentials';
      try {
        const errorData = await response.json();
        errorMessage = errorData.msg || errorMessage;
      } catch (e) {
        // If not valid JSON, try to get text
        try {
          errorMessage = await response.text();
        } catch (textError) {
          console.error('Could not extract error message from response');
        }
      }
      console.error(`Login failed: ${errorMessage}`);
      return { success: false, error: errorMessage };
    }

    // Parse the JSON response
    let data;
    try {
      data = await response.json();
      console.log('Login response data:', data);
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      return { success: false, error: 'Invalid server response' };
    }
    
    // Check if data contains token and role
    if (!data || !data.token) {
      console.error('Response missing token:', data);
      return { success: false, error: 'Authentication failed: Missing token' };
    }
    
    // Check if user is a patient
    if (data.role !== 'patient') {
      console.log(`User has incorrect role: ${data.role}`);
      return { success: false, error: 'This account is not a patient account' };
    }
    
    // Return success with auth data instead of redirecting
    return { 
      success: true, 
      token: data.token, 
      role: 'patient', 
      redirectTo: '/patient/dashboard' 
    };
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Server error. Please try again.' };
  }
}

// Server action for patient signup
export async function signupPatient(formData: FormData) {
  const name = formData.get('name')?.toString();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!name || !email || !password) {
    return { success: false, error: 'All fields are required' };
  }

  try {
    console.log(`Attempting patient registration for email: ${email}`);
    
    // Make a direct fetch call from the server action
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name, 
        email, 
        password,
        role: 'patient'
      }),
      cache: 'no-store',
    });

    console.log(`Registration response status: ${response.status}`);
    
    // Handle non-200 responses
    if (!response.ok) {
      let errorMessage = 'Registration failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.msg || errorMessage;
      } catch (e) {
        // If not valid JSON, try to get text
        try {
          errorMessage = await response.text();
        } catch (textError) {
          console.error('Could not extract error message from response');
        }
      }
      console.error(`Registration failed: ${errorMessage}`);
      return { success: false, error: errorMessage };
    }

    // Parse the JSON response
    let data;
    try {
      data = await response.json();
      console.log('Registration response data:', data);
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      return { success: false, error: 'Invalid server response' };
    }
    
    // Check if data contains token
    if (!data || !data.token) {
      console.error('Response missing token:', data);
      return { success: false, error: 'Registration failed: Missing token' };
    }
    
    // Return success with auth data instead of redirecting
    return { 
      success: true, 
      token: data.token, 
      role: 'patient', 
      redirectTo: '/patient/dashboard',
      action: 'signup'
    };
  } catch (error) {
    console.error('Signup error:', error)
    redirect('/auth/signup?error=Server error. Please try again.')
  }
}
