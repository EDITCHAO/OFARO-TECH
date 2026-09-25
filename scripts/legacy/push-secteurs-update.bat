@echo off
echo ========================================
echo   PUSH - Reduction taille page secteurs
echo ========================================
echo.

cd /d "c:\PROJET\OFARO TECH\ofaro-tech-website"

echo Ajout des fichiers modifies...
git add app\secteurs\page.tsx
git add GUIDE-FINAL-IMAGES.md
git add IMAGES-STATUS-FINAL.md
git add RESUME-SIMPLE.txt

echo.
echo Commit des changements...
git commit -m "feat: Reduction taille images et cadres page secteurs pour meilleur equilibre visuel"

echo.
echo Push vers GitHub...
git push origin main

echo.
echo ========================================
echo   Push termine !
echo ========================================
echo.
echo Modifications poussees vers:
echo https://github.com/EDITCHAO/OFARO-TECH
echo.
echo Vercel va redployer automatiquement.
echo.
pause
