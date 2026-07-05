import * as React from "react"
import { CheckIcon, InfoIcon, Link2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  formatCoords,
  formatDate,
  lienDuVerdict,
  type StatutVerdict,
  type Verdict,
} from "@/lib/geo"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Tout le rendu dépendant du statut, en un seul endroit
const RENDU: Record<
  StatutVerdict,
  { tampon: string; encre: string; diagnostic: (distanceKm: number) => string }
> = {
  "dans-le-vide": {
    tampon: "Vous êtes dans le vide",
    encre: "text-success",
    diagnostic: (d) =>
      `Vous êtes en plein dans la diagonale du vide, à environ ${d} km du bord le plus proche. Profitez du calme.`,
  },
  "hors-du-vide": {
    tampon: "Vous n'êtes pas dans le vide",
    encre: "text-destructive",
    diagnostic: (d) =>
      `Vous êtes en dehors de la diagonale, à environ ${d} km du vide le plus proche. Courage.`,
  },
  "hors-france": {
    tampon: "Hors France métropolitaine",
    encre: "text-muted-foreground",
    diagnostic: () =>
      "Le vide français ne s'applique pas ici. Vous avez peut-être un vide local.",
  },
}

function Tampon({ verdict }: { verdict: Verdict }) {
  const { tampon, encre } = RENDU[verdict.statut]
  return (
    <div className={cn("stamp inline-block border-2 border-current p-[3px]", encre)}>
      <div className="flex flex-col items-center gap-1 border border-current px-5 py-3 text-center">
        <span className="text-[10px] font-bold tracking-[0.16em] uppercase">
          République du vide — Direction du diagnostic
        </span>
        <span className="text-[clamp(1.2rem,3.5vw,1.7rem)] leading-[1.1] font-extrabold tracking-[0.02em] uppercase">
          {tampon}
        </span>
        <span className="font-mono text-[11px] uppercase">
          le {formatDate(verdict.date)} · sans appel
        </span>
      </div>
    </div>
  )
}

function LigneDossier({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-4">
      <dt className="text-sm font-semibold">{label}</dt>
      <dd className="text-sm">{children}</dd>
    </div>
  )
}

function BoutonPartage({ verdict }: { verdict: Verdict }) {
  const [copie, setCopie] = React.useState(false)
  const minuterieRef = React.useRef<number>(undefined)

  React.useEffect(() => () => window.clearTimeout(minuterieRef.current), [])

  async function copier() {
    try {
      await navigator.clipboard.writeText(lienDuVerdict(verdict))
      setCopie(true)
      window.clearTimeout(minuterieRef.current)
      minuterieRef.current = window.setTimeout(() => setCopie(false), 2500)
    } catch {
      // Presse-papiers indisponible : l'URL reste visible dans la barre d'adresse
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={() => void copier()}>
      {copie ? (
        <CheckIcon data-icon="inline-start" aria-hidden="true" />
      ) : (
        <Link2Icon data-icon="inline-start" aria-hidden="true" />
      )}
      {copie ? "Lien copié" : "Copier le lien du verdict"}
    </Button>
  )
}

export function VerdictPanel({ verdict }: { verdict: Verdict }) {
  return (
    <div className="flex flex-col gap-5">
      <Tampon verdict={verdict} />

      <Card className="rise-in">
        <CardHeader className="border-b">
          <CardTitle>Relevé de situation territoriale</CardTitle>
          <CardDescription>
            Document délivré immédiatement, gratuitement, et sans aucune valeur.
          </CardDescription>
          <CardAction>
            <Badge variant="secondary" className="font-mono">
              N° {verdict.numeroDossier}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <dl className="flex flex-col gap-3">
            <LigneDossier label="Position analysée">
              <span className="font-mono">{formatCoords(verdict.lat, verdict.lng)}</span>
              <span className="block text-xs text-muted-foreground">
                Source&nbsp;: {verdict.origine}
              </span>
            </LigneDossier>
            <Separator />
            <LigneDossier label="Diagnostic">
              <span className="block max-w-[65ch]">
                {RENDU[verdict.statut].diagnostic(Math.round(verdict.distanceBord))}
              </span>
            </LigneDossier>
            {verdict.mentionSpeciale && (
              <>
                <Separator />
                <div>
                  <dt className="sr-only">Mention spéciale du service</dt>
                  <dd>
                    <Alert>
                      <InfoIcon aria-hidden="true" />
                      <AlertTitle>Mention spéciale du service</AlertTitle>
                      <AlertDescription>{verdict.mentionSpeciale}</AlertDescription>
                    </Alert>
                  </dd>
                </div>
              </>
            )}
          </dl>
        </CardContent>
        <CardFooter className="justify-between gap-3">
          <BoutonPartage verdict={verdict} />
          <p className="text-xs text-muted-foreground">
            Notifier votre entourage est à votre charge.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
