import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { GENRE_TYPE_LABELS, type FilmFilters, type Genre } from "@/models/film";
import { theme } from "@/theme";

type FilmFiltersBarProps = {
  filters: FilmFilters;
  onChange: (changes: Partial<FilmFilters>) => void;
};

// genres proposés en raccourci, dans l'ordre de la maquette
const QUICK_GENRES: Genre[] = [
  "science-fiction",
  "thriller",
  "drame",
  "comedie",
];

// libellés courts pour que les chips tiennent sur deux lignes
const SHORT_LABELS: Partial<Record<Genre, string>> = {
  "science-fiction": "SF",
};

const labelOf = (genre: Genre) =>
  SHORT_LABELS[genre] ?? GENRE_TYPE_LABELS[genre];

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

// chip de la maquette : contour fin, fond clair quand il est sélectionné
function FilterChip({ label, selected, onPress }: FilterChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

// loupe dessinée avec deux vues : aucune dépendance d'icônes
function SearchIcon() {
  return (
    <View style={styles.icon} accessibilityElementsHidden>
      <View style={styles.iconLens} />
      <View style={styles.iconHandle} />
    </View>
  );
}

// Vue pure : affiche les filtres reçus et signale chaque changement
export function FilmFiltersBar({ filters, onChange }: FilmFiltersBarProps) {
  // un second appui sur le genre sélectionné revient à « Tout »
  const toggleGenre = (genre: Genre) =>
    onChange({ genre: filters.genre === genre ? null : genre });

  return (
    <View style={styles.bar}>
      <View style={styles.search}>
        <SearchIcon />
        <TextInput
          accessibilityLabel="Rechercher un film"
          placeholder="Rechercher un film"
          placeholderTextColor={theme.colors.muted}
          value={filters.query}
          onChangeText={(query) => onChange({ query })}
          autoCorrect={false}
          returnKeyType="search"
          style={styles.input}
        />
      </View>

      <View style={styles.chips}>
        <FilterChip
          label="Tout"
          selected={filters.genre === null}
          onPress={() => onChange({ genre: null })}
        />
        {QUICK_GENRES.map((genre) => (
          <FilterChip
            key={genre}
            label={labelOf(genre)}
            selected={filters.genre === genre}
            onPress={() => toggleGenre(genre)}
          />
        ))}
      </View>
    </View>
  );
}

// tailles relevées sur la maquette figma « Container »
const SEARCH_HEIGHT = 36;
const CHIP_HEIGHT = 36;
const ICON_SIZE = 20;
const LENS_SIZE = 12;

const styles = StyleSheet.create({
  bar: { gap: theme.spacing[18] },
  search: {
    height: SEARCH_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[10],
    paddingHorizontal: theme.spacing[16],
    borderWidth: 1,
    borderColor: theme.colors.borderInput,
    borderRadius: theme.radius[16],
    backgroundColor: theme.colors.surface,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    color: theme.colors.text,
    fontSize: theme.typography.size[16],
  },
  icon: { width: ICON_SIZE, height: ICON_SIZE },
  iconLens: {
    position: "absolute",
    top: 3,
    left: 3,
    width: LENS_SIZE,
    height: LENS_SIZE,
    borderWidth: 1.7,
    borderColor: theme.colors.muted,
    borderRadius: LENS_SIZE / 2,
  },
  iconHandle: {
    position: "absolute",
    top: 14,
    left: 13,
    width: 5,
    height: 1.7,
    borderRadius: 1,
    backgroundColor: theme.colors.muted,
    transform: [{ rotate: "45deg" }],
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing[8],
  },
  chip: {
    height: CHIP_HEIGHT,
    justifyContent: "center",
    paddingHorizontal: theme.spacing[14],
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    borderRadius: theme.radius[18],
  },
  chipSelected: {
    borderColor: theme.colors.text,
    backgroundColor: theme.colors.text,
  },
  chipLabel: {
    color: theme.colors.text,
    fontSize: theme.typography.size[14],
    fontWeight: theme.typography.weight.semibold,
  },
  chipLabelSelected: { color: theme.colors.background },
  pressed: { opacity: 0.8 },
});
