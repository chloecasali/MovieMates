import type { Film, FilmFilters } from "@/models/film";
import { INITIAL_FILTERS, matchesFilters } from "@/models/film";
import { useState } from "react";

// Contrôleur : l'état des filtres et la liste qui en découle
export function useFilmFilters(films: Film[]) {
  const [filters, setFilters] = useState<FilmFilters>(INITIAL_FILTERS);

  const updateFilters = (changes: Partial<FilmFilters>) =>
    setFilters((current) => ({ ...current, ...changes }));

  const visibleFilms = films.filter((film) => matchesFilters(film, filters));

  return { filters, updateFilters, visibleFilms };
}
