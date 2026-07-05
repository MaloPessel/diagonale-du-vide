# diagonale-du-vide.fr

Le service (pas du tout) officiel de diagnostic de vacuité territoriale : dites-nous
où vous êtes, la République du vide vous dira si vous êtes dans la « diagonale du
vide », tampon officiel à l'appui.

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (style `base-nova`)
- Typographie : Archivo Variable (interface) + Courier Prime (valeurs du dossier)
- Aucune dépendance carto : la carte est un SVG projeté maison (`src/lib/geo.ts`)

## Développement

```bash
npm install
npm run dev       # serveur de développement
npm run build     # build de production dans dist/
npm run preview   # sert le build
```

## Fonctionnement

- Géolocalisation navigateur, recherche de commune (API Adresse data.gouv.fr),
  saisie de coordonnées, ou clic sur la carte.
- Le verdict est partageable : l'URL porte la position (`?pos=lat,lng`).
- Aucune donnée n'est envoyée nulle part ; le diagnostic est calculé dans le
  navigateur (point-dans-polygone sur un tracé indicatif de la diagonale).

Contexte produit et design : voir `PRODUCT.md` et `DESIGN.md`.
