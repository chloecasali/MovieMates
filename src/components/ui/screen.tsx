import { StyleSheet, View } from "react-native";
import type { ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/theme";

type ScreenProps = ViewProps & {
  children: React.ReactNode;
};

export function Screen({ children, style, ...props }: ScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View {...props} style={[styles.content, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.screen,
    backgroundColor: theme.colors.background,
  },
});
