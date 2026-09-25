@echo off
cls
echo ================================================
echo   PUSH CORRECTION ESLINT vers GITHUB - URGENT
echo ================================================
echo.
echo CETTE CORRECTION EST NECESSAIRE POUR VERCEL !
echo.
echo Vercel utilise actuellement l'ancien code SANS
echo la correction ESLint, c'est pourquoi le build echoue.
echo.
echo ================================================
echo.

cd /d "c:\PROJET\OFARO TECH\ofaro-tech-website"

echo [1/4] Ajout de .eslintrc.json...
git add .eslintrc.json

echo [2/4] Ajout des autres fichiers modifies...
git add .

echo [3/4] Creation du commit...
git commit -m "Fix: Disable react/no-unescaped-entities for French content"

echo.
echo [4/4] Push vers GitHub...
echo.
echo IMPORTANT: Entrez vos identifiants GitHub :
echo   Username: EDITCHAO
echo   Password: [Votre Personal Access Token]
echo.

git push

echo.
echo ================================================
echo   PUSH TERMINE !
echo ================================================
echo.
echo Vercel va maintenant detecter le nouveau commit
echo et redéployer automatiquement avec la correction !
echo.
echo Attendez 2-3 minutes puis verifiez sur:
echo https://vercel.com/dashboard
echo.
echo Le build devrait reussir cette fois !
echo.
pause
