const FILMS_URL = "https://kskerim.github.io/moviemates-api/api/movies.json";

// forme d'un film dans la réponse de l'API, limitée aux champs utilisés
type MovieResponse = {
  id: string;
  title: string;
  year: number | null;
  runtime_minutes: number | null;
  genres: string[];
  cast: string[];
  description: string | null;
  poster_url: string;
};

export async function fetchFilms(): Promise<MovieResponse[]> {
  const response = await fetch(FILMS_URL);
  if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
  const data: MovieResponse[] = await response.json();
  return data;
}
