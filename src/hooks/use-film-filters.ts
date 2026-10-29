import { useState } from "react";

import { Film, FilmFilters, matchesFilters } from "@/models/film";

const INITIAL_FILTERS: FilmFilters = {
  query: "",
  onlyAvailable: false,
  genre: null,
};

// Contrôleur : l'état des filtres et la liste qui en découle
export function useFilmFilters(films: Film[]) {
  const [filters, setFilters] = useState<FilmFilters>(INITIAL_FILTERS);

  const updateFilters = (changes: Partial<FilmFilters>) =>
    setFilters((current) => ({ ...current, ...changes }));

  const visibleFilms = films.filter((film) => matchesFilters(film, filters));

  return { filters, updateFilters, visibleFilms };
}
