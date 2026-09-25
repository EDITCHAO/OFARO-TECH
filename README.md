# OFARO TECH — Site web & back-office

Site institutionnel et back-office d'OFARO TECH (services IT et transformation digitale, Lomé — Togo).

Stack : **Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Supabase** — API Express optionnelle dans `backend/`.

## Démarrage

```bash
npm install
cp .env.example .env.local   # renseigner les clés Supabase
npm run dev                  # http://localhost:3000
```

| Script               | Rôle                                   |
| -------------------- | -------------------------------------- |
| `npm run dev`        | Serveur de développement               |
| `npm run build`      | Build de production                    |
| `npm start`          | Serveur de production                  |
| `npm run lint`       | ESLint                                 |
| `npm run type-check` | Vérification TypeScript (`tsc`)        |

## Structure

```
app/            Pages (App Router) : site public, /admin, /api
components/     Composants React
  layout/       Header, Footer
  home/         Sections de la page d'accueil
  admin/        Layout et modules du back-office
  jobs/ offers/ Cartes d'offres d'emploi / stages
lib/            Constantes, clients Supabase, utilitaires
types/          Types TypeScript partagés
database/       Schéma SQL et migrations Supabase
backend/        API Node/Express (déploiement Render, optionnel)
public/         Assets statiques (logos, images)
docs/           Documentation (déploiement, Supabase, API…)
docs/archive/   Anciennes notes de travail conservées pour référence
scripts/        Scripts utilitaires (perf, migrations, codemods)
scripts/legacy/ Anciens scripts .bat / .ps1
```

## Design system

Toutes les couleurs passent par les tokens définis dans `tailwind.config.ts`
(voir [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md)) :

| Token                                        | Usage                                          |
| -------------------------------------------- | ---------------------------------------------- |
| `primary` (50→950, `#FF6B00`)                | Marque, actions, liens, accents                |
| `accent` (`#D4AF37`, or du logo)             | Touches premium, décorations                   |
| `ink` / `ink-secondary`                      | Textes                                         |
| `surface` / `surface-muted`                  | Fonds                                          |
| `neutral` (50→950)                           | Bordures, gris d'interface                     |
| `success` / `warning` / `danger` / `info`    | Statuts, alertes, badges                       |

Classes utilitaires prêtes à l'emploi dans `app/globals.css` : `btn-primary`, `btn-secondary`,
`btn-ghost`, `btn-dark`, `card`, `card-hover`, `input`, `label`, `badge-*`, `heading-1…4`,
`eyebrow`, `text-body`, `section-padding`, `section-muted`, `section-dark`.

> Ne pas utiliser de couleurs Tailwind brutes (`orange-500`, `blue-600`, `gray-700`…) dans le JSX ;
> utiliser les tokens ci-dessus.

## Documentation

- [Déploiement (GitHub + Vercel)](./docs/DEPLOYMENT_GUIDE.md)
- [Configuration Supabase](./docs/SUPABASE_SETUP.md)
- [Back-office](./docs/BACKOFFICE-README.md)
- [Routes API](./docs/API-ROUTES-DOCUMENTATION.md)
- [Fonctionnalités](./docs/FEATURES.md)

## Licence

© 2024-2026 OFARO TECH. Tous droits réservés.
