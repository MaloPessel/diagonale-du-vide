// Recherche de communes via l'API Adresse de l'État (BAN)

export type Commune = {
  nom: string
  contexte: string
  lat: number
  lng: number
}

type FeatureBAN = {
  geometry?: { coordinates: [number, number] }
  properties?: { name: string; context: string }
}

export async function chercherCommunes(q: string, signal?: AbortSignal): Promise<Commune[]> {
  const url =
    "https://api-adresse.data.gouv.fr/search/?type=municipality&limit=5&q=" +
    encodeURIComponent(q)
  const rep = await fetch(url, { signal })
  if (!rep.ok) throw new Error("HTTP " + rep.status)
  const donnees = await rep.json()
  return ((donnees.features || []) as FeatureBAN[])
    .filter((f) => f.geometry && f.properties)
    .map((f) => ({
      nom: f.properties!.name,
      contexte: f.properties!.context,
      // La BAN renvoie [lng, lat]
      lng: f.geometry!.coordinates[0],
      lat: f.geometry!.coordinates[1],
    }))
}
