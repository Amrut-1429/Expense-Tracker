@echo off
echo ==========================================
echo    Expense Tracker Debugging Startup
echo ==========================================
echo.

:: Check folders
if not exist "backend" (
    echo [ERROR] 'backend' folder not found in current directory!
    goto error
)
if not exist "frontend" (
    echo [ERROR] 'frontend' folder not found in current directory!
    goto error
)

echo [OK] Folders found.
echo.

:: Try to start backend
echo Launching Backend...
start "Expense Backend" cmd /c "cd backend && npm install && npm run dev || (echo. & echo Backend failed to start. & pause)"

:: Try to start frontend
echo Launching Frontend...
start "Expense Frontend" cmd /c "cd frontend && npm install && npm run dev || (echo. & echo Frontend failed to start. & pause)"

echo.
echo ------------------------------------------
echo If new windows DID NOT open:
echo 1. Open CMD manually.
echo 2. CD into the folders.
echo 3. Run 'npm install' then 'npm run dev'.
echo ------------------------------------------
goto end

:error
echo.
echo Script failed due to missing folders.
pause

:end
pause
