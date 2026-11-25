import { StyleSheet, Text } from "react-native";
import { usePlaylists } from "@/hooks/use-playlists";
import { theme } from "@/theme";

// aucune prop : le badge lit les playlists dans le context, où qu'il soit placé
export function PlaylistBadge() {
  const { state } = usePlaylists();
  const label =
    state.status === "success"
      ? `${state.playlists.length} playlist(s)`
      : "playlists";
  return <Text style={styles.badge}>{label}</Text>;
}

const styles = StyleSheet.create({
  badge: {
    fontSize: theme.typography.size[16],
    fontWeight: theme.typography.weight.semibold,
    color: theme.colors.primary,
  },
});
