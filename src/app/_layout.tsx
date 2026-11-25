import { Stack } from "expo-router";
import { PlaylistsProvider } from "@/context/playlists-context";

// le provider entoure toute la pile : chaque écran peut lire les playlists
export default function RootLayout() {
  return (
    <PlaylistsProvider>
      <Stack />
    </PlaylistsProvider>
  );
}
