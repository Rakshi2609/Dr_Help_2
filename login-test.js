// Test script to verify login functionality
const fetch = require('node-fetch');

const API_URL = 'http://localhost:5000/api';

async function testLogin() {
  console.log('Starting login test...');
  
  // Test credentials - use the ones that are failing
  const credentials = {
    email: 'rakshithganjimut@gmail.com',
    password: '1234567890'
  };

  try {
    console.log(`Attempting login for user: ${credentials.email}`);
    
    // Make the login request
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });

    // Get the raw response text
    const rawResponse = await response.text();
    console.log(`Raw response (status ${response.status}):`, rawResponse);

    // Try to parse the response as JSON
    let data;
    try {
      data = JSON.parse(rawResponse);
      console.log('Parsed response data:', data);
    } catch (parseError) {
      console.error('Error parsing response as JSON:', parseError.message);
    }

    // Check if the response was successful
    if (response.ok) {
      console.log('Login successful!');
      console.log('Token:', data?.token);
      console.log('Role:', data?.role);
    } else {
      console.error(`Login failed with status: ${response.status}`);
      console.error('Error message:', data?.msg || 'Unknown error');
    }
  } catch (error) {
    console.error('Error during login test:', error.message);
  }
}

// Run the test
testLogin();
