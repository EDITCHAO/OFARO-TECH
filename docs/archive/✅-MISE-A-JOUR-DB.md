# ✅ MISE À JOUR DE LA CONNEXION DB

## 🔧 Ce qui a été fait

### 1. Mise à jour de `.env.local`

**Anciennes valeurs** (Connection pooling) :
```env
DB_HOST=aws-0-eu-west-1.pooler.supabase.com
DB_PORT=6543
DB_USER=postgres.rfatempjwgpznkacmhvo
```

**Nouvelles valeurs** (Direct connection) ✅ :
```env
DB_HOST=db.rfatempjwgpznkacmhvo.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=zNAlL6eAwO7pUX5q
```

### 2. Serveur redémarré ✅

Le serveur Next.js a été redémarré et est actif sur :
- **Local** : http://localhost:3000
- **Network** : http://192.168.1.71:3000

---

## 🧪 TESTEZ MAINTENANT

### Test 1 : Soumettre une demande

1. Allez sur http://localhost:3000
2. Scrollez jusqu'à la section orange **"Besoin d'un service spécifique ?"**
3. Remplissez le formulaire :
   ```
   Nom: Test OFARO
   Email: test@ofarotech.com
   Téléphone: +228 90 12 34 56
   Service: Développement Web
   Description: Test après correction de la connexion DB
   ```
4. Cliquez sur **"Envoyer la demande"**

**Résultat attendu** :
✅ Message de succès en vert avec référence **SR-001**

**Si erreur** :
❌ Regardez la console du navigateur (F12 → Console)

### Test 2 : Vérifier dans l'admin

1. Ouvrez http://localhost:3000/admin/service-requests
2. ✅ Votre demande doit apparaître dans le tableau

---

## 📋 Si les tables n'existent pas

Si vous voyez une erreur comme :
```
relation "service_requests" does not exist
```

**Solution** :

1. Allez sur https://supabase.com
2. Ouvrez votre projet
3. Menu gauche → **🔧 SQL Editor**
4. Cliquez sur **+ New query**
5. Ouvrez le fichier `database/schema.sql` dans votre projet
6. **Copiez TOUT le contenu** du fichier
7. **Collez** dans l'éditeur SQL de Supabase
8. Cliquez sur **Run** (ou Ctrl+Enter)
9. Attendez la fin de l'exécution (peut prendre 10-30 secondes)
10. Retestez le formulaire

---

## ✅ Vérification de la connexion

Pour vérifier manuellement la connexion :

```powershell
cd "c:\PROJET\OFARO TECH\ofaro-tech-website"
node scripts/test-db-connection.js
```

**Si ça affiche** :
```
✓ Connexion réussie !
✓ Table service_requests : EXISTE
Nombre de demandes : X
```

**Alors tout est OK !** ✅

---

## 🎯 Après le test

Une fois que le formulaire fonctionne :

### Fonctionnalités disponibles

1. ✅ **Soumission de demandes** depuis le site
2. ✅ **Consultation** dans l'admin
3. ✅ **Recherche** par nom, email, téléphone, service
4. ✅ **Filtrage** par statut
5. ✅ **Export CSV** de toutes les demandes

### Prochaines étapes

- Tester depuis un téléphone sur le même WiFi
- Ajouter l'authentification admin (optionnel)
- Configurer les notifications email (optionnel)

---

## 🔄 Si le problème persiste

### Option 1 : Vérifier le mot de passe

Le mot de passe actuellement utilisé est : `zNAlL6eAwO7pUX5q`

Si ce n'est pas le bon, mettez à jour dans `.env.local` :
```env
DB_PASSWORD=VOTRE_NOUVEAU_MOT_DE_PASSE
```

Puis redémarrez le serveur :
```powershell
# Dans le terminal, faites Ctrl+C puis :
npm run dev
```

### Option 2 : Réinitialiser le mot de passe Supabase

1. Sur Supabase → **Settings** → **Database**
2. Section **Database password**
3. Cliquez sur **Reset database password**
4. Notez le nouveau mot de passe
5. Mettez-le dans `.env.local`
6. Redémarrez le serveur

### Option 3 : Utiliser Connection Pooling

Si Direct connection ne fonctionne pas, retournez sur Connection pooling :

Sur Supabase → **Settings** → **Database** → **Connection string**
- Onglet **Connection pooling**
- Mode **Transaction**

Mettez à jour `.env.local` avec les nouvelles valeurs (Host, Port, User).

---

## 📞 Récapitulatif

✅ **Fichier mis à jour** : `.env.local`  
✅ **Serveur redémarré** : http://localhost:3000  
🧪 **À tester** : Soumettre une demande  
🧪 **À vérifier** : Voir dans l'admin  

---

**Testez maintenant et confirmez que ça fonctionne ! 🚀**
