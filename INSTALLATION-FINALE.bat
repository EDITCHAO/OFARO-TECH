@echo off
cls
echo ========================================
echo   INSTALLATION FORMULAIRE DE SERVICE
echo ========================================
echo.
echo Ce script va installer les packages necessaires
echo pour connecter le formulaire a la base de donnees.
echo.
pause

cd /d "c:\PROJET\OFARO TECH\ofaro-tech-website"

echo.
echo [1/3] Installation de pg (PostgreSQL)...
call npm install pg

echo.
echo [2/3] Installation de @types/pg...
call npm install --save-dev @types/pg

echo.
echo [3/3] Installation de dotenv...
call npm install dotenv

echo.
echo ========================================
echo   INSTALLATION TERMINEE !
echo ========================================
echo.
echo Prochaines etapes :
echo.
echo 1. Tester la connexion DB :
echo    node scripts/test-db-connection.js
echo.
echo 2. Demarrer le serveur :
echo    npm run dev
echo.
echo 3. Tester le formulaire :
echo    http://localhost:3000
echo.
echo 4. Voir les demandes dans l'admin :
echo    http://localhost:3000/admin/service-requests
echo.
echo Consultez FORMULAIRE-SETUP.md pour plus de details !
echo.
pause
