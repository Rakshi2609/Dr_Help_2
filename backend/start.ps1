# Install dependencies and start the server
Write-Host "Installing dependencies for PainSense Backend..." -ForegroundColor Cyan
npm install

Write-Host "Starting the PainSense Backend server..." -ForegroundColor Green
npm run dev
