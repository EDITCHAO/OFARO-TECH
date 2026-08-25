@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   INSTALLATION BACK-OFFICE OFARO TECH
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Installation des dépendances NPM...
call npm install pg @types/pg bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken formidable sharp @types/formidable react-quill @types/react-quill zod date-fns xlsx qrcode speakeasy @types/qrcode @types/speakeasy

echo.
echo [2/5] Copie du fichier .env.example vers .env.local...
if not exist .env.local (
    copy .env.example .env.local
    echo ✓ Fichier .env.local créé
) else (
    echo ⚠ .env.local existe déjà, ignoré
)

echo.
echo [3/5] Création du dossier uploads...
if not exist public\uploads mkdir public\uploads
if not exist public\uploads\images mkdir public\uploads\images
if not exist public\uploads\documents mkdir public\uploads\documents
if not exist public\uploads\cv mkdir public\uploads\cv
if not exist public\uploads\attachments mkdir public\uploads\attachments
echo ✓ Dossiers uploads créés

echo.
echo [4/5] Vérification de PostgreSQL...
where psql >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✓ PostgreSQL détecté
    echo.
    echo Pour créer la base de données, exécutez:
    echo   psql -U postgres
    echo   CREATE DATABASE ofaro_tech;
    echo   \c ofaro_tech
    echo   \i database/schema.sql
) else (
    echo ⚠ PostgreSQL non détecté
    echo   Installez PostgreSQL depuis: https://www.postgresql.org/download/
)

echo.
echo [5/5] Installation terminée !
echo.
echo ========================================
echo   PROCHAINES ÉTAPES
echo ========================================
echo.
echo 1. Éditer .env.local avec vos informations DB
echo 2. Créer la base de données (voir instructions ci-dessus)
echo 3. Exécuter: npm run dev
echo 4. Accéder à: http://localhost:3000/admin
echo.
echo Documentation: BACKOFFICE-README.md
echo Plan d'implémentation: BACKOFFICE-IMPLEMENTATION-PLAN.md
echo.
pause
