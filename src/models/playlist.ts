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
  year: number;
  genre: Genre;
  posterUrl?: string;
  addedBy: string;
  addedAt: Date;
};

export const isMember = (playlist: Playlist, memberId: string): boolean =>
  playlist.memberIds.includes(memberId);

export const isOwner = (playlist: Playlist, ownerId: string): boolean =>
  playlist.ownerId === ownerId;
