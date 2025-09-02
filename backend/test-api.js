// Simple script to test the API endpoints
// You can run this script with Node.js after starting the server

import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000';
let authToken = '';

// Test register endpoint
async function testRegister() {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Doctor',
        email: 'testdoctor@example.com',
        password: 'password123',
        role: 'doctor',
        specialty: 'Neurology'
      })
    });
    
    const data = await response.json();
    console.log('Register response:', data);
    
    if (data.token) {
      authToken = data.token;
      console.log('Authentication successful!');
    }
  } catch (err) {
    console.error('Error testing register endpoint:', err);
  }
}

// Test login endpoint
async function testLogin() {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'testdoctor@example.com',
        password: 'password123'
      })
    });
    
    const data = await response.json();
    console.log('Login response:', data);
    
    if (data.token) {
      authToken = data.token;
      console.log('Authentication successful!');
    }
  } catch (err) {
    console.error('Error testing login endpoint:', err);
  }
}

// Test get user endpoint
async function testGetUser() {
  if (!authToken) {
    console.log('No auth token available. Please login first.');
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/api/auth/user`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': authToken
      }
    });
    
    const data = await response.json();
    console.log('User data:', data);
  } catch (err) {
    console.error('Error testing get user endpoint:', err);
  }
}

// Run the tests
async function runTests() {
  console.log('Starting API tests...');
  
  // Uncomment the test you want to run
  await testRegister();
  // await testLogin();
  // await testGetUser();
  
  console.log('Tests completed.');
}

runTests();

export { testRegister, testLogin, testGetUser };
