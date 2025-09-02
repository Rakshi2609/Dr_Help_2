# PainSense Backend API

This is the backend API for the PainSense application, a medical platform for tracking pain and facilitating doctor-patient communication.

## Installation

```bash
# Install dependencies
npm install

# Create .env file with the following variables:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/painsense
# JWT_SECRET=YourSecretKeyHere

# Run the server
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user (doctor or patient)
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/user` - Get user data (requires auth)

### Doctor Routes

- `GET /api/doctors/me` - Get doctor profile (requires doctor auth)
- `GET /api/doctors/patients` - Get all patients for a doctor (requires doctor auth)
- `GET /api/doctors/patients/:patientId` - Get a specific patient's details (requires doctor auth)
- `GET /api/doctors/patients/:patientId/history` - Get last 3 records of patient's pain scores, temperature, and vitals (requires doctor auth)

### Patient Routes

- `GET /api/patients/me` - Get patient profile (requires patient auth)
- `POST /api/patients/pain-scores` - Add a new pain score record (requires patient auth)
- `POST /api/patients/temperature` - Add a new temperature record (requires patient auth)
- `POST /api/patients/vitals` - Add a new vitals record (requires patient auth)
- `GET /api/patients/history` - Get last 3 records of pain scores, temperature, and vitals (requires patient auth)
- `GET /api/patients/alerts` - Get all alerts for a patient (requires patient auth)
- `PUT /api/patients/alerts/:alertId` - Mark an alert as read (requires patient auth)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes, include the token in the header:

```
x-auth-token: YOUR_JWT_TOKEN
```

## Database Models

- **User**: Basic user information and authentication
- **Doctor**: Doctor-specific information and relations
- **Patient**: Patient health data including:
  - Last 3 pain scores
  - Last 3 temperature readings
  - Last 3 vital sign records (heart rate, blood pressure)
  - Current vitals
  - Alerts
