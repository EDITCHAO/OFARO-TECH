# Script PowerShell pour nettoyer et redémarrer

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  NETTOYAGE et REDEMARRAGE du serveur" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Naviguer vers le projet
Set-Location "c:\PROJET\OFARO TECH\ofaro-tech-website"

# Arrêter les processus Node.js
Write-Host "Arret des serveurs Node.js..." -ForegroundColor Yellow
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Supprimer le cache .next
Write-Host "Suppression du cache .next..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "Cache .next supprime !" -ForegroundColor Green
}

# Supprimer le cache node_modules
Write-Host "Suppression du cache node_modules\.cache..." -ForegroundColor Yellow
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache"
    Write-Host "Cache node_modules supprime !" -ForegroundColor Green
}

Write-Host ""
Write-Host "Nettoyage termine !" -ForegroundColor Green
Write-Host ""
Write-Host "Maintenant, executez manuellement:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Le serveur sera accessible sur:" -ForegroundColor Cyan
Write-Host "  - Local:   http://localhost:3000" -ForegroundColor White
Write-Host "  - Network: http://192.168.1.71:3000" -ForegroundColor White
Write-Host ""

Read-Host "Appuyez sur Entree pour terminer"
