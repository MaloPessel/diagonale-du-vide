import { BlocMarque } from "@/components/bloc-marque"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t">
      <div className="conteneur flex flex-col gap-3 py-8">
        <BlocMarque taille="footer" />
        <p className="max-w-[75ch] text-sm text-muted-foreground">
          Aucune donnée n'est envoyée nulle part&nbsp;: la géolocalisation est traitée
          uniquement dans votre navigateur. La recherche de commune interroge l'API
          Adresse (data.gouv.fr). Ce site n'engage ni la République, ni le vide.
        </p>
        <p className="text-xs text-muted-foreground/90">
          Mentions légales&nbsp;: néant · Réclamations&nbsp;: adressez-vous au vide, il
          écoute · Temps d'attente constaté au guichet&nbsp;: 0 minute depuis 1947
        </p>
      </div>
    </footer>
  )
}
