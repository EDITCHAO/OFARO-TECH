@echo off
echo ========================================
echo   FIX ESLINT et PUSH vers GitHub
echo ========================================
echo.

cd /d "c:\PROJET\OFARO TECH\ofaro-tech-website"

echo Ajout de la correction ESLint...
git add .eslintrc.json

echo Creation du commit...
git commit -m "Fix: Disable react/no-unescaped-entities rule for French content"

echo Push vers GitHub...
git push

echo.
echo ========================================
echo   Push termine !
echo ========================================
echo.
echo La correction ESLint est sur GitHub.
echo Vercel va automatiquement redeployer !
echo.
echo Attendez 2-3 minutes et verifiez sur:
echo https://vercel.com/dashboard
echo.
pause
