@echo off
echo Running PainSense Password Reset Tool...
powershell -ExecutionPolicy Bypass -File "%~dp0reset-password.ps1"
pause
