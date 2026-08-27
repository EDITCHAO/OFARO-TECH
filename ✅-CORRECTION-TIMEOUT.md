# ✅ CORRECTION : Erreur timeout de connexion

## ❌ L'erreur

```
Error: Connection terminated due to connection timeout
POST /api/service-requests/submit 500 (Internal Server Error)
```

**Cause** : Le timeout de connexion était trop court (2 secondes) pour Supabase qui peut prendre plus de temps à répondre.

---

## ✅ CORRECTION APPLIQUÉE

### Fichier modifié : `lib/db.ts`

**Avant** :
```typescript
connectionTimeoutMillis: 2000,  // 2 secondes - TROP COURT
```

**Après** :
```typescript
connectionTimeoutMillis: 10000,  // 10 secondes - OK pour Supabase
ssl: process.env.DB_HOST?.includes('supabase.co') ? { rejectUnauthorized: false } : false,
```

**Améliorations** :
- ✅ Timeout augmenté de 2s à 10s
- ✅ SSL automatiquement activé pour Supabase
- ✅ Plus de temps pour établir la connexion

---

## 🔄 SERVEUR REDÉMARRÉ

Le serveur a été automatiquement redémarré et est actif sur :
- **Local** : http://localhost:3000
- **Network** : http://192.168.1.71:3000

---

## 🧪 TESTEZ MAINTENANT

### 1. Attendez 10 secondes que le serveur soit prêt

Puis testez le formulaire :

### 2. Soumettre une demande

1. Allez sur http://localhost:3000
2. Scrollez jusqu'au formulaire orange "Besoin d'un service spécifique ?"
3. Remplissez :
   ```
   Nom: Test Correction Timeout
   Email: test@ofarotech.com
   Téléphone: +228 90 12 34 56
   Service: Développement Web
   Description: Test après correction du timeout
   ```
4. Cliquez sur **"Envoyer la demande"**

**Résultat attendu** :
✅ Message de succès en vert avec référence **SR-001**

**Temps d'attente** :
⏳ 3-10 secondes (normal avec Supabase)

---

## 📊 CE QUI SE PASSE

1. Le formulaire envoie la requête
2. Le serveur tente de se connecter à Supabase
3. **Avant** : Timeout après 2s → ❌ Erreur
4. **Maintenant** : Attend jusqu'à 10s → ✅ Succès

---

## ⚠️ SI LE PROBLÈME PERSISTE

### Option 1 : Vérifier que les tables existent

```powershell
node scripts/test-db-connection.js
```

**Si vous voyez** : "Table service_requests : N'EXISTE PAS"

**Solution** :
1. Allez sur https://supabase.com
2. Votre projet → **🔧 SQL Editor** → **+ New query**
3. Copiez tout le contenu de `database/schema.sql`
4. Collez et cliquez **Run**

### Option 2 : Vérifier les credentials

Ouvrez `.env.local` et vérifiez que les valeurs sont correctes :

```env
DB_HOST=db.rfatempjwgpznkacmhvo.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=zNAlL6eAwO7pUX5q
```

**Testez la connexion manuellement** :
1. Allez sur Supabase
2. **Settings** → **Database** → **Connection string**
3. Vérifiez que les valeurs correspondent

### Option 3 : Utiliser Connection Pooling

Si Direct connection est trop lent, essayez Connection pooling :

Sur Supabase :
- **Settings** → **Database** → **Connection string**
- Onglet **Connection pooling** (au lieu de Direct connection)
- Mode **Transaction**

Mettez à jour `.env.local` :
```env
DB_HOST=aws-0-xx-xxxx.pooler.supabase.com
DB_PORT=6543
DB_USER=postgres.rfatempjwgpznkacmhvo
DB_PASSWORD=zNAlL6eAwO7pUX5q
```

Puis redémarrez : `npm run dev`

---

## 🎯 RÉSULTAT ATTENDU

Après cette correction :

✅ Le formulaire soumet correctement (même si ça prend 3-10 secondes)
✅ Message de succès avec référence SR-XXX
✅ Demande visible dans l'admin
✅ Demande enregistrée dans Supabase

---

## 📝 NOTES IMPORTANTES

### Pourquoi ça prend du temps ?

Supabase est un service cloud hébergé en Europe. La connexion depuis le Togo peut prendre quelques secondes, c'est normal.

**Temps normaux** :
- Local DB : 10-100 ms
- Supabase : 2-10 secondes (première connexion)
- Supabase : 500ms-2s (connexions suivantes avec pool)

### Comment optimiser ?

1. Utiliser **Connection pooling** (recommandé)
2. Garder le serveur toujours actif (pas de redémarrage)
3. Le pool maintient les connexions ouvertes

---

## ✅ CHECKLIST

- [x] Timeout augmenté à 10 secondes
- [x] SSL activé pour Supabase
- [x] Serveur redémarré
- [ ] Test de soumission du formulaire
- [ ] Vérification dans l'admin
- [ ] Confirmation que tout fonctionne

---

**Testez maintenant et confirmez que ça fonctionne ! 🚀**
