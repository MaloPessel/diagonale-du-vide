import * as React from "react"

import {
  DIAGONALE,
  FRANCE,
  GRATICULE,
  VB,
  VILLES,
  formatCoords,
  inverse,
  proj,
  toPath,
  type LatLng,
} from "@/lib/geo"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Villes affichées en repère, avec leur ancrage d'étiquette (donnée d'affichage)
const VILLES_REPERE: { nom: string; pos: LatLng; ancre?: "end" }[] = [
  { nom: "Paris", pos: VILLES.paris },
  { nom: "Lyon", pos: VILLES.lyon },
  { nom: "Marseille", pos: VILLES.marseille },
  { nom: "Bordeaux", pos: VILLES.bordeaux, ancre: "end" },
  { nom: "Lille", pos: VILLES.lille },
  { nom: "Nantes", pos: VILLES.nantes, ancre: "end" },
  { nom: "Strasbourg", pos: VILLES.strasbourg, ancre: "end" },
  { nom: "Guéret", pos: VILLES.gueret },
]

function clampAuCadre(p: { x: number; y: number }) {
  return {
    x: Math.max(4, Math.min(VB.w - 4, p.x)),
    y: Math.max(4, Math.min(VB.h - 4, p.y)),
  }
}

function coordsDepuisEvenement(e: React.MouseEvent<SVGSVGElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - rect.left) * (VB.w / rect.width)
  const y = (e.clientY - rect.top) * (VB.h / rect.height)
  return inverse(x, y)
}

/*
 * Couches invariantes de la carte, construites une seule fois : React
 * court-circuite la réconciliation d'un élément identique par référence,
 * le survol ne re-parcourt donc jamais ces ~90 nœuds SVG.
 */
const COUCHES_STATIQUES = (
  <>
    <defs>
      <pattern
        id="hachures"
        width="7"
        height="7"
        patternTransform="rotate(45)"
        patternUnits="userSpaceOnUse"
      >
        <rect width="7" height="7" fill="var(--primary)" opacity="0.06" />
        <line x1="0" y1="0" x2="0" y2="7" stroke="var(--primary)" strokeWidth="1.3" opacity="0.5" />
      </pattern>
    </defs>

    {/* Mer */}
    <rect x="0" y="0" width={VB.w} height={VB.h} className="fill-muted/60" />

    {/* Graticule : la carte est un document de mesure */}
    <g aria-hidden="true">
      {GRATICULE.meridiens.map(({ deg, x }) => (
        <line key={`m${deg}`} x1={x} y1={0} x2={x} y2={VB.h} className="stroke-foreground/10" strokeWidth="0.6" />
      ))}
      {GRATICULE.paralleles.map(({ deg, y }) => (
        <line key={`p${deg}`} x1={0} y1={y} x2={VB.w} y2={y} className="stroke-foreground/10" strokeWidth="0.6" />
      ))}
      {GRATICULE.paralleles
        .filter(({ deg }) => deg % 2 === 0)
        .map(({ deg, y }) => (
          <text key={`pl${deg}`} x={4} y={y - 2.5} className="fill-muted-foreground font-mono" fontSize="8.5">
            {deg}°N
          </text>
        ))}
      {GRATICULE.meridiens
        .filter(({ deg }) => deg % 2 === 0)
        .map(({ deg, x }) => (
          <text key={`ml${deg}`} x={x + 2.5} y={VB.h - 4} className="fill-muted-foreground font-mono" fontSize="8.5">
            {deg}°
          </text>
        ))}
    </g>

    {/* Territoire */}
    <path d={toPath(FRANCE)} className="fill-card stroke-foreground" strokeWidth="1.6" strokeLinejoin="round" />

    {/* La diagonale */}
    <path d={toPath(DIAGONALE)} fill="url(#hachures)" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 3" />

    {/* Villes de repère */}
    <g aria-hidden="true">
      {VILLES_REPERE.map(({ nom, pos, ancre }) => {
        const q = proj(pos[0], pos[1])
        return (
          <g key={nom}>
            <circle cx={q.x} cy={q.y} r="1.9" className="fill-foreground/60" />
            <text
              x={ancre === "end" ? q.x - 4.5 : q.x + 4.5}
              y={q.y + 3}
              textAnchor={ancre === "end" ? "end" : "start"}
              className="fill-muted-foreground font-mono"
              fontSize="10.5"
            >
              {nom}
            </text>
          </g>
        )
      })}
    </g>
  </>
)

type FranceMapProps = {
  marker: { lat: number; lng: number } | null
  onPick: (lat: number, lng: number) => void
}

export function FranceMap({ marker, onPick }: FranceMapProps) {
  // Le relevé de survol est écrit en direct dans le DOM : pas de re-rendu par mousemove
  const releveRef = React.useRef<HTMLDivElement>(null)

  function surSurvol(e: React.MouseEvent<SVGSVGElement>) {
    const el = releveRef.current
    if (!el) return
    const g = coordsDepuisEvenement(e)
    el.textContent = formatCoords(g.lat, g.lng)
    el.style.opacity = "1"
  }

  function surSortie() {
    if (releveRef.current) releveRef.current.style.opacity = "0"
  }

  const markerPos = marker && clampAuCadre(proj(marker.lat, marker.lng))

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Carte de situation</CardTitle>
        <CardDescription>
          Pièce n°1 du dossier — cliquez sur la carte pour tester un point.
        </CardDescription>
        <CardAction>
          <Badge variant="outline" className="font-mono">
            Échelle : vague
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            role="img"
            aria-label="Carte de France avec la diagonale du vide hachurée. Cliquer sur la carte teste le point choisi."
            className="block h-auto w-full max-w-full min-w-0 cursor-crosshair select-none"
            onClick={(e) => {
              const g = coordsDepuisEvenement(e)
              onPick(g.lat, g.lng)
            }}
            onMouseMove={surSurvol}
            onMouseLeave={surSortie}
          >
            {COUCHES_STATIQUES}

            {/* Position analysée */}
            {markerPos && (
              <g key={`${markerPos.x},${markerPos.y}`}>
                <circle
                  cx={markerPos.x}
                  cy={markerPos.y}
                  r="9"
                  className="marker-halo fill-none stroke-destructive"
                  strokeWidth="1.5"
                />
                <circle
                  cx={markerPos.x}
                  cy={markerPos.y}
                  r="5"
                  className="fill-destructive stroke-card"
                  strokeWidth="1.6"
                />
              </g>
            )}
          </svg>

          {/* Relevé de coordonnées au survol */}
          <div
            ref={releveRef}
            aria-hidden="true"
            style={{ opacity: 0 }}
            className="pointer-events-none absolute right-1.5 bottom-1.5 border bg-background/95 px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground transition-opacity"
          />
        </div>
      </CardContent>
      <CardFooter>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <li className="flex items-center gap-1.5">
            {/* Échantillon auto-suffisant : ne dépend pas des defs de la carte */}
            <svg width="18" height="12" aria-hidden="true" className="shrink-0">
              <defs>
                <pattern
                  id="hachures-legende"
                  width="7"
                  height="7"
                  patternTransform="rotate(45)"
                  patternUnits="userSpaceOnUse"
                >
                  <rect width="7" height="7" fill="var(--primary)" opacity="0.06" />
                  <line x1="0" y1="0" x2="0" y2="7" stroke="var(--primary)" strokeWidth="1.3" opacity="0.5" />
                </pattern>
              </defs>
              <rect width="18" height="12" fill="url(#hachures-legende)" stroke="var(--primary)" strokeWidth="1" />
            </svg>
            Diagonale du vide (tracé indicatif)
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-2.5 shrink-0 rounded-full bg-destructive" aria-hidden="true" />
            Position analysée
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-1.5 shrink-0 rounded-full bg-foreground/60" aria-hidden="true" />
            Ville de repère
          </li>
        </ul>
      </CardFooter>
    </Card>
  )
}
