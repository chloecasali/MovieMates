import { ActivityIndicator, StyleSheet, View } from "react-native";

import { AppText } from "@/components/ui/app-text";
import { Button } from "@/components/ui/button";
import { theme } from "@/theme";

type StatusMessageProps =
  | { kind: "loading"; message?: string }
  | { kind: "error"; message: string; onRetry?: () => void }
  | { kind: "empty"; message: string };

// Vue pure : chargement, erreur avec « Réessayer », ou liste vide
export function StatusMessage(props: StatusMessageProps) {
  return (
    <View style={styles.box} accessibilityLiveRegion="polite">
      {props.kind === "loading" ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : null}
      {props.message ? (
        <AppText
          accessibilityRole={props.kind === "error" ? "alert" : undefined}
          style={[styles.text, props.kind === "error" && styles.error]}
        >
          {props.message}
        </AppText>
      ) : null}
      {props.kind === "error" && props.onRetry ? (
        <Button label="Réessayer" variant="secondary" onPress={props.onRetry} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing[12],
    padding: theme.spacing[24],
  },
  text: {
    color: theme.colors.muted,
    fontSize: theme.typography.size[15],
    textAlign: "center",
  },
  error: { color: theme.colors.text },
});
