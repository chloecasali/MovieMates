import { FilmCard } from "@/components/film-card";
import { FilmFiltersBar } from "@/components/film-filter-bar";
import { useFilmFilters } from "@/hooks/use-film-filters";
import { FlatList, StyleSheet, View } from "react-native";
import { MOCK_FILMS } from "../data/film";

export default function Index() {
  const { filters, updateFilters, visibleFilms } = useFilmFilters(MOCK_FILMS);
  return (
    <View style={styles.container}>
      <FilmFiltersBar filters={filters} onChange={updateFilters} />
      <FlatList
        data={visibleFilms}
        renderItem={({ item }) => <FilmCard film={item} />}
        keyExtractor={(film) => film.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bagSummary: {
    width: "100%",
    padding: 16,
    fontSize: 18,
    fontWeight: "700",
  },
  list: {
    width: "100%",
  },
});
