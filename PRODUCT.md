# Product

## Register

brand

## Users

Grand public francophone, sur mobile ou desktop, arrivant par un lien partagé ("t'es dans la diagonale du vide, regarde"). Visite courte (moins de 2 minutes), un seul geste attendu : se localiser ou taper sa commune, recevoir le verdict, rire, partager. Aucune expertise requise.

## Product Purpose

Site humoristique à usage unique : dire à l'utilisateur s'il se trouve dans la « diagonale du vide » (bande de faible densité de population traversant la France des Ardennes aux Landes). Le diagnostic est rendu avec le sérieux administratif d'un service public français — c'est le ressort comique. Succès = le verdict fait sourire et donne envie de tester d'autres communes ou de partager.

## Brand Personality

Officiel, pince-sans-rire, soigné. Le site EST une parodie du design de l'État français (DSFR / marque Marianne) : bloc-marque détourné (« République du vide »), devise parodique, tampon de verdict, langage administratif impeccable. L'humour vient du contraste entre la rigueur formelle du rendu et l'absurdité du service rendu. La parodie ne fonctionne que si l'exécution est irréprochable : plus le site a l'air vrai, plus c'est drôle.

## Anti-references

- Un site "fun" générique : couleurs criardes, emojis, Comic Sans, ton potache. L'humour est dans le sérieux, pas dans la déconne visuelle.
- Le template SaaS/landing IA : hero centré + grille de cards identiques + gradient text.
- Une copie littérale et plate du DSFR sans point de vue : la parodie doit être élevée, pas juste décalquée.

## Design Principles

1. **Le sérieux est la blague** — chaque détail visuel doit renforcer l'illusion d'un service officiel : typographie stricte, hiérarchie administrative, mentions légales absurdes mais crédibles.
2. **Un seul geste** — la page entière converge vers une action : obtenir son verdict. Tout le reste (carte, détails, mentions) soutient ce moment.
3. **Le tampon est le climax** — le verdict est le moment émotionnel ; il mérite la mise en scène la plus soignée (motion, poids visuel, formulation).
4. **Crédible jusqu'au pixel** — états de chargement, erreurs, focus, reduced-motion : un vrai service public serait accessible et robuste, la parodie aussi.
5. **La carte est une pièce à conviction** — elle doit avoir l'air d'un document cartographique officiel, pas d'un clipart.

## Accessibility & Inclusion

WCAG 2.1 AA. Contrastes ≥ 4.5:1 sur le texte courant. Navigation clavier complète (recherche, suggestions, carte). `prefers-reduced-motion` respecté (le tampon apparaît sans animation). Annonces `aria-live` pour le verdict et les statuts. La géolocalisation est optionnelle ; recherche par commune ou coordonnées en alternative. Aucune donnée envoyée à un serveur tiers hors API Adresse de l'État pour la recherche de communes.
