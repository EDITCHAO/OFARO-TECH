@echo off
echo ========================================
echo Verification des logos OFARO TECH
echo ========================================
echo.

cd /d "%~dp0"

echo Fichiers requis :
echo.

if exist "public\logo-ofaro.png" (
    echo [OK] logo-ofaro.png
) else (
    echo [MANQUANT] logo-ofaro.png
)

if exist "public\icon-192x192.png" (
    echo [OK] icon-192x192.png
) else (
    echo [MANQUANT] icon-192x192.png
)

if exist "public\icon-512x512.png" (
    echo [OK] icon-512x512.png
) else (
    echo [MANQUANT] icon-512x512.png
)

echo.
echo ========================================
echo.
echo Pour plus d'informations, consultez :
echo GUIDE-REMPLACEMENT-LOGO.md
echo.
pause
