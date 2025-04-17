@echo off
echo Starting Hospital Management Application...

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

:: Check if .NET is installed
where dotnet >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: .NET SDK is not installed or not in PATH
    pause
    exit /b 1
)

:: Start the frontend
echo Starting frontend...
start cmd /k "cd frontend && npm run dev"

:: Start the backend
echo Starting backend...
start cmd /k "cd backend && dotnet run"

echo Both frontend and backend are starting...
echo Frontend will be available at http://localhost:3000
echo Backend will be available at http://localhost:5000
echo Press any key to close this window...
pause >nul 