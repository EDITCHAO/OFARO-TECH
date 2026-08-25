@echo off
echo.
echo ========================================
echo   PUSH VERS GITHUB
echo ========================================
echo.

cd /d "c:\PROJET\OFARO TECH\ofaro-tech-website"

echo Push en cours...
git push origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================
    echo   PUSH REUSSI !
    echo ========================================
    echo.
    echo Modifications poussees vers GitHub
    echo Vercel va redployer automatiquement
    echo.
    echo URL Production: https://ofaro-tech.vercel.app
    echo.
) else (
    echo ========================================
    echo   ERREUR
    echo ========================================
    echo.
    echo Le push a echoue.
    echo Verifiez votre connexion internet.
    echo.
)

pause
