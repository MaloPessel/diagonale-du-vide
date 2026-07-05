export type LatLng = [lat: number, lng: number]

/* ---------- Données géographiques ---------- */

// Contour simplifié de la France métropolitaine [lat, lng]
export const FRANCE: LatLng[] = [
  [51.0, 2.5], [50.2, 1.55], [49.7, 0.2], [49.4, 0.1], [49.7, -1.3], [49.4, -1.8],
  [48.6, -1.5], [48.7, -3.5], [48.4, -4.75], [47.8, -4.3], [47.3, -2.5], [46.2, -1.3],
  [45.6, -1.1], [44.0, -1.3], [43.4, -1.8], [43.0, -0.5], [42.8, 0.5], [42.5, 2.0],
  [42.4, 3.1], [43.3, 3.5], [43.3, 4.8], [43.1, 5.9], [43.5, 7.0], [43.8, 7.5],
  [44.5, 6.9], [45.1, 6.7], [45.8, 6.8], [46.3, 6.2], [46.9, 6.9], [47.5, 7.5],
  [48.6, 7.8], [49.0, 8.2], [49.2, 6.7], [49.5, 5.8], [50.15, 4.9], [50.3, 3.7],
]

// Périmètre approximatif de la diagonale du vide [lat, lng]
export const DIAGONALE: LatLng[] = [
  [50.05, 4.85], [49.3, 5.85], [48.3, 5.9], [47.6, 5.5], [47.2, 4.7], [46.4, 4.3],
  [46.0, 3.4], [45.5, 3.6], [44.4, 3.9], [43.9, 3.2], [43.1, 2.0], [42.9, 0.5],
  [43.0, -0.4], [43.5, -0.9], [44.3, -0.9], [44.6, 0.0], [45.4, 0.4], [45.9, 0.9],
  [46.8, 1.4], [47.5, 2.3], [48.2, 3.5], [48.9, 4.3], [49.6, 4.4],
]

// Source unique des coordonnées de villes (repères carte + mentions spéciales)
export const VILLES = {
  paris: [48.8566, 2.3522],
  lille: [50.6292, 3.0573],
  marseille: [43.2965, 5.3698],
  lyon: [45.764, 4.8357],
  bordeaux: [44.8378, -0.5792],
  toulouse: [43.6047, 1.4442],
  strasbourg: [48.5734, 7.7521],
  nantes: [47.2184, -1.5536],
  rennes: [48.1173, -1.6778],
  nice: [43.7102, 7.262],
  gueret: [46.1706, 1.8722],
  limoges: [45.8336, 1.2611],
  clermont: [45.7772, 3.087],
  lourdes: [43.0983, -0.0455],
} satisfies Record<string, LatLng>

type MentionSpeciale = { pos: LatLng; rayon: number; texte: string }

// Mentions spéciales du service (easter eggs), rayon en km
export const MENTIONS_SPECIALES: MentionSpeciale[] = [
  { pos: VILLES.paris, rayon: 25, texte: "Vous êtes à Paris, soit l'exact opposé du vide. Statistiquement, quelqu'un est collé à vous en ce moment même." },
  { pos: VILLES.lille, rayon: 15, texte: "Vous êtes à Lille. Aucun vide à signaler, mais il pleut probablement, ce qui procure une certaine forme de solitude." },
  { pos: VILLES.marseille, rayon: 18, texte: "Vous êtes à Marseille. Le vide ? Jamais entendu parler. Ici, c'est le centre du monde, et le service ne souhaite pas polémiquer." },
  { pos: VILLES.lyon, rayon: 15, texte: "Vous êtes à Lyon. Pas dans le vide, mais probablement dans un bouchon — au choix : circulation ou restaurant." },
  { pos: VILLES.bordeaux, rayon: 15, texte: "Vous êtes à Bordeaux. Vous n'êtes pas dans le vide, et le service vous rappelle qu'un verre ne devrait jamais l'être non plus." },
  { pos: VILLES.toulouse, rayon: 15, texte: "Vous êtes à Toulouse. Pas dans le vide… quoique : c'est la seule ville de France dont le métier est d'envoyer des choses dedans." },
  { pos: VILLES.strasbourg, rayon: 12, texte: "Vous êtes à Strasbourg, très loin du vide français. En revanche l'Allemagne est à deux pas, restez naturel." },
  { pos: VILLES.nantes, rayon: 15, texte: "Vous êtes à Nantes. Ni dans le vide, ni en Bretagne. Le service vous laisse gérer ce deuxième point." },
  { pos: VILLES.rennes, rayon: 12, texte: "Vous êtes à Rennes. La Bretagne a refusé d'être incluse dans la diagonale, comme dans à peu près tout le reste." },
  { pos: VILLES.nice, rayon: 15, texte: "Vous êtes à Nice. Le seul vide constaté ici est celui de votre compte en banque après la terrasse." },
  { pos: [42.15, 9.05], rayon: 130, texte: "Vous êtes en Corse. La diagonale ne traverse pas la mer, mais l'île dispose de son propre concept de tranquillité, très bien défendu." },
  { pos: VILLES.gueret, rayon: 30, texte: "Vous êtes dans la Creuse : le cœur battant (doucement) de la diagonale. Respect." },
  { pos: VILLES.limoges, rayon: 15, texte: "Vous êtes à Limoges : dans le vide, certes, mais avec de la porcelaine. C'est le vide premium." },
  { pos: VILLES.clermont, rayon: 12, texte: "Vous êtes à Clermont-Ferrand : dans le vide sur le papier, mais Michelin veille sur vous." },
  { pos: VILLES.lourdes, rayon: 10, texte: "Vous êtes à Lourdes. Ici les miracles existent : c'est le seul point du vide où l'on fait la queue." },
  { pos: [44.4497, 1.4402], rayon: 25, texte: "Vous êtes dans le Lot. C'est officiellement le vide, mais le plus joli, ne le répétez pas trop." },
]

/* ---------- Projection équirectangulaire vers le SVG ---------- */

export const VB = { w: 500, h: 520, pad: 18 }

const lats = FRANCE.map((p) => p[0])
const lngs = FRANCE.map((p) => p[1])
const latMin = Math.min(...lats)
const latMax = Math.max(...lats)
const lngMin = Math.min(...lngs)
const lngMax = Math.max(...lngs)
const cosMid = Math.cos(((latMin + latMax) / 2) * Math.PI / 180)
const scale = Math.min(
  (VB.w - 2 * VB.pad) / ((lngMax - lngMin) * cosMid),
  (VB.h - 2 * VB.pad) / (latMax - latMin)
)

export function proj(lat: number, lng: number) {
  return {
    x: VB.pad + (lng - lngMin) * cosMid * scale,
    y: VB.pad + (latMax - lat) * scale,
  }
}

export function inverse(x: number, y: number) {
  return {
    lng: (x - VB.pad) / (cosMid * scale) + lngMin,
    lat: latMax - (y - VB.pad) / scale,
  }
}

export function toPath(pts: LatLng[]) {
  return (
    pts
      .map((p, i) => {
        const q = proj(p[0], p[1])
        return (i ? "L" : "M") + q.x.toFixed(1) + " " + q.y.toFixed(1)
      })
      .join(" ") + " Z"
  )
}

// Graticule : degrés entiers couverts par la carte, pré-projetés
export const GRATICULE = {
  meridiens: plage(lngMin, lngMax).map((lng) => ({ deg: lng, x: proj(latMax, lng).x })),
  paralleles: plage(latMin, latMax).map((lat) => ({ deg: lat, y: proj(lat, lngMin).y })),
}

function plage(min: number, max: number) {
  const degres: number[] = []
  for (let d = Math.ceil(min); d <= Math.floor(max); d++) degres.push(d)
  return degres
}

/* ---------- Géométrie ---------- */

const KM_PAR_DEGRE = 111.32 // km par degré de latitude

export function dansPolygone(lat: number, lng: number, poly: LatLng[]) {
  let dedans = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [yi, xi] = poly[i]
    const [yj, xj] = poly[j]
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      dedans = !dedans
    }
  }
  return dedans
}

// Distance (km) d'un point au bord du polygone, approximation équirectangulaire
export function distanceAuBord(lat: number, lng: number, poly: LatLng[]) {
  const cx = Math.cos((lat * Math.PI) / 180)
  function distSeg(p: LatLng, a: LatLng, b: LatLng) {
    const ax = a[1] * cx, ay = a[0], bx = b[1] * cx, by = b[0]
    const px = p[1] * cx, py = p[0]
    const dx = bx - ax, dy = by - ay
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    const ex = ax + t * dx - px
    const ey = ay + t * dy - py
    return Math.sqrt(ex * ex + ey * ey) * KM_PAR_DEGRE
  }
  let min = Infinity
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    min = Math.min(min, distSeg([lat, lng], poly[i], poly[j]))
  }
  return min
}

export function distKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const cx = Math.cos((((lat1 + lat2) / 2) * Math.PI) / 180)
  const dx = (lng2 - lng1) * cx
  const dy = lat2 - lat1
  return Math.sqrt(dx * dx + dy * dy) * KM_PAR_DEGRE
}

export function trouverMentionSpeciale(lat: number, lng: number) {
  let meilleure: string | null = null
  let meilleureDist = Infinity
  for (const { pos, rayon, texte } of MENTIONS_SPECIALES) {
    const d = distKm(lat, lng, pos[0], pos[1])
    if (d <= rayon && d < meilleureDist) {
      meilleure = texte
      meilleureDist = d
    }
  }
  return meilleure
}

/* ---------- Coordonnées saisies ou partagées ---------- */

// Accepte "45.83, 1.26", "45,83 1,26", "45.83;1.26"…
export function lireCoordonnees(texte: string) {
  const m = texte.trim().match(/^(-?\d{1,2}([.,]\d+)?)[\s;,]+(-?\d{1,3}([.,]\d+)?)$/)
  if (!m) return null
  const lat = parseFloat(m[1].replace(",", "."))
  const lng = parseFloat(m[3].replace(",", "."))
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null
  return { lat, lng }
}

// Valeur du paramètre d'URL ?pos= (format canonique du lien de verdict)
export function positionEnParam(lat: number, lng: number) {
  return `${lat.toFixed(4)},${lng.toFixed(4)}`
}

/* ---------- Verdict ---------- */

export type StatutVerdict = "dans-le-vide" | "hors-du-vide" | "hors-france"

export type Verdict = {
  lat: number
  lng: number
  origine: string
  statut: StatutVerdict
  distanceBord: number
  mentionSpeciale: string | null
  numeroDossier: string
  date: Date
}

export function rendreVerdict(lat: number, lng: number, origine: string): Verdict {
  const enFrance = dansPolygone(lat, lng, FRANCE)
  const statut: StatutVerdict = !enFrance
    ? "hors-france"
    : dansPolygone(lat, lng, DIAGONALE)
      ? "dans-le-vide"
      : "hors-du-vide"
  return {
    lat,
    lng,
    origine,
    statut,
    distanceBord: distanceAuBord(lat, lng, DIAGONALE),
    mentionSpeciale: trouverMentionSpeciale(lat, lng),
    numeroDossier: numeroDossier(lat, lng),
    date: new Date(),
  }
}

// Lien partageable du verdict, indépendant de la barre d'adresse
export function lienDuVerdict(v: Verdict) {
  const url = new URL(window.location.href)
  url.searchParams.set("pos", positionEnParam(v.lat, v.lng))
  return url.toString()
}

// Numéro de dossier absurde mais déterministe pour une même position
function numeroDossier(lat: number, lng: number) {
  const h = Math.abs(Math.round(lat * 7919 + lng * 104729)) % 100000
  const annee = new Date().getFullYear()
  return `${annee}-VIDE-${String(h).padStart(5, "0")}`
}

/* ---------- Formats ---------- */

export function formatCoords(lat: number, lng: number) {
  return `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`
}

export function formatDate(d: Date) {
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })
}
