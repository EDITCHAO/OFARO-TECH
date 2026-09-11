# Script pour commiter les modifications du système de gestion des projets

Write-Host "=== Commit des modifications - Gestion des Projets ===" -ForegroundColor Green

# Add all changes
Write-Host "`nAjout des fichiers..." -ForegroundColor Yellow
git add components/admin/ProjectsManagement.tsx
git add app/admin/page.tsx  
git add INSTALLATION-PROJETS.md

# Show status
Write-Host "`nStatut Git:" -ForegroundColor Yellow
git status --short

# Commit
Write-Host "`nCréation du commit..." -ForegroundColor Yellow
git commit -m "feat: Add complete projects management interface in admin with CRUD, image upload and technologies"

# Push
Write-Host "`nPush vers GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "`n=== Terminé ! ===" -ForegroundColor Green
