# PainSense Application

A medical platform for tracking pain and facilitating doctor-patient communication.

## Project Structure

- `frontend/`: Next.js frontend application
- `backend/`: Node.js Express backend API

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following content:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Password Reset Instructions

### Using the Reset Password Script

1. Navigate to the backend scripts directory:
   ```
   cd backend/scripts
   ```

2. Run the password reset script:
   ```
   node reset-password.js
   ```

3. Follow the prompts to enter:
   - User's email address
   - New password

### Manual Database Update

If you prefer to update the password directly in the database:

1. Access your MongoDB database using MongoDB Compass or the mongo shell
2. Navigate to the `users` collection
3. Find the user document you want to update
4. Modify the `password` field with the new password
5. Save the changes

### Forgot Password Feature

The application includes a forgot password page that provides instructions to administrators for manually resetting passwords.

To use this feature:
1. Navigate to `/auth/forgot-password` in the frontend application
2. Enter the email address associated with the account
3. Follow the displayed instructions for manually updating the password

## Authentication Testing

You can use the included test script to verify the authentication system is working properly:

```
node test-auth.js
```

This script tests both patient and doctor registration and login endpoints.
