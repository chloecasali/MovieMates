import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { FilmCard } from "@/components/film-card";
import { FilmFiltersBar } from "@/components/film-filter-bar";
import { Screen } from "@/components/ui/screen";
import { StatusMessage } from "@/components/ui/status-message";
import { useFilmFilters } from "@/hooks/use-film-filters";
import { useFilms } from "@/hooks/use-films";
import type { Film } from "@/models/film";
import { theme } from "@/theme";

// tableau constant : pas de nouveau tableau à chaque rendu pendant le chargement
const NO_FILMS: Film[] = [];

const keyExtractor = (film: Film) => film.id;

const renderItem = ({ item }: { item: Film }) => (
  <View style={styles.cell}>
    <FilmCard film={item} />
  </View>
);

// carte horizontale : 1 colonne sur téléphone, 2 dès 768 px, 3 dès 1100 px
function columnsFor(width: number): number {
  if (width >= 1100) return 3;
  if (width >= 768) return 2;
  return 1;
}

const filmCount = (n: number) => `${n} film${n > 1 ? "s" : ""}`;

export default function Index() {
  // hooks en haut, avant tout retour anticipé
  const { state, reload } = useFilms();
  const films = state.status === "success" ? state.films : NO_FILMS;
  const { filters, updateFilters, visibleFilms } = useFilmFilters(films);
  const { width } = useWindowDimensions();
  const columns = columnsFor(width);

  // titre, recherche, genres et compteur : défilent avec la liste
  const header = (
    <View style={styles.header}>
      <Text style={styles.title} accessibilityRole="header">
        Rechercher
      </Text>
      <FilmFiltersBar filters={filters} onChange={updateFilters} />
      {state.status === "success" ? (
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>Résultats</Text>
          <Text style={styles.resultsCount}>
            {filmCount(visibleFilms.length)}
          </Text>
        </View>
      ) : null}
    </View>
  );

  return (
    <Screen>
      {state.status === "loading" ? (
        <>
          {header}
          <StatusMessage kind="loading" message="Chargement des films…" />
        </>
      ) : state.status === "error" ? (
        <>
          {header}
          <StatusMessage
            kind="error"
            message={state.message}
            onRetry={reload}
          />
        </>
      ) : (
        <FlatList
          // changer numColumns sans changer key fait planter FlatList
          key={columns}
          data={visibleFilms}
          numColumns={columns}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={header}
          columnWrapperStyle={columns > 1 ? styles.row : undefined}
          contentContainerStyle={styles.list}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <StatusMessage kind="empty" message="Aucun film ne correspond." />
          }
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: theme.spacing[18],
    paddingTop: theme.spacing[12],
    paddingBottom: theme.spacing[6],
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.size[30],
    fontWeight: theme.typography.weight.extrabold,
    letterSpacing: -0.6,
  },
  results: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  resultsTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.size[18],
    fontWeight: theme.typography.weight.bold,
  },
  resultsCount: {
    color: theme.colors.muted,
    fontSize: theme.typography.size[13],
  },
  list: {
    flexGrow: 1,
    gap: theme.spacing[12],
    paddingBottom: theme.spacing[24],
  },
  row: { gap: theme.spacing[16] },
  cell: { flex: 1, minWidth: 0 },
});
