@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   PUSH MODIFICATIONS SECTEURS
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Ajout de TOUS les fichiers modifiés...
git add .

echo.
echo [2/4] Création du commit...
git commit -m "feat: Réduction taille images et cadres page secteurs pour meilleur équilibre visuel"

echo.
echo [3/4] Push vers GitHub...
git push origin main

echo.
echo [4/4] Terminé !
echo.
echo ========================================
echo   PUSH RÉUSSI !
echo ========================================
echo.
echo ✓ Modifications poussées vers GitHub
echo ✓ Vercel va redéployer automatiquement
echo.
echo URL GitHub: https://github.com/EDITCHAO/OFARO-TECH
echo.
pause
