# ⚡ LANCEMENT RAPIDE SUR RENDER

Guide ultra-simplifié pour déployer en 10 minutes !

---

## 🎯 RÉSUMÉ EN 5 ÉTAPES

```
1. Push sur GitHub       →  5 min
2. Créer PostgreSQL      →  2 min
3. Créer Web Service     →  2 min
4. Configurer variables  →  3 min
5. Déployer !            →  Automatique
```

---

## 1️⃣ PUSH SUR GITHUB (5 min)

```bash
cd c:\PROJET\OFARO TECH\ofaro-tech-backend

# Init Git
git init
git add .
git commit -m "Backend initial"

# Créer repo sur GitHub.com
# Nom: ofaro-tech-backend

# Push (remplacer USERNAME)
git remote add origin https://github.com/USERNAME/ofaro-tech-backend.git
git branch -M main
git push -u origin main
```

✅ Code sur GitHub !

---

## 2️⃣ CRÉER POSTGRESQL (2 min)

### Sur https://render.com

1. **New +** → **PostgreSQL**
2. Remplir :
   ```
   Name: ofaro-tech-db
   Database: ofaro_tech
   User: ofaro_tech_user
   Region: Frankfurt
   Plan: Free
   ```
3. **Create Database**
4. **COPIER** les infos de connexion (Host, Password, etc.)
5. Dans **Shell**, coller tout le contenu de `database/schema.sql`

✅ Base créée !

---

## 3️⃣ CRÉER WEB SERVICE (2 min)

1. **New +** → **Web Service**
2. Connecter GitHub → Sélectionner `ofaro-tech-backend`
3. Remplir :
   ```
   Name: ofaro-tech-backend
   Region: Frankfurt
   Branch: main
   Runtime: Node
   Build: npm install && npm run build
   Start: npm start
   Plan: Free
   ```

**⚠️ NE PAS ENCORE CLIQUER SUR "CREATE" !**

---

## 4️⃣ VARIABLES D'ENVIRONNEMENT (3 min)

Sur la même page, descendre et ajouter :

### Minimum requis (9 variables)

```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://ofarotech.vercel.app

# Copier depuis PostgreSQL Info
DB_HOST=dpg-xxxxx-a.frankfurt-postgres.render.com
DB_PORT=5432
DB_NAME=ofaro_tech
DB_USER=ofaro_tech_user
DB_PASSWORD=***votre_password_postgresql***

# Générer un secret fort
JWT_SECRET=***generer_un_secret_unique_ici***
```

### Comment générer JWT_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

✅ Variables ajoutées !

---

## 5️⃣ DÉPLOYER ! (Automatique)

1. Cliquer sur **"Create Web Service"**
2. Attendre 2-3 minutes
3. Voir les logs défiler
4. Statut passe à 🟢 **Live**

### Votre URL

```
https://ofaro-tech-backend.onrender.com
```

---

## ✅ TESTER

```bash
# Test 1: Health check
curl https://ofaro-tech-backend.onrender.com/health

# Test 2: API
curl -X POST https://ofaro-tech-backend.onrender.com/api/services/request \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "Test",
    "client_email": "test@test.com",
    "client_phone": "+33612345678",
    "service_type": "Test",
    "description": "Test de l API"
  }'
```

Résultat attendu : 
```json
{
  "success": true,
  "reference": "SR-001",
  ...
}
```

✅ **ÇA MARCHE !** 🎉

---

## 🔧 CONFIGURER FRONTEND

### Sur Vercel.com

1. Projet `ofaro-tech-website`
2. **Settings** → **Environment Variables**
3. Ajouter :
   ```
   NEXT_PUBLIC_API_URL=https://ofaro-tech-backend.onrender.com
   ```
4. **Redeploy**

### Dans le code

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;
fetch(`${API_URL}/api/services/request`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

---

## ❌ PROBLÈMES ?

### Déploiement échoue

```bash
# Tester localement
npm install
npm run build
# Corriger les erreurs
# Push à nouveau
```

### Base de données ne connecte pas

1. Vérifier les variables `DB_*`
2. Comparer avec PostgreSQL Info
3. Sauvegarder → Redeploy automatique

### CORS error

Vérifier `FRONTEND_URL` :
- ✅ Correct : `https://ofarotech.vercel.app`
- ❌ Incorrect : `https://ofarotech.vercel.app/`

---

## 📚 DOCUMENTATION COMPLÈTE

Voir `GUIDE-RENDER-COMPLET.md` pour tous les détails.

---

## 🎉 TERMINÉ !

Votre backend est maintenant :
- ✅ En ligne sur Render
- ✅ Connecté à PostgreSQL
- ✅ Prêt à recevoir des requêtes
- ✅ Déploiement auto à chaque push

**URL :** `https://ofaro-tech-backend.onrender.com`

**Prochaines étapes :**
1. Tester toutes les routes
2. Connecter le frontend
3. Implémenter l'authentification (Phase 2)

**Bon courage ! 🚀**
