import { Duration } from "./time";

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
  | "familial";

export type Film = {
  id: string;
  title: string;
  description: string;
  duration: Duration;
  year: number;
  genre: Genre;
  casting: string[];
  plateforme: string[];
  coverUrl: string;
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
};
export type FilmFilters = {
  query: string;
  genre: Genre | null;
  onlyAvailable: boolean;
};

// Règle métier : une fonction pure, sans React, facile à tester
export function matchesFilters(film: Film, filters: FilmFilters): boolean {
  const search = filters.query.trim().toLowerCase();
  const matchesQuery =
    film.title.toLowerCase().includes(search) ||
    film.description.toLowerCase().includes(search);
  const matchesGenre = filters.genre === null || film.genre === filters.genre;
  return matchesQuery && matchesGenre;
}
