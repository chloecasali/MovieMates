import { toGenres } from "@/data/genres";
import type { Film } from "@/models/film";

const API_URL =
  process.env.EXPO_PUBLIC_MOVIES_API_URL ??
  "https://kskerim.github.io/moviemates-api/api/3";
const IMAGE_URL = "https://m.media-amazon.com/images/M";

// forme d'un film dans la réponse de l'API, limitée aux champs utilisés
type MovieResponse = {
  id: number;
  title: string;
  original_title: string;
  release_date: string; // "AAAA-MM-JJ" ou ""
  genre_ids: number[];
  overview: string;
  poster_path: string | null;
};

type PageResponse = {
  page: number;
  total_pages: number;
  results: MovieResponse[];
};

// seul endroit qui connaît les noms de champs de l'API
export function toFilm(m: MovieResponse): Film {
  const year = Number(m.release_date.slice(0, 4));
  return {
    id: String(m.id),
    title: m.title,
    originalTitle: m.original_title,
    description: m.overview,
    genres: toGenres(m.genre_ids),
    ...(year ? { year } : {}),
    ...(m.poster_path ? { coverUrl: `${IMAGE_URL}${m.poster_path}` } : {}),
  };
}

// une page de 20 films
export async function fetchFilms(page = 1): Promise<Film[]> {
  console.log("URL :", `${API_URL}/discover/movie/${page}.json`);
  const response = await fetch(`${API_URL}/discover/movie/${page}.json`);
  if (!response.ok)
    throw new Error(`Chargement des films impossible (${response.status})`);
  const data = (await response.json()) as PageResponse;
  return data.results.map(toFilm);
}
