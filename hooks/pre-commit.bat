@echo off
setlocal enabledelayedexpansion

REM Set TypeScript compiler path (adjust as needed)
set PATH=%PATH%;%APPDATA%\npm



echo Running TypeScript compilation...
call tsc

if %ERRORLEVEL% neq 0 (
    echo TypeScript compilation failed
    exit /b 1
)

echo TypeScript compilation succeeded

