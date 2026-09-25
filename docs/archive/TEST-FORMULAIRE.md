# 🧪 TEST DU FORMULAIRE DE SERVICE

## ✅ Packages installés

Les packages nécessaires sont déjà installés dans `package.json` :
- ✅ `pg` (v8.23.0) - Driver PostgreSQL
- ✅ `dotenv` (v17.4.2) - Variables d'environnement
- ✅ `@types/pg` (v8.23.1) - Types TypeScript

## 🚀 Serveur en cours d'exécution

Le serveur Next.js tourne actuellement sur :
- **Local** : http://localhost:3000
- **Network** : http://192.168.1.71:3000

## 📋 TESTS À EFFECTUER

### Test 1 : Vérifier que le formulaire s'affiche

1. Ouvrez votre navigateur
2. Allez sur http://localhost:3000
3. Scrollez vers le bas jusqu'à la section **"Besoin d'un service spécifique ?"** (fond orange)
4. ✅ Vérifiez que le formulaire contient ces champs :
   - Nom complet
   - Email
   - Téléphone
   - Service souhaité (dropdown)
   - Description de votre besoin
   - Bouton "Envoyer la demande"

---

### Test 2 : Soumettre une demande de test

Remplissez le formulaire avec ces données de test :

```
Nom complet: Test OFARO
Email: test@ofarotech.com
Téléphone: +228 90 12 34 56
Service: Développement Web
Description: Test de connexion du formulaire à la base de données Supabase
```

**Résultat attendu** :
- ✅ Message de succès en vert
- ✅ Un numéro de référence (ex: SR-001)
- ✅ Le formulaire se réinitialise

**En cas d'erreur** :
- ❌ Message d'erreur en rouge
- Ouvrez la console du navigateur (F12 → Console) pour voir les détails

---

### Test 3 : Vérifier dans l'admin

1. Ouvrez un nouvel onglet
2. Allez sur http://localhost:3000/admin/service-requests
3. ✅ Vérifiez que votre demande de test apparaît dans le tableau

**Colonnes à vérifier** :
- Date (doit afficher la date/heure actuelle)
- Nom (Test OFARO)
- Email (test@ofarotech.com)
- Téléphone (+228 90 12 34 56)
- Service (Développement Web)
- Statut (badge bleu "Nouvelle")
- Référence (SR-001 ou suivant)

---

### Test 4 : Tester la recherche

Dans la page admin :

1. **Recherche par nom** : Tapez "Test" dans la barre de recherche
   - ✅ Seule la demande "Test OFARO" doit apparaître

2. **Recherche par email** : Tapez "test@ofarotech"
   - ✅ Doit trouver la demande

3. **Recherche par référence** : Tapez "SR-001"
   - ✅ Doit trouver la demande

---

### Test 5 : Tester le filtrage par statut

1. Cliquez sur le dropdown "Filtrer par statut"
2. Sélectionnez **"Nouvelle"**
   - ✅ Doit afficher votre demande de test
3. Sélectionnez **"En cours"**
   - ✅ Ne doit rien afficher (aucune demande en cours)
4. Sélectionnez **"Tous"**
   - ✅ Doit réafficher toutes les demandes

---

### Test 6 : Tester l'export CSV

1. Cliquez sur le bouton **"Exporter CSV"** (en haut à droite)
2. ✅ Un fichier `demandes-service-[DATE].csv` doit se télécharger
3. Ouvrez le fichier avec Excel ou un éditeur de texte
4. ✅ Vérifiez que votre demande de test est dans le fichier

---

### Test 7 : Tester depuis un autre appareil

Si vous voulez tester depuis un téléphone ou un autre PC sur le même WiFi :

1. Sur l'autre appareil, ouvrez le navigateur
2. Allez sur http://192.168.1.71:3000
3. ✅ Le site doit s'afficher
4. Remplissez et soumettez le formulaire
5. ✅ Vérifiez dans l'admin que la demande apparaît

---

## 🔍 VÉRIFICATION DANS LA BASE DE DONNÉES

Si vous voulez vérifier directement dans Supabase :

1. Allez sur https://supabase.com
2. Connectez-vous à votre projet
3. Allez dans **Table Editor**
4. Ouvrez la table **`service_requests`**
5. ✅ Votre demande de test doit y apparaître

**Vérifiez aussi** :
- Table **`contacts`** : Le contact "Test OFARO" doit y être
- Table **`request_history`** : L'historique de création doit être enregistré

---

## ❌ EN CAS DE PROBLÈME

### Problème : Le formulaire ne soumet pas

**Symptômes** :
- Cliquer sur "Envoyer la demande" ne fait rien
- Pas de message d'erreur

**Solution** :
1. Ouvrez la console du navigateur (F12)
2. Regardez l'onglet **Console** pour les erreurs JavaScript
3. Regardez l'onglet **Network** pour voir si la requête POST part
4. Si vous voyez une erreur 500, c'est un problème serveur

---

### Problème : Erreur "Failed to fetch"

**Cause** : Le serveur Next.js ne répond pas

**Solution** :
```powershell
# Vérifier que le serveur tourne
cd "c:\PROJET\OFARO TECH\ofaro-tech-website"
npm run dev
```

---

### Problème : Erreur de connexion à la base de données

**Symptômes** :
- Message d'erreur dans la console serveur
- `ECONNREFUSED` ou `Connection refused`

**Solution** :
1. Vérifiez que `.env.local` existe et contient les bonnes credentials
2. Vérifiez votre connexion internet
3. Testez la connexion manuellement :
   ```powershell
   node scripts/test-db-connection.js
   ```

---

### Problème : La page admin est vide

**Causes possibles** :
1. Aucune demande n'a été soumise
2. Erreur de connexion à la base de données
3. Les tables n'existent pas

**Solution** :
1. Soumettez d'abord une demande de test
2. Ouvrez la console du navigateur (F12) pour voir les erreurs
3. Testez l'API directement : http://localhost:3000/api/service-requests
4. Si les tables n'existent pas, exécutez `database/schema.sql` dans Supabase

---

### Problème : Erreur "Table does not exist"

**Cause** : Les tables de la base de données n'ont pas été créées

**Solution** :
1. Allez sur https://supabase.com
2. Ouvrez votre projet
3. Allez dans **SQL Editor**
4. Créez une nouvelle query
5. Copiez le contenu de `database/schema.sql`
6. Exécutez le script
7. Redémarrez le serveur Next.js

---

## 📊 RÉSULTATS ATTENDUS

Après avoir effectué tous les tests :

✅ **Formulaire** :
- S'affiche correctement sur la page d'accueil
- Tous les champs sont présents et fonctionnels
- La soumission fonctionne
- Messages de succès/erreur s'affichent

✅ **API** :
- POST `/api/service-requests/submit` fonctionne
- GET `/api/service-requests` retourne les données
- Les demandes sont enregistrées dans la base

✅ **Admin** :
- La page affiche toutes les demandes
- La recherche fonctionne
- Le filtrage par statut fonctionne
- L'export CSV fonctionne
- Les badges de statut s'affichent correctement

✅ **Base de données** :
- Table `service_requests` contient les demandes
- Table `contacts` contient les contacts
- Table `request_history` contient l'historique

---

## 🎯 CHECKLIST FINALE

Avant de déclarer le système opérationnel :

- [ ] Formulaire visible sur la page d'accueil
- [ ] Soumission d'une demande de test réussie
- [ ] Référence SR-XXX générée
- [ ] Demande visible dans l'admin
- [ ] Recherche fonctionnelle
- [ ] Filtrage par statut fonctionnel
- [ ] Export CSV fonctionnel
- [ ] Données présentes dans Supabase
- [ ] Contact créé dans la table `contacts`
- [ ] Historique enregistré dans `request_history`
- [ ] Test depuis un autre appareil réussi

---

## 🎉 SI TOUS LES TESTS PASSENT

**Félicitations ! Le formulaire est entièrement fonctionnel !** 🚀

Vous pouvez maintenant :
1. ✅ Recevoir des demandes de service depuis le site
2. ✅ Consulter toutes les demandes dans l'admin
3. ✅ Rechercher et filtrer les demandes
4. ✅ Exporter les données en CSV

**Prochaines étapes suggérées** :
- Ajouter l'authentification admin
- Implémenter la modification de statut
- Configurer les notifications email
- Créer un dashboard de statistiques

---

**Date de test** : À remplir  
**Testé par** : À remplir  
**Résultat** : ✅ Succès / ❌ Échec  
**Notes** : À remplir
