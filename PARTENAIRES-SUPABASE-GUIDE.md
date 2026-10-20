# 🤝 Guide Complet - Partenaires avec Supabase

## ✅ Ce qui a été fait

### 1. **Correction bug sidebar**
Le bouton "Partenaires" ne disparaît plus - ajouté dans les permissions `editeur`

### 2. **Migration vers Supabase**
- ✅ Routes API créées (`/api/partners`)
- ✅ Upload de logos vers Supabase Storage
- ✅ Table SQL `partners` prête
- ✅ Composant PartnersSection charge depuis l'API

## 📋 Étapes de configuration Supabase

### Étape 1 : Créer le bucket `partners-logos`

1. Allez sur https://supabase.com/dashboard/project/tidencxeznpjvnfebwmw
2. **Storage** > **New bucket**
3. Nom : `partners-logos`
4. Public : ✅ **OUI**
5. Create bucket

### Étape 2 : Créer la table `partners`

1. **SQL Editor** > **New query**
2. Copiez tout le contenu de `database/create-partners-table.sql`
3. **Run** (ou Ctrl + Enter)

### Étape 3 : Vérifier

```sql
-- Vérifier la table
SELECT * FROM public.partners;

-- Devrait afficher 5 partenaires (Microsoft, AWS, Google Cloud, Oracle, Cisco)
```

## 🚀 Comment ça marche

### Frontend (Site public)
```
Site → /api/partners → Supabase → Affiche partenaires publiés
```

### Back-office (Admin)
```
Admin upload logo → /api/partners/upload → Supabase Storage → URL
Admin crée partenaire → /api/partners → Supabase DB → Enregistré
```

## 📁 Structure des fichiers

```
app/
├── api/
│   └── partners/
│       ├── route.ts           # GET (liste) + POST (créer)
│       ├── [id]/route.ts      # PUT (modifier) + DELETE (supprimer)
│       └── upload/route.ts    # POST (upload logo)
│
components/
└── home/
    └── PartnersSection.tsx    # Affichage site (charge depuis API)

database/
└── create-partners-table.sql  # Script SQL pour créer table
```

## 🔧 Prochaines étapes (Back-office)

Il faut maintenant **mettre à jour le back-office** (`app/admin/page.tsx`) pour :

1. **Charger les partenaires** depuis `/api/partners` au lieu de LocalStorage
2. **Uploader le logo** via `/api/partners/upload` 
3. **Créer/Modifier/Supprimer** via les routes API

## 💡 Avantages Supabase vs LocalStorage

| Critère | LocalStorage | Supabase |
|---------|-------------|----------|
| **Capacité** | ~5-10 MB total | Illimité |
| **Partage** | Local au navigateur | Tous les admins |
| **Persistance** | Peut être effacé | Permanent |
| **Images** | Base64 (lourd) | URLs (léger) |
| **Performance** | Bon | Excellent |
| **Production** | ❌ Non recommandé | ✅ Recommandé |

## 🎯 Status actuel

- ✅ API routes créées
- ✅ Site charge depuis Supabase
- ⏳ Back-office à migrer (actuellement LocalStorage)
- ⏳ Table SQL à exécuter dans Supabase
- ⏳ Bucket à créer dans Supabase

## 🆘 En cas de problème

### "Could not find table 'partners'"
→ Exécutez le script SQL `database/create-partners-table.sql`

### "Storage bucket 'partners-logos' not found"
→ Créez le bucket dans Supabase Storage

### "Unauthorized to upload"
→ Vérifiez les policies du bucket (doit être public en lecture)

---

📧 Besoin d'aide ? Demande-moi !
