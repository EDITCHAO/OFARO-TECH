# 🔧 Corrections - Gestion des Offres d'Emploi

## 📋 Problèmes corrigés

### 1. ✅ Validation des dates
**Problème :** La date limite de candidature pouvait être antérieure à la date de publication

**Solution :**
- Ajout de validation côté client avec message d'erreur
- Attribut `min` sur le champ date limite pour bloquer les dates passées
- Vérification bidirectionnelle (publication → deadline et deadline → publication)

**Fichiers modifiés :**
- `app/admin/offres/nouvelle/page.tsx`
- `app/admin/offres/[id]/modifier/page.tsx`

---

### 2. ✅ Multiple GoTrueClient instances (Warning Supabase)
**Problème :** Multiple instances du client Supabase créées, causant des conflits

**Solution :**
- Utilisation du client Supabase singleton depuis `lib/supabase.ts`
- Remplacement de tous les `createClient()` locaux par l'import du singleton

**Fichiers modifiés :**
- `app/admin/offres/page.tsx`
- `app/admin/offres/nouvelle/page.tsx`
- `app/admin/offres/[id]/modifier/page.tsx`

**Avant :**
```typescript
const { createClient } = await import('@supabase/supabase-js');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

**Après :**
```typescript
const { supabase } = await import('@/lib/supabase');
```

---

### 3. ✅ Erreur 401 sur l'API job_offers
**Problème :** Row Level Security (RLS) activé mais aucune politique définie

**Solution :**
- Création d'une migration SQL pour ajouter les politiques RLS
- Politique de lecture publique pour les offres publiées
- Politique de gestion complète pour les utilisateurs authentifiés

**Fichier créé :**
- `database/migrations/add_rls_job_offers.sql`

---

## 🚀 Installation des corrections

### Étape 1 : Appliquer la migration SQL

Connectez-vous à votre **Supabase Dashboard** :
1. Allez dans **SQL Editor**
2. Copiez le contenu de `database/migrations/add_rls_job_offers.sql`
3. Exécutez la requête

**OU** via CLI :
```bash
supabase db push
```

### Étape 2 : Redémarrer le serveur Next.js

```powershell
# Arrêter le serveur (Ctrl+C)
# Puis relancer
cd ofaro-tech-website
npm run dev
```

---

## 🧪 Tests à effectuer

### Test 1 : Validation des dates
1. Aller sur `/admin/offres/nouvelle`
2. Sélectionner une date de publication (ex: 2026-09-10)
3. Essayer de sélectionner une date limite **avant** la date de publication
4. ✅ **Résultat attendu :** Message d'erreur + impossible de sélectionner

### Test 2 : Plus de warning GoTrueClient
1. Ouvrir la console du navigateur (F12)
2. Naviguer sur `/admin/offres`
3. ✅ **Résultat attendu :** Aucun warning "Multiple GoTrueClient instances"

### Test 3 : Erreur 401 résolue
1. Aller sur `/admin/offres/nouvelle`
2. Remplir le formulaire
3. Cliquer sur "Créer l'offre"
4. ✅ **Résultat attendu :** "Offre créée avec succès" (pas d'erreur 401)

---

## ⚠️ Note de sécurité

La politique RLS actuelle permet à **tous les utilisateurs authentifiés** de gérer les offres.

**Pour la production, vous devez :**

1. **Implémenter une vraie authentification admin**
2. **Créer une table `admin_users` avec rôles**
3. **Modifier la politique RLS** :

```sql
-- Exemple de politique sécurisée
CREATE POLICY "Only admins can manage job offers"
ON job_offers
FOR ALL
USING (
  auth.uid() IN (
    SELECT user_id FROM admin_users WHERE role = 'admin'
  )
)
WITH CHECK (
  auth.uid() IN (
    SELECT user_id FROM admin_users WHERE role = 'admin'
  )
);
```

---

## 📁 Fichiers modifiés

```
ofaro-tech-website/
├── app/admin/offres/
│   ├── page.tsx                          [MODIFIÉ - Singleton Supabase]
│   ├── nouvelle/page.tsx                 [MODIFIÉ - Validation dates + Singleton]
│   └── [id]/modifier/page.tsx            [MODIFIÉ - Singleton Supabase]
├── database/migrations/
│   └── add_rls_job_offers.sql           [CRÉÉ - Politiques RLS]
└── CORRECTION-OFFRES-EMPLOI.md          [CRÉÉ - Ce fichier]
```

---

## 🎯 Résumé

| Problème | Statut | Solution |
|----------|--------|----------|
| Date limite avant publication | ✅ Corrigé | Validation + attribut `min` |
| Multiple GoTrueClient warnings | ✅ Corrigé | Client Supabase singleton |
| Erreur 401 sur job_offers | ✅ Corrigé | Politiques RLS ajoutées |

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez que la migration SQL a bien été exécutée
2. Vérifiez vos variables d'environnement `.env.local`
3. Consultez les logs dans la console du navigateur (F12)
4. Vérifiez les logs Supabase dans le Dashboard

**Tout devrait fonctionner maintenant !** 🎉
