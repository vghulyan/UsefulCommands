@echo off
title Run Component Analysis
echo ---------------------------------------------
echo 📊 Component Usage Report Generator (Node.js)
echo ---------------------------------------------
echo.

:: Check if Node.js is available
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH.
    pause
    exit /b
)

:: Run the script
node analyze-components.js

echo.
echo ✅ Done. Press any key to close...
pause >nul
