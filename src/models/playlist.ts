import type { Genre } from "@/models/film";

export type Visibility = "private" | "shared";

export type Playlist = {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  memberIds: string[];
  visibility: Visibility;
  inviteCode?: string;
  createdAt: Date;
};

export type PlaylistEntry = {
  filmId: string;
  title: string;
  year?: number;
  genres: Genre[];
  coverUrl?: string;
  addedBy: string;
  addedAt: Date;
};

export const isMember = (playlist: Playlist, memberId: string): boolean =>
  playlist.memberIds.includes(memberId);

export const isOwner = (playlist: Playlist, ownerId: string): boolean =>
  playlist.ownerId === ownerId;

export type PlaylistSection = { title: string; data: Playlist[] };

// sépare les playlists de l'utilisateur de celles partagées avec lui,
// au format attendu par SectionList
export function groupPlaylists(
  playlists: Playlist[],
  userId: string,
): PlaylistSection[] {
  const sections = [
    {
      title: "Mes playlists",
      data: playlists.filter((playlist) => isOwner(playlist, userId)),
    },
    {
      title: "Partagées avec moi",
      data: playlists.filter(
        (playlist) => !isOwner(playlist, userId) && isMember(playlist, userId),
      ),
    },
  ];
  // une section vide est retirée : sans playlist, la liste affiche son message vide
  return sections.filter((section) => section.data.length > 0);
}
