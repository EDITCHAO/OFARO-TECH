@echo off
echo.
echo ========================================
echo   Verification des images OFARO TECH
echo ========================================
echo.

cd /d "%~dp0"

echo [HERO SECTION]
echo.
if exist "public\images\hero\hero-image.svg" (
    echo [OK] hero-image.svg
) else (
    echo [MANQUANT] hero-image.svg
)

echo.
echo [PROJECTS - Realisations]
echo.

if exist "public\images\projects\ecommerce.svg" (
    echo [OK] ecommerce.svg
) else (
    echo [MANQUANT] ecommerce.svg
)

if exist "public\images\projects\banking-app.svg" (
    echo [OK] banking-app.svg
) else (
    echo [MANQUANT] banking-app.svg
)

if exist "public\images\projects\hospital.svg" (
    echo [OK] hospital.svg
) else (
    echo [MANQUANT] hospital.svg
)

if exist "public\images\projects\branding.svg" (
    echo [OK] branding.svg
) else (
    echo [MANQUANT] branding.svg
)

if exist "public\images\projects\network.svg" (
    echo [OK] network.svg
) else (
    echo [MANQUANT] network.svg
)

if exist "public\images\projects\school.svg" (
    echo [OK] school.svg
) else (
    echo [MANQUANT] school.svg
)

echo.
echo [SECTORS - Secteurs d'activite]
echo.

if exist "public\images\sectors\banking.svg" (
    echo [OK] banking.svg
) else (
    echo [MANQUANT] banking.svg
)

if exist "public\images\sectors\education.svg" (
    echo [OK] education.svg
) else (
    echo [MANQUANT] education.svg
)

if exist "public\images\sectors\health.svg" (
    echo [OK] health.svg
) else (
    echo [MANQUANT] health.svg
)

if exist "public\images\sectors\commerce.svg" (
    echo [OK] commerce.svg
) else (
    echo [MANQUANT] commerce.svg
)

if exist "public\images\sectors\government.svg" (
    echo [OK] government.svg
) else (
    echo [MANQUANT] government.svg
)

if exist "public\images\sectors\ngo.svg" (
    echo [OK] ngo.svg
) else (
    echo [MANQUANT] ngo.svg
)

echo.
echo ========================================
echo.
echo Total : 13 images a verifier
echo.
echo Pour plus d'informations :
echo   - IMAGES-CREATED.md
echo   - public\images\README.md
echo.
echo Pour tester le site :
echo   npm run dev
echo.
pause
