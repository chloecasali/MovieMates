import { createContext, ReactNode, useEffect, useState } from "react";
import type { Playlist, Visibility } from "@/models/playlist";
import { createPlaylist, listPlaylists } from "@/services/playlists";

// une seule forme possible à la fois : chargement, erreur ou liste
export type PlaylistsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; playlists: Playlist[] };

export type PlaylistsContextValue = {
  state: PlaylistsState;
  reload: () => void;
  create: (name: string, visibility: Visibility) => Promise<void>;
};

// null par défaut : la valeur n'existe que sous le Provider
export const PlaylistsContext = createContext<PlaylistsContextValue | null>(
  null,
);

// charge les playlists une fois et les partage avec tous les écrans
export function PlaylistsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlaylistsState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    listPlaylists()
      .then((playlists) => {
        if (!cancelled) setState({ status: "success", playlists });
      })
      .catch(() => {
        if (!cancelled)
          setState({
            status: "error",
            message: "Échec du chargement des playlists",
          });
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const reload = () => {
    setState({ status: "loading" });
    setAttempt((n) => n + 1);
  };

  // la liste se recharge sans repasser par le chargement, elle reste affichée
  const create = async (name: string, visibility: Visibility) => {
    await createPlaylist({ name, visibility });
    setAttempt((n) => n + 1);
  };

  return (
    <PlaylistsContext.Provider value={{ state, reload, create }}>
      {children}
    </PlaylistsContext.Provider>
  );
}
