@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   OPTIMISATION IMAGES SERVICES
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Installation de Sharp (outil d'optimisation)...
call npm install sharp --save-dev --silent

echo.
echo [2/3] Creation du script d'optimisation...

REM Créer le script Node.js
(
echo const sharp = require('sharp'^);
echo const fs = require('fs'^);
echo const path = require('path'^);
echo.
echo const inputDir = 'public/images/nos services';
echo.
echo async function optimizeImages(^) {
echo     const files = fs.readdirSync(inputDir^);
echo     console.log('\n========================================'^);
echo     console.log('  OPTIMISATION EN COURS...'^);
echo     console.log('========================================\n'^);
echo     for (const file of files^) {
echo         if (file.endsWith('.jpg'^) ^|^| file.endsWith('.jpeg'^) ^|^| file.endsWith('.png'^)^) {
echo             const inputPath = path.join(inputDir, file^);
echo             const statsBefore = fs.statSync(inputPath^);
echo             const sizeBefore = (statsBefore.size / 1024 / 1024^).toFixed(2^);
echo             console.log('Optimisation: ' + file^);
echo             console.log('  Avant: ' + sizeBefore + ' MB'^);
echo             try {
echo                 await sharp(inputPath^)
echo                     .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true }^)
echo                     .jpeg({ quality: 80, progressive: true }^)
echo                     .toFile(inputPath + '.tmp'^);
echo                 fs.unlinkSync(inputPath^);
echo                 fs.renameSync(inputPath + '.tmp', inputPath^);
echo                 const statsAfter = fs.statSync(inputPath^);
echo                 const sizeAfter = (statsAfter.size / 1024 / 1024^).toFixed(2^);
echo                 const reduction = ((statsBefore.size - statsAfter.size^) / statsBefore.size * 100^).toFixed(1^);
echo                 console.log('  Apres: ' + sizeAfter + ' MB (^-' + reduction + '%%^)'^);
echo                 console.log('  OK\n'^);
echo             } catch (error^) {
echo                 console.log('  ERREUR: ' + error.message + '\n'^);
echo             }
echo         }
echo     }
echo     console.log('========================================'^);
echo     console.log('  TERMINÉ !'^);
echo     console.log('========================================\n'^);
echo }
echo.
echo optimizeImages(^).catch(console.error^);
) > optimize-services.js

echo.
echo [3/3] Optimisation des images...
echo.

node optimize-services.js

echo.
echo ========================================
echo   TERMINÉ !
echo ========================================
echo.
echo Les images ont été optimisées.
echo Rafraîchissez la page /services pour voir la différence !
echo.
pause
