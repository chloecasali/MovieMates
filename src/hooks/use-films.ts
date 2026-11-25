import type { Film } from "@/models/film";
import { fetchFilms } from "@/services/films-service";
import { useCallback, useEffect, useState } from "react";

export type FilmsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; films: Film[] };

export function useFilms() {
  const [state, setState] = useState<FilmsState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    fetchFilms()
      .then((films) => {
        if (active) setState({ status: "success", films });
      })
      .catch((e: unknown) => {
        if (active)
          setState({
            status: "error",
            message: e instanceof Error ? e.message : "Erreur inconnue",
          });
      });

    return () => {
      active = false;
    };
  }, [attempt]);
  const reload = useCallback(() => setAttempt((n) => n + 1), []);
  return { state, reload };
}
