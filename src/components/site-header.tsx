import { Badge } from "@/components/ui/badge"
import { BlocMarque } from "@/components/bloc-marque"

export function SiteHeader() {
  return (
    <header className="border-b shadow-[0_1px_4px_oklch(0.31_0.19_264.6/0.1)]">
      <div className="conteneur flex items-center gap-6 py-4">
        <BlocMarque devise />
        <div className="hidden h-12 w-px bg-border sm:block" aria-hidden="true" />
        <div className="hidden sm:block">
          <p className="text-[17px] font-bold">diagonale-du-vide.fr</p>
          <p className="text-[12.5px] text-muted-foreground">
            Le service (pas du tout) officiel de diagnostic de vacuité territoriale
          </p>
        </div>
        <Badge variant="outline" className="ml-auto hidden font-mono md:inline-flex">
          Guichet n°0 — aucune file d'attente
        </Badge>
      </div>
    </header>
  )
}
