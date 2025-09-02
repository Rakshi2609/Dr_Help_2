'use client';

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function for making API requests
export async function apiRequest(endpoint: string, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  console.log(`API Request to: ${url}`, {
    headers: {
      ...getAuthHeader(),
      ...(options as any).headers,
    }
  });
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
        ...(options as any).headers,
      },
    });

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      console.error(`API error response: ${response.status}`);
      // Try to parse error response
      const errorData = await response.json().catch(() => null);
      if (errorData) {
        console.error('Error data:', errorData);
      }
      throw new Error(errorData?.msg || `API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`API Response from ${endpoint}:`, data);
    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

// Get auth header if token exists
function getAuthHeader() {
  if (typeof window !== 'undefined') {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        console.log('Found auth token');
        return { 'Authorization': `Bearer ${token}` };
      } else {
        console.log('No auth token found in localStorage');
        return {};
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return {};
    }
  }
  console.log('Running in server context, no auth header');
  return {};
}

// Authentication API calls
export const authAPI = {
  // Register user (doctor or patient)
  async register(userData: {
    name: string;
    email: string;
    password: string;
    role: 'doctor' | 'patient';
    specialty?: string;
  }) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  async login(email: string, password: string) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.token) {
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role);
    }
    
    return data;
  },

  // Get user profile
  async getProfile() {
    return apiRequest('/auth/user');
  },

  // Logout user
  logout() {
    // Import and use the clearAuthData function
    import('./cookies').then(({ clearAuthData }) => {
      clearAuthData();
    });
  },
};

// Doctor API calls
export const doctorAPI = {
  // Get doctor profile
  async getProfile() {
    return apiRequest('/doctors/me');
  },

  // Get all patients for a doctor
  async getPatients() {
    try {
      console.log('Fetching patients for doctor');
      return await apiRequest('/doctors/patients');
    } catch (error) {
      console.error('Error in getPatients:', error);
      // Return empty array instead of throwing to prevent UI errors
      return [];
    }
  },

  // Get a specific patient
  async getPatient(patientId: string) {
    try {
      console.log(`Fetching patient with ID: ${patientId}`);
      return await apiRequest(`/doctors/patients/${patientId}`);
    } catch (error) {
      console.error(`Error fetching patient ${patientId}:`, error);
      throw error; // We want the UI to handle this error
    }
  },

  // Get a patient's history
  async getPatientHistory(patientId: string) {
    return apiRequest(`/doctors/patients/${patientId}/history`);
  },
  
  // Update a patient's medical information
  async updatePatient(patientId: string, patientData: any) {
    return apiRequest(`/doctors/patients/${patientId}`, {
      method: 'PUT',
      body: JSON.stringify(patientData),
    });
  },
};

// Patient API calls
export const patientAPI = {
  // Get patient profile
  async getProfile() {
    return apiRequest('/patients/me');
  },

  // Add pain score
  async addPainScore(score: number, notes: string = '') {
    return apiRequest('/patients/pain-scores', {
      method: 'POST',
      body: JSON.stringify({ score, notes }),
    });
  },

  // Add temperature reading
  async addTemperature(value: string) {
    return apiRequest('/patients/temperature', {
      method: 'POST',
      body: JSON.stringify({ value }),
    });
  },

  // Add vitals
  async addVitals(heartRate: string, bloodPressure: string) {
    return apiRequest('/patients/vitals', {
      method: 'POST',
      body: JSON.stringify({ heartRate, bloodPressure }),
    });
  },

  // Get history
  async getHistory() {
    return apiRequest('/patients/history');
  },

  // Get alerts
  async getAlerts() {
    return apiRequest('/patients/alerts');
  },
};
