@echo off
echo ========================================
echo   DEMARRAGE DU SERVEUR OFARO TECH
echo ========================================
echo.

cd /d "%~dp0"
echo Dossier actuel: %CD%
echo.

echo Demarrage du serveur Next.js...
echo Le site sera disponible sur http://localhost:3000
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo ========================================
echo.

npm run dev

pause
