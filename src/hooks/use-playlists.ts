import { useContext } from "react";
import {
  PlaylistsContext,
  PlaylistsContextValue,
} from "@/context/playlists-context";

// seule porte d'entrée vers les playlists partagées
export function usePlaylists(): PlaylistsContextValue {
  const context = useContext(PlaylistsContext);
  if (!context) {
    throw new Error("usePlaylists doit être utilisé dans un PlaylistsProvider");
  }
  return context;
}
