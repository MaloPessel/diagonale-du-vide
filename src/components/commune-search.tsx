import * as React from "react"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { lireCoordonnees } from "@/lib/geo"
import { chercherCommunes, type Commune } from "@/lib/communes"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

type CommuneSearchProps = {
  onResultat: (lat: number, lng: number, origine: string) => void
  onStatut: (message: string, erreur?: boolean) => void
}

export function CommuneSearch({ onResultat, onStatut }: CommuneSearchProps) {
  const [saisie, setSaisie] = React.useState("")
  const [suggestions, setSuggestions] = React.useState<Commune[]>([])
  const [actif, setActif] = React.useState(-1)
  const [enCours, setEnCours] = React.useState(false)
  const conteneurRef = React.useRef<HTMLDivElement>(null)
  const requeteRef = React.useRef<AbortController | null>(null)

  React.useEffect(() => () => requeteRef.current?.abort(), [])

  function fermer() {
    setSuggestions([])
    setActif(-1)
  }

  function choisir(c: Commune) {
    fermer()
    setSaisie(c.nom)
    onResultat(c.lat, c.lng, `${c.nom}, ${c.contexte}`)
  }

  async function chercher() {
    const q = saisie.trim()
    fermer()
    if (!q) return

    const coords = lireCoordonnees(q)
    if (coords) {
      onResultat(coords.lat, coords.lng, "coordonnées saisies")
      return
    }

    // Une seule requête à la fois : la précédente est annulée
    requeteRef.current?.abort()
    const controleur = new AbortController()
    requeteRef.current = controleur

    onStatut("Recherche de la commune…")
    setEnCours(true)
    try {
      const resultats = await chercherCommunes(q, controleur.signal)
      if (resultats.length === 0) {
        onStatut("Commune introuvable. Vérifiez l'orthographe, ou cliquez sur la carte.", true)
      } else if (resultats.length === 1) {
        choisir(resultats[0])
      } else {
        onStatut("Plusieurs communes trouvées, précisez :")
        setSuggestions(resultats)
        setActif(0)
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return
      onStatut(
        "Recherche impossible (pas de connexion ?). Vous pouvez saisir des coordonnées ou cliquer sur la carte.",
        true
      )
    } finally {
      if (requeteRef.current === controleur) setEnCours(false)
    }
  }

  function surTouche(e: React.KeyboardEvent<HTMLInputElement>) {
    if (suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActif((i) => (i + 1) % suggestions.length)
        return
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setActif((i) => (i - 1 + suggestions.length) % suggestions.length)
        return
      }
      if (e.key === "Enter" && actif >= 0) {
        e.preventDefault()
        choisir(suggestions[actif])
        return
      }
      if (e.key === "Escape") {
        fermer()
        return
      }
    }
    if (e.key === "Enter") {
      e.preventDefault()
      void chercher()
    }
  }

  return (
    <div className="relative max-w-md" ref={conteneurRef}>
      <Field>
        <FieldLabel htmlFor="champ-ville">Commune ou coordonnées</FieldLabel>
        <InputGroup className="h-10 bg-background">
          <InputGroupAddon>
            {enCours ? <Spinner /> : <SearchIcon aria-hidden="true" />}
          </InputGroupAddon>
          <InputGroupInput
            id="champ-ville"
            role="combobox"
            aria-expanded={suggestions.length > 0}
            aria-controls="communes-listbox"
            aria-activedescendant={actif >= 0 ? `commune-option-${actif}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            placeholder="Guéret, Paris, Aurillac…"
            value={saisie}
            onChange={(e) => {
              setSaisie(e.target.value)
              fermer()
            }}
            onKeyDown={surTouche}
            onBlur={(e) => {
              if (!conteneurRef.current?.contains(e.relatedTarget as Node)) fermer()
            }}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="sm"
              variant="default"
              disabled={enCours}
              onClick={() => void chercher()}
              className="px-3 font-semibold"
            >
              Vérifier
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldDescription>
          Les coordonnées sont acceptées, ex.&nbsp;:{" "}
          <span className="font-mono text-foreground/80">45.83, 1.26</span>
        </FieldDescription>
      </Field>

      {suggestions.length > 0 && (
        <ul
          id="communes-listbox"
          role="listbox"
          aria-label="Communes correspondantes"
          className="absolute inset-x-0 top-full z-10 mt-1 flex w-full flex-col border bg-popover py-1 shadow-md"
        >
          {suggestions.map((c, i) => (
            <li key={`${c.nom}-${c.contexte}`} role="presentation">
              <button
                type="button"
                id={`commune-option-${i}`}
                role="option"
                aria-selected={i === actif}
                tabIndex={-1}
                onMouseEnter={() => setActif(i)}
                onClick={() => choisir(c)}
                className={cn(
                  "flex w-full items-baseline gap-2 px-3 py-2 text-left text-sm",
                  i === actif && "bg-accent text-accent-foreground"
                )}
              >
                <span className="font-medium">{c.nom}</span>
                <span className="text-xs text-muted-foreground">{c.contexte}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
