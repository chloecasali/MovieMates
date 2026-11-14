import type { Duration } from "./time";

export type Genre =
  | "drame"
  | "comedie"
  | "thriller"
  | "horreur"
  | "action"
  | "aventure"
  | "animation"
  | "documentaire"
  | "romance"
  | "fantastique"
  | "science-fiction"
  | "western"
  | "biopic"
  | "historique"
  | "musical"
  | "policier"
  | "guerre"
  | "sportif"
  | "familial"
  | "autre";

export type Film = {
  id: string;
  title: string; // titre français
  originalTitle: string;
  description: string;
  duration?: Duration;
  year?: number;
  genres: Genre[]; // au moins un, du plus précis au plus large
  casting?: string[];
  plateform?: string[];
  coverUrl?: string;
};

export const GENRES: Genre[] = [
  "drame",
  "comedie",
  "thriller",
  "horreur",
  "action",
  "aventure",
  "animation",
  "documentaire",
  "romance",
  "fantastique",
  "science-fiction",
  "western",
  "biopic",
  "historique",
  "musical",
  "policier",
  "guerre",
  "sportif",
  "familial",
  "autre",
];

export const GENRE_TYPE_LABELS: Record<Genre, string> = {
  comedie: "Comédie",
  thriller: "Thriller",
  horreur: "Horreur",
  action: "Action",
  aventure: "Aventure",
  animation: "Animation",
  documentaire: "Documentaire",
  romance: "Romance",
  fantastique: "Fantastique",
  "science-fiction": "Science-fiction",
  western: "Western",
  biopic: "Biopic",
  historique: "Historique",
  musical: "Musical",
  policier: "Policier",
  guerre: "Guerre",
  sportif: "Sportif",
  familial: "Familial",
  drame: "Drame",
  autre: "Autre",
};

export type FilmFilters = {
  query: string;
  genre: Genre | null;
  // onlyAvailable: boolean; // en attente de données de plateformes dans l'API
};

// "Amélie" → "amelie" : ignore les signe diacritique et les majuscules
/* \p{Diacritic} veut dire « n’importe quel signe diacritique » : accent aigu, grave, circonflexe, tréma, cédille…
g remplace tous les accents, pas seulement le premier.
u active le mode Unicode, obligatoire pour que \p{…} fonctionne.
"" remplace chaque accent par rien, autrement dit le supprime. */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export const INITIAL_FILTERS: FilmFilters = {
  query: "",
  genre: null,
  // onlyAvailable: false,
};

// Renvoie true si le film correspond aux filtres, false sinon
export function matchesFilters(film: Film, filters: FilmFilters): boolean {
  const search = normalize(filters.query.trim());
  const matchesQuery =
    normalize(film.title).includes(search) ||
    normalize(film.originalTitle).includes(search);
  const matchesGenre =
    filters.genre === null || film.genres.includes(filters.genre);
  // disponible = au moins une plateforme connue (à réactiver avec onlyAvailable)
  // const matchesAvailability =
  //   !filters.onlyAvailable || (film.plateform?.length ?? 0) > 0;
  return matchesQuery && matchesGenre; // && matchesAvailability
}
