'use client';

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function for making API requests
export async function apiRequest(endpoint: string, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
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
      // Try to parse error response
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.msg || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

// Get auth header if token exists
function getAuthHeader() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return token ? { 'x-auth-token': token } : {};
  }
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
    return apiRequest('/doctors/patients');
  },

  // Get a specific patient
  async getPatient(patientId: string) {
    return apiRequest(`/doctors/patients/${patientId}`);
  },

  // Get a patient's history
  async getPatientHistory(patientId: string) {
    return apiRequest(`/doctors/patients/${patientId}/history`);
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
