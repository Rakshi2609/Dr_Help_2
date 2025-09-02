'use client';

// Helper function for handling API responses
export async function handleApiResponse(response: Response) {
  if (!response.ok) {
    let errorMessage = `Error: ${response.status}`;
    
    try {
      const errorData = await response.json();
      if (errorData.msg) {
        errorMessage = errorData.msg;
      }
    } catch (e) {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }
    
    throw new Error(errorMessage);
  }
  
  return response.json();
}

// Get token from localStorage
export function getAuthToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

// Get auth headers
export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { 'x-auth-token': token } : {};
}

// Base API request function
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  const authHeaders = getAuthHeaders();
  
  const headers = {
    'Content-Type': 'application/json',
    ...authHeaders,
    ...(options.headers as Record<string, string> || {})
  };
  
  const response = await fetch(fullUrl, {
    ...options,
    headers
  });
  
  return handleApiResponse(response);
}

// Patient API functions
export const patientApi = {
  getProfile: () => fetchWithAuth('/patients/me'),
  getPainScores: () => fetchWithAuth('/patients/me'),
  addPainScore: (score: number, notes: string = '') => 
    fetchWithAuth('/patients/pain-scores', {
      method: 'POST',
      body: JSON.stringify({ score, notes }),
    }),
  addTemperature: (value: string) => 
    fetchWithAuth('/patients/temperature', {
      method: 'POST',
      body: JSON.stringify({ value }),
    }),
  addVitals: (heartRate: string, bloodPressure: string) => 
    fetchWithAuth('/patients/vitals', {
      method: 'POST',
      body: JSON.stringify({ heartRate, bloodPressure }),
    }),
  getAlerts: () => fetchWithAuth('/patients/alerts'),
  getHistory: () => fetchWithAuth('/patients/history'),
};

// Doctor API functions
export const doctorApi = {
  getProfile: () => fetchWithAuth('/doctors/me'),
  getPatients: () => fetchWithAuth('/doctors/patients'),
  getPatient: (patientId: string) => fetchWithAuth(`/doctors/patients/${patientId}`),
  getPatientHistory: (patientId: string) => 
    fetchWithAuth(`/doctors/patients/${patientId}/history`),
};
