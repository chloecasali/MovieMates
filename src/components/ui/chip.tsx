import { Pressable, StyleSheet } from "react-native";
import { AppText } from "@/components/ui/app-text";
import { theme } from "@/theme";

type ChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
};

export function Chip({ label, selected, onPress, disabled = false }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        selected && styles.selected,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <AppText style={selected ? styles.selectedLabel : styles.label}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 36,
    justifyContent: "center",
    paddingHorizontal: theme.spacing[14],
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    borderRadius: theme.radius[20],
    backgroundColor: theme.colors.surface,
  },
  selected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surfaceSelected,
  },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.size[14],
  },
  selectedLabel: {
    color: theme.colors.primary,
    fontSize: theme.typography.size[14],
    fontWeight: theme.typography.weight.semibold,
  },
});
