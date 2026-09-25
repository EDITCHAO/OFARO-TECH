# 🔧 Correction du statut des demandes de service

## 🐛 Problème identifié

Quand un client envoie une demande de service, elle apparaît dans l'admin avec le statut **"En analyse"** au lieu de **"Nouveau"**.

---

## 🔍 Diagnostic

### ✅ Code API correct
Le fichier `app/api/service-requests/submit/route.ts` crée bien les demandes avec `status: 'nouvelle'` :

```typescript
.insert({
  client_name,
  client_email,
  client_phone,
  service_type,
  description,
  reference_number,
  status: 'nouvelle'  // ✅ Correct
})
```

### ✅ Mapping correct
La fonction `normalizeStatus` dans `app/admin/page.tsx` mappe correctement :

```typescript
'nouvelle': 'Nouveau'  // ✅ Correct
```

### ❌ Anciennes demandes avec mauvais statut
Les demandes créées **avant la correction du code** ont été enregistrées avec le statut `'en_analyse'` au lieu de `'nouvelle'`.

---

## 💡 Solution

### Option 1 : Corriger uniquement les demandes jamais modifiées (RECOMMANDÉ)

Exécutez cette requête dans **Supabase SQL Editor** :

```sql
-- Corriger uniquement les demandes qui n'ont jamais été modifiées
UPDATE service_requests 
SET status = 'nouvelle'
WHERE status = 'en_analyse' 
  AND updated_at IS NULL;
```

**Pourquoi cette option ?**
- Ne touche que les demandes qui n'ont jamais été mises à jour
- Préserve les demandes qui ont été volontairement mises "En analyse" par l'admin

---

### Option 2 : Corriger TOUTES les demandes en analyse

Si vous voulez forcer **toutes** les demandes "En analyse" à devenir "Nouveau" :

```sql
-- Corriger TOUTES les demandes 'en_analyse'
UPDATE service_requests 
SET status = 'nouvelle'
WHERE status = 'en_analyse';
```

**⚠️ Attention :**
- Cela va aussi changer les demandes qui ont été volontairement mises "En analyse"
- Utilisez seulement si vous êtes sûr

---

## 📋 Étapes complètes

### 1. Vérifier les statuts actuels

```sql
SELECT id, client_name, status, submitted_at, updated_at
FROM service_requests 
WHERE is_archived = false
ORDER BY submitted_at DESC
LIMIT 20;
```

### 2. Appliquer la correction (Option 1)

```sql
UPDATE service_requests 
SET status = 'nouvelle'
WHERE status = 'en_analyse' 
  AND updated_at IS NULL;
```

### 3. Vérifier le résultat

```sql
SELECT id, client_name, status, submitted_at, updated_at
FROM service_requests 
WHERE is_archived = false
ORDER BY submitted_at DESC
LIMIT 20;
```

### 4. Tester dans l'admin

1. Allez sur http://localhost:3000/admin
2. Cliquez sur "Demandes de service"
3. ✅ Les demandes doivent maintenant avoir le statut "Nouveau"
4. ✅ Le badge dans le menu devrait afficher le bon nombre

---

## 🧪 Test de nouvelle demande

Pour confirmer que les **nouvelles** demandes fonctionnent correctement :

1. Allez sur http://localhost:3000 ou http://localhost:3000/services
2. Remplissez le formulaire "Besoin d'un service spécifique ?"
3. Envoyez la demande
4. Allez sur http://localhost:3000/admin → "Demandes de service"
5. ✅ La nouvelle demande devrait avoir le statut "Nouveau"

---

## 📝 Vérification de la contrainte

Pour vérifier que la contrainte SQL autorise `'nouvelle'` :

```sql
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'service_requests'::regclass
AND conname LIKE '%status%';
```

**Résultat attendu :**
```
CHECK (status IN ('nouvelle', 'en_analyse', 'en_cours', 'terminee', 'en_attente', 'rejetee', 'archivee'))
```

---

## 🎯 Résumé

| Situation | Statut dans BDD | Statut affiché | Action |
|-----------|----------------|----------------|--------|
| Nouvelle demande créée maintenant | `'nouvelle'` | "Nouveau" | ✅ OK |
| Ancienne demande créée avant correction | `'en_analyse'` | "En analyse" | ❌ À corriger avec SQL |
| Demande modifiée manuellement | `'en_analyse'` | "En analyse" | ✅ OK (voulu) |

---

## 📦 Fichiers

- `database/fix-service-requests-status.sql` - Script SQL complet avec toutes les requêtes
- `app/api/service-requests/submit/route.ts` - API qui crée les demandes (déjà corrigée)
- `app/admin/page.tsx` - Admin qui affiche les demandes (déjà corrigé)

---

**Statut : ✅ CODE CORRIGÉ - BDD À METTRE À JOUR**
