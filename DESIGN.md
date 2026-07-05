# Design

Système visuel de diagonale-du-vide.fr — une parodie soignée du design de l'État
français (DSFR). La règle d'or : plus ça a l'air vrai, plus c'est drôle. Chaque
choix visuel imite la grammaire d'un service public, jamais celle d'une landing
page.

## Registre

Brand — le design EST le produit. Une seule page, un seul geste (obtenir son
verdict), un climax (le tampon).

## Couleurs

Stratégie « committed » : le bleu République porte l'identité, le blanc papier
domine, le rouge Marianne et le vert « avis favorable » sont réservés au sens.
Tokens OKLCH dans `src/index.css`, consommés via les rôles shadcn
(`bg-primary`, `text-muted-foreground`, …). Jamais de couleur brute dans les
composants.

| Rôle | Light | Usage |
|---|---|---|
| `--primary` | `oklch(0.31 0.19 264.6)` | Bleu République (#000091) : actions, hachures, bloc-marque |
| `--foreground` | `oklch(0.22 0.015 264)` | Encre, teintée bleu (jamais chaude) |
| `--destructive` | `oklch(0.55 0.22 27)` | Rouge Marianne : tampon défavorable, erreurs, marqueur carte |
| `--success` | `oklch(0.5 0.115 152)` | Vert : tampon « vous êtes dans le vide » (être dans le vide est favorable) |
| `--muted` / `--secondary` | `oklch(0.96~ 0.01 274)` | Fonds administratifs bleutés (façon #F5F5FE du DSFR) |
| `--radius` | `0rem` | Angles droits partout : c'est le DSFR, pas une app SaaS |

Un thème sombre complet existe (`.dark`, résolu par `ThemeProvider`, thème
système par défaut, touche `d` pour basculer).

## Typographie

- **Archivo Variable** (`--font-sans`) : grotesque strict, cousin libre de la
  Marianne officielle. Poids 400–800 ; l'extrabold 800 sert le H1 et le
  bloc-marque en capitales.
- **Courier Prime** (`--font-mono`) : la machine à écrire du dossier
  administratif. Réservé aux *valeurs* de document : coordonnées, n° de
  dossier, badges de guichet, étiquettes de la carte.
- H1 : `clamp(2.125rem → 3.375rem)`, tracking −0.025em, `text-wrap: balance`.
- Corps : 65–75ch max, contrastes ≥ 4.5:1 (muted-foreground à L 0.44 minimum).

## Composants clés

- **Bloc-marque** (`site-header.tsx`) : mini drapeau tricolore, « RÉPUBLIQUE DU
  VIDE » empilé en capitales, devise italique. Répété en signature de footer.
- **Tampon** (`verdict-panel.tsx`, `.stamp`) : double bordure `border-current`,
  rotation −2.5°, texte en capitales + date + « sans appel ». Animation
  `stamp-slam` (frappe : scale 2.1 → 1, ease-out expo). Vert = dans le vide,
  rouge = dehors, gris = hors France.
- **Relevé de situation** : Card shadcn avec header bordé, badge mono
  « N° AAAA-VIDE-XXXXX », lignes dt/dd séparées par `Separator`, mention
  spéciale (easter egg) en `Alert`. Pied de carte : bouton « Copier le lien du
  verdict ».
- **Carte de situation** (`france-map.tsx`) : document cartographique — mer
  `muted`, graticule discret avec étiquettes de degrés en mono, France en
  `card` cerclée d'encre, diagonale hachurée bleue en pointillés, villes de
  repère en mono, relevé de coordonnées au survol. Clic = test d'un point.
- **Recherche** (`commune-search.tsx`) : Field + InputGroup shadcn, combobox
  accessible (flèches, Entrée, Échap, `aria-activedescendant`), suggestions en
  liste `popover` absolue.

## Motion

Trois animations, toutes au service du moment administratif, toutes annulées
sous `prefers-reduced-motion` :

1. `stamp-slam` — la frappe du tampon (0.34s, cubic-bezier(0.16,1,0.3,1)).
2. `marker-ping` — 3 pulsations du halo au placement du marqueur.
3. `rise-in` — le relevé qui sort du guichet (0.4s, léger délai après le tampon).

Pas de reveal-on-scroll, pas de stagger décoratif : un service public ne fait
pas de cinéma, il tamponne.

## Voix (UX copy)

Français administratif impeccable, chute pince-sans-rire en fin de phrase.
Exemples canoniques : « Document délivré immédiatement, gratuitement, et sans
aucune valeur. » ; « Notifier votre entourage est à votre charge. » ;
« Échelle : vague ». L'humour ne vient jamais d'emojis ni d'exclamations.

## Interdits

- Coins arrondis, ombres portées douces, glassmorphism : rien de « app ».
- Couleurs hors tokens ; chaleur (crème/beige) dans les neutres.
- Ton potache, emojis, points d'exclamation.
- Casser l'illusion : tout nouvel élément doit pouvoir passer pour une vraie
  rubrique de service public.
