@echo off
echo.
echo ========================================
echo   Verification des images PNG
echo ========================================
echo.

cd /d "%~dp0"

set count=0
set missing=0

echo [HERO SECTION]
echo.
if exist "public\images\hero\hero-image.png" (
    echo [OK] hero-image.png
    set /a count+=1
) else (
    echo [MANQUANT] hero-image.png
    set /a missing+=1
)

echo.
echo [PROJECTS - 6 images]
echo.

if exist "public\images\projects\ecommerce.png" (
    echo [OK] ecommerce.png
    set /a count+=1
) else (
    echo [MANQUANT] ecommerce.png
    set /a missing+=1
)

if exist "public\images\projects\banking-app.png" (
    echo [OK] banking-app.png
    set /a count+=1
) else (
    echo [MANQUANT] banking-app.png
    set /a missing+=1
)

if exist "public\images\projects\hospital.png" (
    echo [OK] hospital.png
    set /a count+=1
) else (
    echo [MANQUANT] hospital.png
    set /a missing+=1
)

if exist "public\images\projects\branding.png" (
    echo [OK] branding.png
    set /a count+=1
) else (
    echo [MANQUANT] branding.png
    set /a missing+=1
)

if exist "public\images\projects\network.png" (
    echo [OK] network.png
    set /a count+=1
) else (
    echo [MANQUANT] network.png
    set /a missing+=1
)

if exist "public\images\projects\school.png" (
    echo [OK] school.png
    set /a count+=1
) else (
    echo [MANQUANT] school.png
    set /a missing+=1
)

echo.
echo [SECTORS - 6 images]
echo.

if exist "public\images\sectors\banking.png" (
    echo [OK] banking.png
    set /a count+=1
) else (
    echo [MANQUANT] banking.png
    set /a missing+=1
)

if exist "public\images\sectors\education.png" (
    echo [OK] education.png
    set /a count+=1
) else (
    echo [MANQUANT] education.png
    set /a missing+=1
)

if exist "public\images\sectors\health.png" (
    echo [OK] health.png
    set /a count+=1
) else (
    echo [MANQUANT] health.png
    set /a missing+=1
)

if exist "public\images\sectors\commerce.png" (
    echo [OK] commerce.png
    set /a count+=1
) else (
    echo [MANQUANT] commerce.png
    set /a missing+=1
)

if exist "public\images\sectors\government.png" (
    echo [OK] government.png
    set /a count+=1
) else (
    echo [MANQUANT] government.png
    set /a missing+=1
)

if exist "public\images\sectors\ngo.png" (
    echo [OK] ngo.png
    set /a count+=1
) else (
    echo [MANQUANT] ngo.png
    set /a missing+=1
)

echo.
echo ========================================
echo   RESUME
echo ========================================
echo.
echo Images trouvees : %count% / 13
echo Images manquantes : %missing%
echo.

if %count%==13 (
    echo [SUCCESS] Toutes les images sont presentes !
    echo Vous pouvez lancer : npm run dev
) else (
    echo [ATTENTION] Il manque des images.
    echo Consultez : GUIDE-IMAGES-PNG.md
)

echo.
pause
