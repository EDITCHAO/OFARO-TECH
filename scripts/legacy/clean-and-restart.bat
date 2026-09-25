@echo off
echo ========================================
echo   NETTOYAGE et REDEMARRAGE du serveur
echo ========================================
echo.

cd /d "c:\PROJET\OFARO TECH\ofaro-tech-website"

echo Arret du serveur...
taskkill /F /IM node.exe 2>nul

echo.
echo Suppression du cache .next...
if exist .next rmdir /s /q .next

echo.
echo Suppression du cache node_modules\.cache...
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo.
echo Reinstallation des dependances...
call npm install

echo.
echo Demarrage du serveur de developpement...
echo Le serveur sera accessible sur:
echo   - Local:   http://localhost:3000
echo   - Network: http://192.168.1.71:3000
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.

npm run dev

pause
