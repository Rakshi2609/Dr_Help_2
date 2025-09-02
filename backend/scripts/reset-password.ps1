# MongoDB password reset utility script for Windows (PowerShell)

Write-Host "===== PainSense MongoDB Password Reset Tool =====" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB tools are available
try {
    $mongoVersion = mongosh --version
} catch {
    Write-Host "Error: MongoDB Shell (mongosh) not found. Please install MongoDB tools." -ForegroundColor Red
    Write-Host "You can download MongoDB tools from: https://www.mongodb.com/try/download/shell" -ForegroundColor Yellow
    exit 1
}

# Get MongoDB connection string from the user
$MONGO_URI = Read-Host "Enter MongoDB connection string (press Enter for default: mongodb://localhost:27017/painsense)"
if ([string]::IsNullOrEmpty($MONGO_URI)) {
    $MONGO_URI = "mongodb://localhost:27017/painsense"
}

# Get email address
$EMAIL = Read-Host "Enter user email address"

# Check if user exists
try {
    $checkCommand = "db.users.findOne({email: '$EMAIL'}) ? 'exists' : 'not_found'"
    $userCheck = mongosh "$MONGO_URI" --quiet --eval $checkCommand
    
    if ($userCheck -ne "exists") {
        Write-Host "Error: No user found with email $EMAIL" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Error connecting to database: $_" -ForegroundColor Red
    exit 1
}

# Get new password
$PASSWORD = Read-Host "Enter new password" -AsSecureString
$PASSWORD_TEXT = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($PASSWORD))

$PASSWORD_CONFIRM = Read-Host "Confirm new password" -AsSecureString
$PASSWORD_CONFIRM_TEXT = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($PASSWORD_CONFIRM))

if ($PASSWORD_TEXT -ne $PASSWORD_CONFIRM_TEXT) {
    Write-Host "Error: Passwords do not match" -ForegroundColor Red
    exit 1
}

# Update password
try {
    $updateCommand = "db.users.updateOne({email: '$EMAIL'}, {`$set: {password: '$PASSWORD_TEXT'}})"
    mongosh "$MONGO_URI" --quiet --eval $updateCommand
    
    Write-Host ""
    Write-Host "Password successfully updated for $EMAIL" -ForegroundColor Green
    Write-Host "You can now login with the new password" -ForegroundColor Green
} catch {
    Write-Host "Error: Failed to update password: $_" -ForegroundColor Red
    exit 1
}
