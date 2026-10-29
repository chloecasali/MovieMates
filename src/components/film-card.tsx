import { Image, StyleSheet, Text, View } from "react-native";
import { Film } from "../models/film";

type FilmCardProps = {
  film: Film;
};

export function FilmCard({ film }: FilmCardProps) {
  return (
    <View>
      <Image
        source={{ uri: film.coverUrl }}
        style={{ width: "100%", aspectRatio: 1 }}
      />
      <Text style={styles.greeting}>
        {film.title} - {film.year}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  greeting: { fontSize: 18 },
  bold: { fontWeight: "700" },
  button: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#E2F7F4",
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#E5E5E5" },
  buttonPressed: { opacity: 0.6 },
  buttonLabel: { fontSize: 15, fontWeight: "600" },
  buttonLabelDisabled: { color: "#777" },
});
