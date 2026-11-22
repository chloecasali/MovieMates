import { StyleSheet, TextInput, View } from "react-native";
import type { TextInputProps } from "react-native";
import { AppText } from "@/components/ui/app-text";
import { theme } from "@/theme";

type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export function TextField({
  label,
  value,
  onChangeText,
  error,
  ...inputProps
}: TextFieldProps) {
  return (
    <View style={styles.container}>
      <AppText variant="caption" style={styles.label}>
        {label}
      </AppText>
      <TextInput
        {...inputProps}
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.colors.muted}
        style={[
          styles.input,
          error ? styles.inputError : null,
          inputProps.style,
        ]}
      />
      {error ? (
        <AppText accessibilityRole="alert" style={styles.error}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: theme.spacing[6] },
  label: { color: theme.colors.textSecondary },
  input: {
    minHeight: 48,
    paddingHorizontal: theme.spacing[12],
    borderWidth: 1,
    borderColor: theme.colors.borderInput,
    borderRadius: theme.radius[10],
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    fontSize: theme.typography.size[16],
  },
  inputError: { borderColor: theme.colors.primary },
  error: { color: theme.colors.primary },
});
