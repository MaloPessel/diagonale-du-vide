import * as React from "react"
import { CircleAlertIcon, LocateFixedIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { lireCoordonnees, positionEnParam, rendreVerdict, type Verdict } from "@/lib/geo"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CommuneSearch } from "@/components/commune-search"
import { VerdictPanel } from "@/components/verdict-panel"
import { FranceMap } from "@/components/france-map"

type Statut = { message: string; erreur: boolean }

function verdictDepuisUrl(): Verdict | null {
  const pos = new URLSearchParams(window.location.search).get("pos")
  const coords = pos && lireCoordonnees(pos)
  return coords ? rendreVerdict(coords.lat, coords.lng, "lien partagé") : null
}

export default function App() {
  // Un verdict partagé par lien (?pos=lat,lng) est prononcé dès le chargement
  const [verdict, setVerdict] = React.useState<Verdict | null>(verdictDepuisUrl)
  const [statut, setStatut] = React.useState<Statut>({ message: "", erreur: false })
  const [localisationEnCours, setLocalisationEnCours] = React.useState(false)
  const verdictRef = React.useRef<HTMLDivElement>(null)

  function annoncerStatut(message: string, erreur = false) {
    setStatut({ message, erreur })
  }

  function prononcer(lat: number, lng: number, origine: string) {
    setVerdict(rendreVerdict(lat, lng, origine))
    annoncerStatut("")
    const url = new URL(window.location.href)
    url.searchParams.set("pos", positionEnParam(lat, lng))
    window.history.replaceState(null, "", url)
  }

  // Amener le verdict à l'écran quand il tombe (utile surtout sur mobile)
  React.useEffect(() => {
    if (!verdict) return
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    verdictRef.current?.scrollIntoView({
      behavior: reduit ? "auto" : "smooth",
      block: "nearest",
    })
  }, [verdict])

  function localiser() {
    if (!navigator.geolocation) {
      annoncerStatut(
        "Votre navigateur ne permet pas la géolocalisation. Utilisez la recherche ou la carte.",
        true
      )
      return
    }
    setLocalisationEnCours(true)
    annoncerStatut("Localisation en cours…")
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocalisationEnCours(false)
        prononcer(pos.coords.latitude, pos.coords.longitude, "géolocalisation")
      },
      (err) => {
        setLocalisationEnCours(false)
        annoncerStatut(
          err.code === 1
            ? "Localisation refusée. Vous pouvez chercher une commune ou cliquer sur la carte."
            : "Localisation impossible. Vous pouvez chercher une commune ou cliquer sur la carte.",
          true
        )
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 }
    )
  }

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main className="conteneur flex-1 pt-10 lg:pt-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
          <section aria-label="Diagnostic de vacuité territoriale" className="min-w-0">
            <h1 className="max-w-[16ch] text-[clamp(2.125rem,4.5vw,3.375rem)] leading-[1.04] font-extrabold tracking-[-0.025em]">
              Suis-je dans la diagonale du vide&nbsp;?
            </h1>
            <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed text-muted-foreground">
              La «&nbsp;diagonale du vide&nbsp;» désigne la bande de faible densité de
              population qui traverse la France des Ardennes aux Landes. Localisez-vous
              ci-dessous pour savoir, en toute rigueur administrative, si vous êtes dans
              le vide.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Button
                size="lg"
                onClick={localiser}
                disabled={localisationEnCours}
                className="h-11 px-5 text-[15px] font-semibold"
              >
                {localisationEnCours ? (
                  <Spinner data-icon="inline-start" />
                ) : (
                  <LocateFixedIcon data-icon="inline-start" aria-hidden="true" />
                )}
                Me localiser
              </Button>
              <p className="text-sm text-muted-foreground">
                ou cliquez un point sur la carte
              </p>
            </div>

            <div className="mt-6">
              <CommuneSearch onResultat={prononcer} onStatut={annoncerStatut} />
            </div>

            <p
              role="status"
              aria-live="polite"
              className={cn(
                "mt-4 flex min-h-6 items-center gap-1.5 text-sm",
                statut.erreur ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {statut.erreur && (
                <CircleAlertIcon className="size-4 shrink-0" aria-hidden="true" />
              )}
              {statut.message}
            </p>

            <div ref={verdictRef} aria-live="polite" className="mt-4 scroll-mt-6">
              {verdict && (
                // La clé re-frappe le tampon et re-sort le relevé à chaque verdict
                <VerdictPanel
                  key={verdict.numeroDossier + verdict.origine}
                  verdict={verdict}
                />
              )}
            </div>
          </section>

          <aside aria-label="Carte de situation" className="min-w-0">
            <div className="lg:sticky lg:top-8">
              <FranceMap
                marker={verdict && { lat: verdict.lat, lng: verdict.lng }}
                onPick={(lat, lng) => prononcer(lat, lng, "point choisi sur la carte")}
              />
              <p className="mt-2 max-w-[65ch] text-xs text-muted-foreground">
                Tracé indicatif — la diagonale du vide n'a pas de frontière officielle,
                ce périmètre est une approximation à but purement récréatif.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
