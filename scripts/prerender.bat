@echo off
REM Start Vite preview server in background
start /B vite preview --port 5173 > nul 2>&1

REM Wait for server to start
timeout /t 5 /nobreak > nul

REM Run prerender script
node scripts/prerender.js

REM Kill the preview server
taskkill /F /IM node.exe /FI "WINDOWTITLE eq vite*" > nul 2>&1

echo Prerender complete!
