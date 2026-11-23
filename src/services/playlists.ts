import {
  DEMO_USER_ID,
  MOCK_PLAYLISTS,
  type MockPlaylist,
} from "@/data/playlists";
import type { Playlist, PlaylistEntry, Visibility } from "@/models/playlist";

// TEMPORAIRE — Service mock en mémoire, à remplacer par Firestore.
// TEMPORAIRE — Délai artificiel pour rendre visibles les états de chargement.
const SIMULATED_DELAY_MS = 300;

// TEMPORAIRE — Simule une attente réseau avant chaque opération du service.
const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

// TEMPORAIRE — Copie les données pour éviter de partager des références entre les données factices,
// le stockage en mémoire et les réponses du service.
const copyPlaylist = (playlist: MockPlaylist): MockPlaylist => ({
  ...playlist,
  memberIds: [...playlist.memberIds],
  entries: playlist.entries.map((entry) => ({
    ...entry,
    genres: [...entry.genres],
  })),
});

// TEMPORAIRE — Copie les données de mock : les opérations peuvent modifier ce store
// sans altérer MOCK_PLAYLISTS. Le contenu restera en mémoire seulement.
let store: MockPlaylist[] = MOCK_PLAYLISTS.map(copyPlaylist);

// Renvoie les playlists accessibles à l'utilisateur
export async function listPlaylists(
  userId = DEMO_USER_ID,
): Promise<Playlist[]> {
  await wait(SIMULATED_DELAY_MS);
  return store
    .filter((playlist) => playlist.memberIds.includes(userId))
    .map(({ entries: _entries, ...playlist }) => ({
      ...playlist,
      memberIds: [...playlist.memberIds],
    }));
}

// Renvoie une playlist avec ses films
export async function getPlaylist(
  playlistId: string,
): Promise<MockPlaylist | undefined> {
  await wait(SIMULATED_DELAY_MS);
  const playlist = store.find((item) => item.id === playlistId);
  return playlist ? copyPlaylist(playlist) : undefined;
}

// Crée une nouvelle playlist et l'ajoute au store avec les autres.
export async function createPlaylist(input: {
  name: string;
  description?: string;
  visibility: Visibility;
  ownerId?: string;
}): Promise<string> {
  await wait(SIMULATED_DELAY_MS);
  const ownerId = input.ownerId ?? DEMO_USER_ID;
  const id = `playlist-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  store = [
    ...store,
    {
      id,
      name: input.name,
      ...(input.description ? { description: input.description } : {}),
      ownerId,
      memberIds: [ownerId],
      visibility: input.visibility,
      createdAt: new Date(),
      entries: [],
    },
  ];
  return id;
}

// Ajoute un film à la playlist
export async function addFilm(
  playlistId: string,
  input: Omit<PlaylistEntry, "addedAt"> & { addedAt?: Date }, // tous les champs sauf addedAt, si addedAt est absent alors date du jour
): Promise<void> {
  await wait(SIMULATED_DELAY_MS);
  const playlist = findPlaylist(playlistId);
  const { addedAt, ...entry } = input;
  playlist.entries = [
    ...playlist.entries,
    { ...entry, genres: [...entry.genres], addedAt: addedAt ?? new Date() },
  ];
}

// Retire un film de la playlist
export async function removeFilm(
  playlistId: string,
  filmId: string,
): Promise<void> {
  await wait(SIMULATED_DELAY_MS);
  const playlist = findPlaylist(playlistId);
  playlist.entries = playlist.entries.filter(
    (entry) => entry.filmId !== filmId,
  );
}

// Recherche une playlist par son identifiant
function findPlaylist(playlistId: string): MockPlaylist {
  const playlist = store.find((item) => item.id === playlistId);
  if (!playlist) throw new Error(`Playlist introuvable : ${playlistId}`);
  return playlist;
}
