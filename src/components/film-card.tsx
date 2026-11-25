import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { GENRE_TYPE_LABELS, type Film } from "@/models/film";
import { theme } from "@/theme";

type FilmCardProps = {
  film: Film;
  // ouvre le détail du film (branché par l'écran, NAV-05)
  onPress?: () => void;
  // bouton rose « + » (branché par l'écran, PL-09) ; absent = bouton inactif
  onAdd?: () => void;
};

// "2010 · Science-fiction" : année et genre principal, sans les valeurs absentes
function filmSubtitle(film: Film): string {
  return [film.year, GENRE_TYPE_LABELS[film.genres[0] ?? "autre"]]
    .filter(Boolean)
    .join(" · ");
}

// même film → même couleur d'affiche de secours, à chaque rendu
function posterColor(id: string): string {
  const palette = theme.colors.posters;
  let sum = 0;
  for (const char of id) sum += char.charCodeAt(0);
  return palette[sum % palette.length];
}

// Vue pure : affiche 80×80, titre, année et genre, bouton « + » (maquette « Container »)
export function FilmCard({ film, onPress, onAdd }: FilmCardProps) {
  // état d'affichage seulement : l'image n'a pas pu être chargée
  const [coverFailed, setCoverFailed] = useState(false);
  const subtitle = filmSubtitle(film);
  const showCover = film.coverUrl !== undefined && !coverFailed;

  return (
    <View style={styles.container}>
      {/* le bouton + est à côté du lien, pas dedans : sinon un appui sur +
          ouvrirait aussi le détail */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${film.title}, ${subtitle}`}
        disabled={!onPress}
        onPress={onPress}
        style={({ pressed }) => [styles.link, pressed && styles.pressed]}
      >
        {showCover ? (
          <Image
            source={{ uri: film.coverUrl }}
            onError={() => setCoverFailed(true)}
            resizeMode="cover"
            style={styles.cover}
          />
        ) : (
          <View
            style={[
              styles.cover,
              styles.coverFallback,
              { backgroundColor: posterColor(film.id) },
            ]}
          >
            <Text style={styles.coverLabel} numberOfLines={3}>
              {film.title.toUpperCase()}
            </Text>
          </View>
        )}

        <View style={styles.texts}>
          <Text style={styles.title} numberOfLines={2}>
            {film.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
      </Pressable>

      {/* toujours affiché (maquette) ; inactif tant que l'écran ne passe pas onAdd (PL-09) */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Ajouter ${film.title} à une playlist`}
        accessibilityState={{ disabled: !onAdd }}
        disabled={!onAdd}
        hitSlop={4}
        onPress={onAdd}
        style={({ pressed }) => [styles.add, pressed && styles.pressed]}
      >
        {/* « + » dessiné avec deux barres : aucune dépendance d'icônes */}
        <View style={styles.plusHorizontal} />
        <View style={styles.plusVertical} />
      </Pressable>
    </View>
  );
}

// tailles relevées sur la maquette figma « Container »
const COVER_SIZE = 80;
const ADD_SIZE = 44;
const PLUS_LENGTH = 12;
const PLUS_THICKNESS = 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[14],
  },
  link: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing[14],
  },
  pressed: { opacity: 0.7 },
  cover: {
    width: COVER_SIZE,
    height: COVER_SIZE,
    borderRadius: theme.radius[8],
  },
  coverFallback: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: theme.spacing[6],
  },
  coverLabel: {
    color: theme.colors.onPrimary,
    opacity: 0.88,
    fontSize: 9,
    lineHeight: 9,
    fontWeight: theme.typography.weight.bold,
  },
  texts: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing[4],
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.size[16],
    fontWeight: theme.typography.weight.semibold,
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: theme.typography.size[13],
    fontWeight: theme.typography.weight.regular,
  },
  add: {
    width: ADD_SIZE,
    height: ADD_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius[22],
    backgroundColor: theme.colors.primary,
  },
  plusHorizontal: {
    position: "absolute",
    width: PLUS_LENGTH,
    height: PLUS_THICKNESS,
    borderRadius: PLUS_THICKNESS / 2,
    backgroundColor: theme.colors.onPrimary,
  },
  plusVertical: {
    position: "absolute",
    width: PLUS_THICKNESS,
    height: PLUS_LENGTH,
    borderRadius: PLUS_THICKNESS / 2,
    backgroundColor: theme.colors.onPrimary,
  },
});
