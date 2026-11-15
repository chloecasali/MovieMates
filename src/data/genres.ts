import type { Genre } from "@/models/film";

// Identifiant de genre de l'API (format TMDB) → genre de l'app.
// Liste des identifiants : GET {API}/genre/movie/list.json
export const GENRE_BY_API_ID: Record<number, Genre> = {
  28: "action",
  12: "aventure",
  16: "animation",
  35: "comedie",
  80: "policier",
  99: "documentaire",
  18: "drame",
  10751: "familial",
  14: "fantastique",
  36: "historique",
  27: "horreur",
  10402: "musical",
  9648: "thriller", // Mystère
  10749: "romance",
  878: "science-fiction",
  53: "thriller",
  10752: "guerre",
  37: "western",
};

// Un identifiant inconnu donne "autre"
export const toGenre = (id: number): Genre => GENRE_BY_API_ID[id] ?? "autre";

// Plusieurs identifiants → genres de l'app, sans doublon, dans le même ordre
export function toGenres(ids: number[]): Genre[] {
  const genres = [...new Set(ids.map(toGenre))];
  return genres.length > 0 ? genres : ["autre"];
}
