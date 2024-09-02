@echo off

echo "pre-push.bat script started"

:: Delay for 3 seconds
echo "Delaying for 3 seconds..."
timeout /t 3 /nobreak

:: Switch to the repository root directory
cd /d "%~dp0\.."

:: Run npm script
echo "Running npm script..."
npm run main
if %errorlevel% neq 0 (
    echo "npm script failed with exit code %errorlevel%"
) else (
    echo "npm script finished successfully"
)

echo "pre-push.bat script completed"