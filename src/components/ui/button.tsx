import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { AppText } from "@/components/ui/app-text";
import { theme } from "@/theme";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  loading?: boolean;
};

export function Button({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
}: ButtonProps) {
  const inactive = disabled || loading;
  const lightLabel = variant === "primary";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && !inactive && styles.pressed,
        inactive && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={lightLabel ? theme.colors.onPrimary : theme.colors.primary}
        />
      ) : (
        <AppText style={lightLabel ? styles.labelOnPrimary : styles.label}>
          {label}
        </AppText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.spacing[16],
    borderRadius: theme.radius[14],
  },
  primary: { backgroundColor: theme.colors.primary },
  secondary: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
  },
  ghost: { backgroundColor: theme.colors.transparent },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
  labelOnPrimary: {
    color: theme.colors.onPrimary,
    fontWeight: theme.typography.weight.semibold,
  },
  label: {
    color: theme.colors.text,
    fontWeight: theme.typography.weight.semibold,
  },
});
