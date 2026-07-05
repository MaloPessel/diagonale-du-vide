import { cn } from "@/lib/utils"

type BlocMarqueProps = {
  taille?: "header" | "footer"
  devise?: boolean
}

// Bloc-marque parodique : drapeau tricolore + « République du vide »
export function BlocMarque({ taille = "header", devise = false }: BlocMarqueProps) {
  const compact = taille === "footer"
  return (
    <div className={cn(compact && "flex items-center gap-3")}>
      <div
        aria-hidden="true"
        className={cn(
          "flex overflow-hidden ring-1 ring-border",
          compact ? "h-3 w-[22px]" : "h-3.5 w-[26px]"
        )}
      >
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-background" />
        <div className="flex-1 bg-destructive" />
      </div>
      <p
        className={cn(
          "font-extrabold tracking-[0.02em] uppercase",
          compact ? "text-xs" : "mt-1.5 text-[13px] leading-[1.15]"
        )}
      >
        République{compact ? " " : <br />}du vide
      </p>
      {devise && (
        <p className="mt-0.5 text-[11px] italic text-muted-foreground">
          Vide, Calme, Tranquillité
        </p>
      )}
    </div>
  )
}
