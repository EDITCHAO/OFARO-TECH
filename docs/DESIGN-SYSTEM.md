# Design system OFARO TECH

Source de vérité : `tailwind.config.ts` (tokens) et `app/globals.css` (classes composants).

## Palette

| Token | Valeur | Rôle |
| --- | --- | --- |
| `primary-500` / `primary` | `#FF6B00` | Couleur de marque : boutons, liens, icônes d'accent, focus |
| `primary-50…950` | dégradé orange | Fonds légers (`primary-50`), textes foncés (`primary-700`), hovers |
| `primary-light` / `primary-dark` | `#FF8533` / `#CC5500` | Alias historiques (hover des boutons) |
| `accent-500` / `accent` | `#D4AF37` | Or du logo : détails premium, 3e couleur des dégradés décoratifs |
| `ink` | `#0B0B0C` | Texte principal, fonds sombres (header top-bar, footer) |
| `ink-secondary` / `ink-muted` | `#52525B` / `#71717A` | Texte secondaire |
| `surface` / `surface-muted` / `surface-subtle` | `#FFF` / `#F8F9FA` / `#F1F3F5` | Fonds de page et de sections alternées |
| `neutral-50…950` | zinc | Bordures, séparateurs, gris d'interface |
| `success` | emerald | Statut validé / terminé |
| `warning` | amber | Statut en attente / expire bientôt |
| `danger` | red | Erreur, suppression, expiré |
| `info` | sky | Statut « nouveau » / informatif (back-office uniquement) |

### Règles

1. **Une seule couleur de marque.** Le bleu / violet / indigo n'existent plus sur le site public : tout accent est `primary`.
2. **Les couleurs sémantiques ne servent qu'aux statuts.** `success`, `warning`, `danger`, `info` sont réservés aux badges, alertes et messages de formulaire — jamais à la décoration.
3. **Dégradés décoratifs** : rotation `primary → ink → accent` (cf. `SectorsSection`, `TechnologiesSection`).
4. **Sections** : alterner `bg-surface` et `bg-surface-muted` ; sections d'appel à l'action en `bg-gradient-primary` ou `section-dark`.
5. **Pas de couleur Tailwind brute** (`orange-*`, `blue-*`, `gray-*`…) dans le JSX.

## Classes composants (`app/globals.css`)

| Classe | Description |
| --- | --- |
| `btn`, `btn-primary`, `btn-secondary`, `btn-ghost`, `btn-dark`, `btn-sm` | Boutons |
| `heading-1…4`, `eyebrow`, `text-body` | Typographie |
| `card`, `card-hover` | Cartes |
| `input`, `label` | Formulaires |
| `badge`, `badge-primary|success|warning|danger|info|neutral` | Badges de statut |
| `section-padding`, `section-muted`, `section-dark`, `container-custom` | Mise en page |
| `text-gradient-primary`, `bg-gradient-primary`, `bg-gradient-dark` | Dégradés |

## Migration

Le codemod `scripts/codemod-colors.mjs` convertit les classes Tailwind brutes en tokens
(`orange-*` → `primary-*`, `gray-*` → `neutral-*`, `green-*` → `success-*`, etc.).
Il peut être relancé après un import de code externe : `node scripts/codemod-colors.mjs`.
