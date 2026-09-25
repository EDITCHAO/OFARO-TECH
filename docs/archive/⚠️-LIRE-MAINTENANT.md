# ⚠️ IMPORTANT : Démarrer le serveur frontend

## 🔴 PROBLÈME ACTUEL

Le serveur frontend (Next.js) ne tourne pas.

C'est pour ça que vous ne voyez rien sur la page médiathèque !

---

## ✅ SOLUTION (30 SECONDES)

### 1. Ouvrez PowerShell

**Windows PowerShell** (pas CMD)

### 2. Allez dans le dossier

```powershell
cd "c:\PROJET\OFARO TECH\ofaro-tech-website"
```

### 3. Lancez le serveur

```powershell
npm run dev
```

### 4. Attendez le message

```
  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000

 ✓ Ready in 3.2s
```

### 5. Ouvrez votre navigateur

```
http://localhost:3000/admin/mediatheque
```

---

## 📸 CE QUE VOUS DEVEZ VOIR

```
┌─────────────────────────────────────────────────────┐
│                                                      │
│  📸 Médiathèque Centralisée                         │
│  Gérez toutes les images de votre site              │
│                                                      │
│                      [Uploader des images]          │ ← BOUTON ORANGE
│                                                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  🔍 [Rechercher une image...]  [Catégorie ▼]        │
│                                                      │
│  Total: 0 images • Affichées: 0 images              │
│                                                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│              📸                                      │
│         Aucune image trouvée                         │
│    Uploader votre première image                     │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 TESTER L'UPLOAD

1. **Cliquez** sur le bouton orange **"Uploader des images"**
2. Une fenêtre (modal) s'ouvre
3. **Cliquez** "Sélectionner les images"
4. Choisissez une image de test sur votre ordinateur
5. **Catégorie** : Portfolio
6. **Cliquez** "Uploader"
7. ✅ L'image apparaît dans la grille !

---

## 🐛 SI VOUS NE VOYEZ PAS LE BOUTON

### Vérifiez les erreurs dans la console

1. **F12** dans le navigateur
2. Onglet **"Console"**
3. Cherchez des erreurs en **rouge**
4. Envoyez-moi le message d'erreur complet

---

## 📋 CHECKLIST

- [ ] Serveur frontend démarré (`npm run dev`)
- [ ] Message "Ready" affiché dans PowerShell
- [ ] Page `http://localhost:3000/admin/mediatheque` charge
- [ ] Bouton "Uploader des images" (orange) visible
- [ ] Bucket `media-library` créé dans Supabase
- [ ] Table `media_library` créée dans Supabase

---

## 🚀 STATUT ACTUEL

✅ **Backend** : Tourne sur `http://localhost:5000`  
⏳ **Frontend** : À démarrer manuellement  
✅ **Table** `media_library` : Créée  
✅ **Bucket** `media-library` : Créé (vous l'avez confirmé)  
✅ **Code** : Prêt (500+ lignes)  

**Il ne manque que le démarrage du serveur frontend !**

---

Dites-moi quand le serveur est démarré et ce que vous voyez sur la page ! 🚀
