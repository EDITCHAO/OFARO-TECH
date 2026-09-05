# 🔧 Instructions pour la Migration des Statuts

## Problème
Les tables `quote_requests` et `contact_messages` ont des contraintes CHECK qui n'autorisent pas les nouveaux statuts :
- ❌ "En analyse"
- ❌ "En cours de traitement"

## Solution
Exécuter le fichier SQL de migration dans Supabase.

---

## 📋 Étapes à suivre

### 1. Ouvrir Supabase Dashboard
- Aller sur : https://supabase.com/dashboard
- Se connecter à votre compte
- Sélectionner votre projet : **tidenczexpjvnfebwmw**

### 2. Ouvrir l'éditeur SQL
- Dans le menu de gauche, cliquer sur **SQL Editor**
- Cliquer sur **New Query**

### 3. Copier-coller le contenu du fichier
- Ouvrir le fichier : `database/migrations/update_status_constraints.sql`
- Copier **tout le contenu**
- Coller dans l'éditeur SQL de Supabase

### 4. Exécuter la migration
- Cliquer sur **Run** (ou Ctrl+Enter)
- Attendre la fin de l'exécution

### 5. Vérifier le résultat
- Si tout s'est bien passé, vous verrez "Success"
- Les nouveaux statuts sont maintenant autorisés

---

## 🎯 Ce que fait cette migration

### Pour `quote_requests` (Devis)
✅ Ajoute les statuts :
- `en_analyse`
- `en_cours_de_traitement`

### Pour `contact_messages` (Messages)
✅ Ajoute les statuts :
- `en_analyse`
- `en_cours_de_traitement`
- `sans_suite`

### Pour `service_requests` (Services)
✅ Uniformise les statuts avec les autres tables

### Pour `applications` (Candidatures)
✅ Uniformise les statuts avec les autres tables

---

## ⚠️ En cas d'erreur

Si vous voyez des erreurs du type :
```
constraint "xxx" does not exist
```
**C'est normal !** Cela signifie simplement que la contrainte n'existait pas. L'exécution continue.

Si vous voyez une autre erreur, contactez le développeur.

---

## ✅ Après la migration

1. Rafraîchir la page admin : http://localhost:3000/admin
2. Essayer de changer un statut vers "En analyse" ou "En cours de traitement"
3. ✅ Ça devrait fonctionner maintenant !

---

## 📝 Note technique

Les contraintes CHECK en PostgreSQL/Supabase empêchent d'insérer des valeurs non autorisées.
Cette migration met à jour ces contraintes pour accepter les nouveaux statuts.
