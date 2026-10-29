import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { FilmFilters, Genre, GENRE_TYPE_LABELS } from "@/models/film";

type FilmFiltersBarProps = {
  filters: FilmFilters;
  onChange: (changes: Partial<FilmFilters>) => void;
};

const TYPES = Object.keys(GENRE_TYPE_LABELS) as Genre[];

// Vue pure : affiche les filtres reçus et signale chaque changement
export function FilmFiltersBar({ filters, onChange }: FilmFiltersBarProps) {
  return (
    <View style={styles.bar}>
      <TextInput
        value={filters.query}
        onChangeText={(query) => onChange({ query })}
        placeholder="Rechercher un film"
        style={styles.search}
      />
      <View style={styles.row}>
        {TYPES.map((type) => (
          <Pressable
            key={type}
            onPress={() =>
              onChange({ genre: filters.genre === type ? null : type })
            }
            style={[styles.chip, filters.genre === type && styles.chipSelected]}
          >
            <Text style={styles.chipLabel}>{GENRE_TYPE_LABELS[type]}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { gap: 8, margin: 8 },
  search: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9DCEA",
    backgroundColor: "#fff",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D9DCEA",
    backgroundColor: "#fff",
  },
  chipSelected: {
    backgroundColor: "#2EC4B6",
    borderColor: "#2EC4B6",
  },
  chipLabel: { fontSize: 14, fontWeight: "600" },
  switch: { flexDirection: "row", alignItems: "center", gap: 6 },
});
