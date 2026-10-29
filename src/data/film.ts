import { Film } from "@/models/film";

export const MOCK_FILMS: Film[] = [
  {
    id: "film-001",
    title: "Inception",
    description:
      "Un voleur expérimenté s'infiltre dans le subconscient des gens pour y dérober des secrets ou y planter des idées.",
    duration: {
      hours: 2,
      minutes: 28,
    },
    year: 2010,
    genre: "science-fiction",
    casting: [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Elliot Page",
      "Tom Hardy",
    ],
    plateforme: ["Netflix", "Max"],
    coverUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "film-002",
    title: "La La Land",
    description:
      "À Los Angeles, une actrice aspirante et un musicien de jazz passionné tombent amoureux tout en poursuivant leurs rêves.",
    duration: {
      hours: 2,
      minutes: 8,
    },
    year: 2016,
    genre: "drame",
    casting: ["Ryan Gosling", "Emma Stone", "John Legend", "J.K. Simmons"],
    plateforme: ["Prime Video", "Canal+"],
    coverUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "film-003",
    title: "Le Voyage de Chihiro",
    description:
      "Une jeune fille se retrouve piégée dans un monde mystérieux peuplé d'esprits et doit trouver un moyen de sauver ses parents.",
    duration: {
      hours: 2,
      minutes: 5,
    },
    year: 2001,
    genre: "animation",
    casting: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
    plateforme: ["Netflix"],
    coverUrl:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "film-004",
    title: "Pulp Fiction",
    description:
      "Les vies de deux tueurs à gages, d'un boxeur et de la femme d'un gangster s'entremêlent dans quatre histoires de violence et de rédemption.",
    duration: {
      hours: 2,
      minutes: 34,
    },
    year: 1994,
    genre: "thriller",
    casting: [
      "John Travolta",
      "Samuel L. Jackson",
      "Uma Thurman",
      "Bruce Willis",
    ],
    plateforme: ["Paramount+", "Apple TV"],
    coverUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "film-005",
    title: "Interstellar",
    description:
      "Une équipe d'explorateurs voyage à travers un trou de ver pour assurer la survie de l'humanité.",
    duration: {
      hours: 2,
      minutes: 49,
    },
    year: 2014,
    genre: "science-fiction",
    casting: [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Jessica Chastain",
      "Michael Caine",
    ],
    plateforme: ["Netflix", "Prime Video"],
    coverUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
];
