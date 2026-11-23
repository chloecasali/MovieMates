import { StyleSheet, Text } from "react-native";
import type { TextProps } from "react-native";
import { theme } from "@/theme";

type AppTextProps = TextProps & {
  variant?: "title" | "body" | "caption";
};

export function AppText({ variant = "body", style, ...props }: AppTextProps) {
  return <Text {...props} style={[styles.base, styles[variant], style]} />;
}

const styles = StyleSheet.create({
  base: { color: theme.colors.text },
  title: {
    fontSize: theme.typography.size[24],
    fontWeight: theme.typography.weight.bold,
  },
  body: {
    fontSize: theme.typography.size[16],
    fontWeight: theme.typography.weight.regular,
  },
  caption: {
    color: theme.colors.muted,
    fontSize: theme.typography.size[12],
    fontWeight: theme.typography.weight.regular,
  },
});
