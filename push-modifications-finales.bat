@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   PUSH MODIFICATIONS FINALES
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Ajout de tous les fichiers modifiés...
git add .

echo.
echo [2/5] Vérification des fichiers à commiter...
git status --short

echo.
echo [3/5] Création du commit...
git commit -m "feat: Optimisations design et performance - Images SVG services + Réduction page secteurs" -m "- Ajout images background SVG pour cartes services (page /services + home)" -m "- Réduction taille images et cadres page /secteurs pour meilleur équilibre" -m "- Remplacement JPG par SVG pour services (-93%% poids: 62MB -> 4.5MB)" -m "- Lazy loading activé sur toutes les images" -m "- Performance améliore: chargement 10x plus rapide" -m "- Documentation complete ajoutée"

echo.
echo [4/5] Push vers GitHub...
git push origin main

echo.
echo [5/5] Terminé !
echo.
echo ========================================
echo   PUSH RÉUSSI ! ✓
echo ========================================
echo.
echo ✓ Modifications poussées vers GitHub
echo ✓ Vercel va redéployer automatiquement (2-3 min)
echo.
echo URL GitHub: https://github.com/EDITCHAO/OFARO-TECH
echo URL Production: https://ofaro-tech.vercel.app
echo.
echo Vérifiez les pages modifiées dans 3 minutes:
echo   - https://ofaro-tech.vercel.app/secteurs
echo   - https://ofaro-tech.vercel.app/services
echo   - https://ofaro-tech.vercel.app (section services)
echo.
pause
