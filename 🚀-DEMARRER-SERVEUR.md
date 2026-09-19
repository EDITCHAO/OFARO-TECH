# 🚀 Démarrer le serveur frontend

## ⚡ MÉTHODE RAPIDE

### Ouvrez PowerShell dans le dossier `ofaro-tech-website`

```powershell
npm run dev
```

OU double-cliquez sur : `START-FRONTEND.ps1`

---

## ✅ Confirmer que ça marche

Vous devez voir :

```
  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000
  - Network:      http://0.0.0.0:3000

 ✓ Ready in 3.2s
```

---

## 🎯 Tester la médiathèque

Une fois le serveur démarré :

1. Ouvrez : `http://localhost:3000/admin/mediatheque`
2. Vous devez voir la page avec le bouton **"Uploader des images"** (orange, en haut à droite)

---

## 🐛 Si vous ne voyez pas le bouton

### Vérifiez que la page charge

1. Ouvrez la console du navigateur (**F12** → Console)
2. Cherchez des erreurs en rouge
3. Si vous voyez une erreur, envoyez-moi le message complet

### Vérifiez que le serveur tourne

```powershell
# Dans PowerShell
Get-Process -Name "node" | Select-Object ProcessName, Id, CPU
```

Vous devez voir un processus "node".

---

## 📸 À quoi ressemble la page médiathèque

```
┌───────────────────────────────────────────────────────┐
│  📸 Médiathèque Centralisée                           │
│  Gérez toutes les images de votre site                │
│                                [Uploader des images]  │ ← Bouton ORANGE
├───────────────────────────────────────────────────────┤
│  🔍 [Rechercher...]   [Catégorie ▼]                  │
│  Total: 0 images • Affichées: 0 images                │
├───────────────────────────────────────────────────────┤
│                                                        │
│  📸 Aucune image trouvée                              │
│  Uploader votre première image                        │
│                                                        │
└───────────────────────────────────────────────────────┘
```

Si vous voyez cet écran vide, **c'est NORMAL** ! Il n'y a pas encore d'images.

---

## 🎯 TESTEZ L'UPLOAD

1. Cliquez **"Uploader des images"** (bouton orange)
2. Une fenêtre s'ouvre (modal)
3. Cliquez **"Sélectionner les images"**
4. Choisissez une image de test
5. Catégorie : **Portfolio**
6. Cliquez **"Uploader"**
7. L'image apparaît dans la grille !

---

Si le bouton "Uploader des images" n'apparaît pas, faites-moi signe !
