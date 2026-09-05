# Test de Conversion des Statuts

## Fonction de conversion dans le code :
```javascript
const dbStatus = newStatus.toLowerCase().replace(/ /g, '_').replace(/é/g, 'e');
```

## Conversions pour Applications/Candidatures :

| Statut UI (dropdown)      | Après toLowerCase() | Après replace(/ /) | Après replace(/é/) | ✅ Autorisé dans DB |
|---------------------------|---------------------|--------------------|--------------------|---------------------|
| Nouvelle                  | nouvelle            | nouvelle           | nouvelle           | ✅ OUI              |
| En analyse                | en analyse          | en_analyse         | en_analyse         | ✅ OUI              |
| En cours de traitement    | en cours de traitement | en_cours_de_traitement | en_cours_de_traitement | ✅ OUI |
| Retenu                    | retenu              | retenu             | retenu             | ✅ OUI              |
| Rejeté                    | rejeté              | rejeté             | rejete             | ✅ OUI              |
| Sans suite                | sans suite          | sans_suite         | sans_suite         | ✅ OUI              |

## Si ça ne marche toujours pas :

### Ouvre la Console du Navigateur (F12) et vérifie :

1. **Erreur JavaScript** → Onglet Console
2. **Erreur Supabase** → Recherche "Erreur mise à jour statut candidature"
3. **Requête HTTP** → Onglet Network, filtre "supabase"

### Teste manuellement dans Supabase :

Exécute cette commande SQL pour tester :

```sql
-- Teste si une mise à jour fonctionne
UPDATE applications 
SET status = 'en_analyse', updated_at = NOW()
WHERE id = (SELECT id FROM applications LIMIT 1);
```

Si cette commande fonctionne, le problème est dans le code JavaScript.
Si elle échoue, le problème est dans la contrainte de la base de données.

---

## Actions à faire MAINTENANT :

### 1. Exécute le script de fix dans Supabase :

**Fichier : `05_fix_applications_only.sql`**

```sql
ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_status_check;

UPDATE applications SET status = 'nouvelle' WHERE status IN ('Nouvelle', 'nouveau', 'Nouveau', 'new');
UPDATE applications SET status = 'en_analyse' WHERE status IN ('En analyse', 'en analyse', 'en_analyse');
UPDATE applications SET status = 'en_cours_de_traitement' WHERE status IN ('En cours de traitement', 'en cours de traitement', 'entretien', 'Entretien', 'en_cours', 'En cours');
UPDATE applications SET status = 'retenu' WHERE status IN ('Retenu', 'acceptee', 'acceptée', 'Acceptée', 'preselectionee', 'présélectionnée');
UPDATE applications SET status = 'rejete' WHERE status IN ('Rejeté', 'rejete', 'rejeté', 'refusee', 'refusée', 'Refusée');
UPDATE applications SET status = 'sans_suite' WHERE status IN ('Sans suite', 'sans suite', 'sans_suite');

ALTER TABLE applications ADD CONSTRAINT applications_status_check 
CHECK (status IN ('nouvelle', 'en_analyse', 'en_cours_de_traitement', 'retenu', 'rejete', 'sans_suite', 'dossier_incomplet', 'en_attente', 'retire', 'archivee'));
```

### 2. Rafraîchis la page admin

### 3. Ouvre F12 → Console

### 4. Essaie de changer un statut

### 5. Copie-colle l'erreur EXACTE que tu vois dans la console
