# Script d'optimisation des images services
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  OPTIMISATION DES IMAGES SERVICES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$sourcePath = "c:\PROJET\OFARO TECH\ofaro-tech-website\public\images\nos services"
$outputPath = "c:\PROJET\OFARO TECH\ofaro-tech-website\public\images\nos services optimized"

# Créer le dossier de sortie s'il n'existe pas
if (-not (Test-Path $outputPath)) {
    New-Item -ItemType Directory -Path $outputPath | Out-Null
    Write-Host "[OK] Dossier optimized cree" -ForegroundColor Green
}

Write-Host ""
Write-Host "Verification de Sharp (outil d'optimisation)..." -ForegroundColor Yellow

# Vérifier si sharp est installé
$sharpInstalled = Test-Path "node_modules\sharp"

if (-not $sharpInstalled) {
    Write-Host "[INFO] Installation de Sharp (outil d'optimisation)..." -ForegroundColor Yellow
    npm install sharp --save-dev
}

Write-Host ""
Write-Host "Creation du script d'optimisation..." -ForegroundColor Yellow

# Créer le script Node.js pour optimiser les images
$nodeScript = @"
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/images/nos services';
const outputDir = 'public/images/nos services';

async function optimizeImages() {
    const files = fs.readdirSync(inputDir);
    
    console.log('\n========================================');
    console.log('  OPTIMISATION EN COURS...');
    console.log('========================================\n');
    
    for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, file);
            
            const statsBefore = fs.statSync(inputPath);
            const sizeBefore = (statsBefore.size / 1024 / 1024).toFixed(2);
            
            console.log('Optimisation: ' + file);
            console.log('  Taille avant: ' + sizeBefore + ' MB');
            
            try {
                await sharp(inputPath)
                    .resize(1200, 1200, { 
                        fit: 'inside',
                        withoutEnlargement: true 
                    })
                    .jpeg({ 
                        quality: 80,
                        progressive: true,
                        mozjpeg: true 
                    })
                    .toFile(outputPath + '.tmp');
                
                // Remplacer le fichier original
                fs.unlinkSync(inputPath);
                fs.renameSync(outputPath + '.tmp', outputPath);
                
                const statsAfter = fs.statSync(outputPath);
                const sizeAfter = (statsAfter.size / 1024 / 1024).toFixed(2);
                const reduction = ((statsBefore.size - statsAfter.size) / statsBefore.size * 100).toFixed(1);
                
                console.log('  Taille apres: ' + sizeAfter + ' MB');
                console.log('  Reduction: ' + reduction + '%');
                console.log('  ✓ OK\n');
            } catch (error) {
                console.log('  ✗ ERREUR: ' + error.message + '\n');
            }
        }
    }
    
    console.log('========================================');
    console.log('  OPTIMISATION TERMINEE !');
    console.log('========================================\n');
}

optimizeImages().catch(console.error);
"@

Set-Content -Path "optimize-services-images.js" -Value $nodeScript

Write-Host "[OK] Script cree: optimize-services-images.js" -ForegroundColor Green
Write-Host ""
Write-Host "Lancement de l'optimisation..." -ForegroundColor Yellow
Write-Host ""

# Exécuter le script Node.js
node optimize-services-images.js

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  OPTIMISATION TERMINEE !" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Appuyez sur une touche pour fermer..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
