import type { Playlist, PlaylistEntry } from "@/models/playlist";

// TEMPORAIRE - En attendant les vrais data on crée de faux utilisateurs
const demoUser = "demo-user";
const friendUser = "demo-friend";

const entry = (
  filmId: string,
  title: string,
  year: number,
  genre: PlaylistEntry["genre"],
  addedBy = demoUser,
  posterUrl?: string,
): PlaylistEntry => ({
  filmId,
  title,
  year,
  genre,
  ...(posterUrl ? { posterUrl } : {}),
  addedBy,
  addedAt: new Date("2026-01-15T12:00:00.000Z"),
});

export type MockPlaylist = Playlist & { entries: PlaylistEntry[] };

export const MOCK_PLAYLISTS: MockPlaylist[] = [
  {
    id: "playlist-favorites",
    name: "À voir absolument",
    description: "Les films à ne pas manquer.",
    ownerId: demoUser,
    memberIds: [demoUser],
    visibility: "private",
    createdAt: new Date("2026-01-10T10:00:00.000Z"),
    entries: [
      entry(
        "27205",
        "Inception",
        2010,
        "science-fiction",
        demoUser,
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
      ),
      entry("157336", "Interstellar", 2014, "science-fiction"),
    ],
  },
  {
    id: "playlist-weekend",
    name: "Soirée cinéma",
    ownerId: demoUser,
    memberIds: [demoUser],
    visibility: "private",
    createdAt: new Date("2026-01-12T18:30:00.000Z"),
    entries: [entry("313369", "La La Land", 2016, "drame")],
  },
  {
    id: "playlist-shared",
    name: "À regarder ensemble",
    description: "Une sélection partagée entre amis.",
    ownerId: friendUser,
    memberIds: [friendUser, demoUser],
    visibility: "shared",
    inviteCode: "CINE42",
    createdAt: new Date("2026-01-14T09:00:00.000Z"),
    entries: [
      entry("129", "Le Voyage de Chihiro", 2001, "animation", friendUser),
    ],
  },
  {
    id: "playlist-classics",
    name: "Classiques",
    ownerId: demoUser,
    memberIds: [demoUser],
    visibility: "private",
    createdAt: new Date("2026-01-15T11:00:00.000Z"),
    entries: [entry("680", "Pulp Fiction", 1994, "thriller")],
  },
];
