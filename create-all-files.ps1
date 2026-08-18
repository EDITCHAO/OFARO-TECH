# Script pour créer tous les fichiers manquants du backend

Write-Host "🚀 Création de la structure complète du backend..." -ForegroundColor Cyan

# Créer les dossiers
$folders = @(
    "src/controllers",
    "src/routes",
    "src/middleware",
    "src/utils",
    "src/types",
    "uploads/internships",
    "uploads/applications",
    "uploads/quotes"
)

foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "✅ Créé: $folder" -ForegroundColor Green
    }
}

Write-Host "`n✅ Structure créée avec succès!" -ForegroundColor Green
Write-Host "`n📝 Prochaines étapes:" -ForegroundColor Yellow
Write-Host "1. cd ofaro-tech-backend" -ForegroundColor White
Write-Host "2. npm install" -ForegroundColor White
Write-Host "3. Copier .env.example vers .env et configurer" -ForegroundColor White
Write-Host "4. npm run dev" -ForegroundColor White
