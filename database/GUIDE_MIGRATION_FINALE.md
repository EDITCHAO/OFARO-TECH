# 🚀 Guide de Migration Finale - Correction des Statuts

## ✅ Statut actuel
- ✅ **Devis** → Fonctionne parfaitement
- ❌ **Services** → À corriger
- ❌ **Messages** → À corriger  
- ❌ **Candidatures** → À corriger

---

## 📋 ÉTAPE UNIQUE - Exécuter la migration sécurisée

### 1. Ouvrir Supabase SQL Editor
- Aller sur https://supabase.com/dashboard
- SQL Editor → New Query

### 2. Copier-coller CE SCRIPT COMPLET

**Fichier : `03_fix_statuts_safe.sql`**

```sql
-- ÉTAPE 1: Supprimer TOUTES les contraintes CHECK
ALTER TABLE service_requests DROP CONSTRAINT IF EXISTS service_requests_status_check;
ALTER TABLE contact_messages DROP CONSTRAINT IF EXISTS contact_messages_status_check;
ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_status_check;

-- ÉTAPE 2: Mettre à jour les données sans contraintes

-- SERVICE_REQUESTS
UPDATE service_requests SET status = 'nouveau' WHERE status IN ('nouvelle', 'Nouveau', 'Nouvelle');
UPDATE service_requests SET status = 'en_analyse' WHERE status = 'En analyse';
UPDATE service_requests SET status = 'en_cours_de_traitement' WHERE status IN ('en_cours', 'En cours', 'En cours de traitement');
UPDATE service_requests SET status = 'traite' WHERE status IN ('terminee', 'Traité', 'Traite');
UPDATE service_requests SET status = 'rejete' WHERE status IN ('rejetee', 'Rejeté', 'Rejete', 'refusee');
UPDATE service_requests SET status = 'sans_suite' WHERE status = 'Sans suite';

-- CONTACT_MESSAGES
UPDATE contact_messages SET status = 'nouveau' WHERE status IN ('Nouveau', 'Nouvelle', 'nouvelle');
UPDATE contact_messages SET status = 'en_analyse' WHERE status = 'En analyse';
UPDATE contact_messages SET status = 'en_cours_de_traitement' WHERE status IN ('en_cours', 'En cours', 'En cours de traitement');
UPDATE contact_messages SET status = 'traite' WHERE status IN ('Traité', 'Traite');
UPDATE contact_messages SET status = 'sans_suite' WHERE status = 'Sans suite';

-- APPLICATIONS
UPDATE applications SET status = 'nouvelle' WHERE status IN ('Nouvelle', 'nouveau');
UPDATE applications SET status = 'en_analyse' WHERE status IN ('En analyse', 'en_analyse');
UPDATE applications SET status = 'en_cours_de_traitement' WHERE status IN ('entretien', 'Entretien', 'en_cours', 'En cours de traitement');
UPDATE applications SET status = 'retenu' WHERE status IN ('acceptee', 'Retenu', 'preselectionee', 'acceptée');
UPDATE applications SET status = 'rejete' WHERE status IN ('refusee', 'Rejeté', 'Rejete', 'rejetee', 'refusée');
UPDATE applications SET status = 'sans_suite' WHERE status = 'Sans suite';
UPDATE applications SET status = 'retire' WHERE status IN ('retiree', 'Retiré', 'retirée');

-- ÉTAPE 3: Recréer les contraintes avec les nouveaux statuts

ALTER TABLE service_requests ADD CONSTRAINT service_requests_status_check 
CHECK (status IN ('nouveau', 'en_analyse', 'en_cours_de_traitement', 'traite', 'sans_suite', 'en_attente', 'rejete', 'archivee'));

ALTER TABLE contact_messages ADD CONSTRAINT contact_messages_status_check 
CHECK (status IN ('nouveau', 'en_analyse', 'en_cours_de_traitement', 'traite', 'sans_suite'));

ALTER TABLE applications ADD CONSTRAINT applications_status_check 
CHECK (status IN ('nouvelle', 'en_analyse', 'en_cours_de_traitement', 'retenu', 'rejete', 'sans_suite', 'dossier_incomplet', 'en_attente', 'retire', 'archivee'));
```

### 3. Exécuter (Run / Ctrl+Enter)

### 4. Vérifier le résultat
✅ Si tu vois "Success" → Parfait !

---

## 🧪 TESTS À FAIRE

Après la migration, teste sur http://localhost:3000/admin :

### 1. Messages de contact
- [ ] Changer un message vers "En analyse" → ✅ Fonctionne
- [ ] Changer vers "En cours de traitement" → ✅ Fonctionne
- [ ] Rafraîchir la page → ✅ Le statut persiste

### 2. Demandes de service
- [ ] Changer un service vers "En analyse" → ✅ Fonctionne
- [ ] Changer vers "En cours de traitement" → ✅ Fonctionne
- [ ] Rafraîchir la page → ✅ Le statut persiste

### 3. Candidatures
- [ ] Changer une candidature vers "En analyse" → ✅ Fonctionne
- [ ] Changer vers "En cours de traitement" → ✅ Fonctionne
- [ ] Changer vers "Retenu" ou "Rejeté" → ✅ Fonctionne
- [ ] Rafraîchir la page → ✅ Le statut persiste

---

## 📊 Nouveaux statuts disponibles

### Pour Devis, Services et Messages :
1. **Nouveau**
2. **En analyse**
3. **En cours de traitement**
4. **Traité**
5. **Sans suite**

### Pour Candidatures (+ 2 spécifiques) :
1. **Nouvelle**
2. **En analyse**
3. **En cours de traitement**
4. **Retenu** ⭐
5. **Rejeté** ⭐
6. **Sans suite**

---

## ❓ En cas de problème

Si l'erreur persiste après la migration :

1. **Vérifier les statuts actuels** avec le fichier `01_diagnostic_statuts.sql`
2. **Copier-coller les résultats** et on adaptera la migration
3. **Rafraîchir la page admin** après chaque changement

---

## 🎉 Une fois terminé

Tous les changements de statut seront :
- ✅ Sauvegardés dans Supabase
- ✅ Persistés après rafraîchissement
- ✅ Uniformes sur toutes les sections
- ✅ Filtrables correctement
