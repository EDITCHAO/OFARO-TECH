# Script de test de l'API Backend OFARO TECH

Write-Host "🧪 TEST DE L'API BACKEND OFARO TECH" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "1️⃣  Test Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/health" -Method Get
    Write-Host "✅ Health check réussi!" -ForegroundColor Green
    Write-Host "   Status: $($health.status)" -ForegroundColor Gray
    Write-Host "   Environment: $($health.environment)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "❌ Health check échoué: $_" -ForegroundColor Red
    Write-Host ""
}

# Test 2: Créer une demande de contact
Write-Host "2️⃣  Test Message de Contact..." -ForegroundColor Yellow
try {
    $contactBody = @{
        full_name = "Jean Dupont"
        email = "jean.dupont@example.com"
        phone = "+228 90 12 34 56"
        subject = "Demande d'information"
        message = "Bonjour, je souhaite obtenir plus d'informations sur vos services."
    } | ConvertTo-Json

    $contact = Invoke-RestMethod -Uri "http://localhost:5000/api/contact" -Method Post -Body $contactBody -ContentType "application/json"
    Write-Host "✅ Message de contact envoyé!" -ForegroundColor Green
    Write-Host "   ID: $($contact.data.id)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "❌ Erreur contact: $_" -ForegroundColor Red
    Write-Host ""
}

# Test 3: Créer une demande de service
Write-Host "3️⃣  Test Demande de Service..." -ForegroundColor Yellow
try {
    $serviceBody = @{
        client_name = "Marie Martin"
        client_email = "marie.martin@example.com"
        client_phone = "+228 91 23 45 67"
        company_name = "ACME Corp"
        service_type = "Développement Web"
        description = "Nous avons besoin d'un site web vitrine pour notre entreprise avec 5 pages principales."
        urgency = "normale"
        budget_range = "500000-1000000 FCFA"
    } | ConvertTo-Json

    $service = Invoke-RestMethod -Uri "http://localhost:5000/api/services/request" -Method Post -Body $serviceBody -ContentType "application/json"
    Write-Host "✅ Demande de service créée!" -ForegroundColor Green
    Write-Host "   Référence: $($service.reference)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "❌ Erreur service: $_" -ForegroundColor Red
    Write-Host ""
}

# Test 4: Créer une demande de devis
Write-Host "4️⃣  Test Demande de Devis..." -ForegroundColor Yellow
try {
    $quoteBody = @{
        company_name = "Tech Solutions SARL"
        sector = "Services informatiques"
        email = "contact@techsolutions.tg"
        phone = "+228 92 34 56 78"
        city = "Lomé"
        services = @("Développement Web", "Hébergement")
        project_description = "Site e-commerce avec paiement mobile money"
        has_logo = $true
        has_domain = $false
        budget = "2000000-5000000 FCFA"
        contact_first_name = "Paul"
        contact_last_name = "Agbodji"
        desired_delivery_date = "2026-10-01"
    } | ConvertTo-Json

    $quote = Invoke-RestMethod -Uri "http://localhost:5000/api/quotes" -Method Post -Body $quoteBody -ContentType "application/json"
    Write-Host "✅ Demande de devis créée!" -ForegroundColor Green
    Write-Host "   Référence: $($quote.reference)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "❌ Erreur devis: $_" -ForegroundColor Red
    Write-Host ""
}

# Test 5: Statistiques des devis
Write-Host "5️⃣  Test Statistiques..." -ForegroundColor Yellow
try {
    $stats = Invoke-RestMethod -Uri "http://localhost:5000/api/quotes/stats" -Method Get
    Write-Host "✅ Statistiques récupérées!" -ForegroundColor Green
    Write-Host "   Total: $($stats.data.total)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "❌ Erreur stats: $_" -ForegroundColor Red
    Write-Host ""
}

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "✅ Tests terminés!" -ForegroundColor Green
