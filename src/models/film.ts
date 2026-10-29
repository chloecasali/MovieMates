export type Genre =
  | "SF"
  | "Drame"
  | "Comédie"
  | "Thriller"
  | "Horreur"
  | "Action"
  | "Aventure"
  | "Animation"
  | "Documentaire"
  | "Romance"
  | "Fantastique"
  | "Science-Fiction"
  | "Western"
  | "Biopic"
  | "Historique"
  | "Musical"
  | "Policier"
  | "Guerre"
  | "Sportif"
  | "Familial";

export type Film = {
  id: string;
  title: string;
  description: string;
  year: number;
  genre: Genre;
  length: number;
  casting: string[];
  plateforme: string[];
  coverUrl: string;
};

export const GENRES: Genre[] = [
  "SF",
  "Drame",
  "Comédie",
  "Thriller",
  "Horreur",
  "Action",
  "Aventure",
  "Animation",
  "Documentaire",
  "Romance",
  "Fantastique",
  "Science-Fiction",
  "Western",
  "Biopic",
  "Historique",
  "Musical",
  "Policier",
  "Guerre",
  "Sportif",
  "Familial",
];
