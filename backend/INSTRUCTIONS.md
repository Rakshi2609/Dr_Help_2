# Running the PainSense Backend

## Prerequisites

1. Node.js (v16 or higher)
2. npm or yarn
3. MongoDB (local installation or MongoDB Atlas account)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/painsense
JWT_SECRET=your_secret_key_here
```

3. Start the development server:
```bash
npm run dev
```

## Connecting to MongoDB

For a local MongoDB installation:
- Make sure MongoDB is running locally
- Use the connection string: `mongodb://localhost:27017/painsense`

For MongoDB Atlas:
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a new cluster
- Get your connection string and replace the MONGO_URI in your .env file

## API Documentation

See the README.md for detailed API endpoint documentation.

## Integration with Frontend

The backend exposes API endpoints for authentication, doctor management, and patient records. These endpoints can be consumed by the frontend application using fetch or axios.

Example frontend integration:
```javascript
// Login example
async function login(email, password) {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  
  if (data.token) {
    // Store token in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('userRole', data.role);
    return true;
  }
  
  return false;
}
```
