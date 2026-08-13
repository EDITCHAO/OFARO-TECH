# Script de vérification des logos
# Ce script vérifie que tous les fichiers de logo nécessaires sont présents

Write-Host "=== Vérification des logos OFARO TECH ===" -ForegroundColor Cyan
Write-Host ""

$publicPath = "c:\PROJET\OFARO TECH\ofaro-tech-website\public"
$requiredFiles = @(
    "logo-ofaro.png",
    "icon-192x192.png",
    "icon-512x512.png"
)

$optionalFiles = @(
    "logo-ot-square.png"
)

$allGood = $true

Write-Host "Fichiers requis:" -ForegroundColor Yellow
foreach ($file in $requiredFiles) {
    $filePath = Join-Path $publicPath $file
    if (Test-Path $filePath) {
        Write-Host "  ✓ $file" -ForegroundColor Green
        $fileInfo = Get-Item $filePath
        Write-Host "    Taille: $([math]::Round($fileInfo.Length / 1KB, 2)) KB" -ForegroundColor Gray
    } else {
        Write-Host "  ✗ $file (MANQUANT)" -ForegroundColor Red
        $allGood = $false
    }
}

Write-Host ""
Write-Host "Fichiers optionnels:" -ForegroundColor Yellow
foreach ($file in $optionalFiles) {
    $filePath = Join-Path $publicPath $file
    if (Test-Path $filePath) {
        Write-Host "  ✓ $file" -ForegroundColor Green
        $fileInfo = Get-Item $filePath
        Write-Host "    Taille: $([math]::Round($fileInfo.Length / 1KB, 2)) KB" -ForegroundColor Gray
    } else {
        Write-Host "  ○ $file (optionnel, non présent)" -ForegroundColor Gray
    }
}

Write-Host ""
if ($allGood) {
    Write-Host "✓ Tous les logos requis sont présents !" -ForegroundColor Green
    Write-Host ""
    Write-Host "Vous pouvez maintenant lancer le serveur avec:" -ForegroundColor Cyan
    Write-Host "  npm run dev" -ForegroundColor White
} else {
    Write-Host "✗ Certains logos sont manquants." -ForegroundColor Red
    Write-Host ""
    Write-Host "Veuillez consulter le fichier:" -ForegroundColor Yellow
    Write-Host "  public\LOGO_INSTALLATION.md" -ForegroundColor White
    Write-Host ""
    Write-Host "Pour les instructions d'installation." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Appuyez sur une touche pour continuer..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
