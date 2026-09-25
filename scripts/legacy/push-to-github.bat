@echo off
echo ========================================
echo   PUSH OFARO TECH vers GitHub
echo ========================================
echo.

cd /d "c:\PROJET\OFARO TECH\ofaro-tech-website"

echo Verification du statut Git...
git status

echo.
echo Pushing vers GitHub...
git push -u origin main

echo.
echo ========================================
echo   Push termine !
echo ========================================
echo.
echo Votre code est maintenant sur:
echo https://github.com/EDITCHAO/OFARO-TECH
echo.
pause
