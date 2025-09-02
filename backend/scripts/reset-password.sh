#!/bin/bash

# MongoDB password reset utility script

echo "===== PainSense MongoDB Password Reset Tool ====="
echo ""

# Check if MongoDB tools are available
if ! command -v mongosh &> /dev/null; then
    echo "Error: MongoDB Shell (mongosh) not found. Please install MongoDB tools."
    exit 1
fi

# Get MongoDB connection string from the user
read -p "Enter MongoDB connection string (default: mongodb://localhost:27017/painsense): " MONGO_URI
MONGO_URI=${MONGO_URI:-mongodb://localhost:27017/painsense}

# Get email address
read -p "Enter user email address: " EMAIL

# Check if user exists
USER_EXISTS=$(mongosh "$MONGO_URI" --quiet --eval "db.users.findOne({email: '$EMAIL'}) ? true : false")

if [ "$USER_EXISTS" != "true" ]; then
    echo "Error: No user found with email $EMAIL"
    exit 1
fi

# Get new password
read -p "Enter new password: " PASSWORD
read -p "Confirm new password: " PASSWORD_CONFIRM

if [ "$PASSWORD" != "$PASSWORD_CONFIRM" ]; then
    echo "Error: Passwords do not match"
    exit 1
fi

# Update password
mongosh "$MONGO_URI" --quiet --eval "db.users.updateOne({email: '$EMAIL'}, {\$set: {password: '$PASSWORD'}})"
RESULT=$?

if [ $RESULT -eq 0 ]; then
    echo ""
    echo "Password successfully updated for $EMAIL"
    echo "You can now login with the new password"
else
    echo "Error: Failed to update password"
    exit 1
fi
