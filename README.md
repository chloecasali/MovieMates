# MovieMates

MovieMates aide un groupe d'amis à choisir un film ensemble. Chacun crée des playlists à partir du catalogue de films, puis les partage avec un code. Pour choisir, tout le monde swipe les films de la playlist, et l'application affiche le film aimé par tous.

## membres

| prénom | nom         | compte GitHub                                 | partie                 |
| ------ | ----------- | --------------------------------------------- | ---------------------- |
| Chloé  | Casali      | [chloecasali](https://github.com/chloecasali) | B Navigation et compte |
| Eva    | Cherbonnier | [cherbobs](https://github.com/cherbobs)       | A catalogue            |
| Kerim  | Kasikci     | [kskerim](https://github.com/kskerim)         | C données partagées    |

## les parties

- **A · catalogue** : l'API des films, la recherche, les filtres, l'ajout aux playlists, la pile de cartes et l'onglet Match.
- **B · navigation et compte** : Expo Router, l'écran détail, l'authentification, le profil, les invitations et le résultat du match.
- **C · données partagées** : le thème, le Context, Firebase, les playlists, la logique du match, les règles de sécurité et les tests.

## API

Les films viennent de notre propre API, un fichier JSON publié avec GitHub Pages, gratuit et sans clé. Le prof a validé ce choix.

- films : https://kskerim.github.io/moviemates-api/api/movies.json
- genres : https://kskerim.github.io/moviemates-api/api/genres.json
- code de l'API : https://github.com/kskerim/moviemates-api
- 401 films, 19 genres, une affiche pour chaque film
- sources : [Sample APIs](https://sampleapis.com/api-list/movies) pour la liste des films et les affiches, [Wikidata](https://www.wikidata.org) pour les titres français, les années, les durées, les genres, les réalisateurs et les acteurs. Les affiches sont hébergées par IMDb.

## lancer le projet

```
npm install
npx expo start
```

Dans le terminal, `w` ouvre la version web sur http://localhost:8081. Sur téléphone, il faut scanner le QR code avec Expo Go, sur le même réseau Wi-Fi que l'ordinateur.

`npx tsc --noEmit` vérifie les types sans lancer l'application.

## organisation du code

Le code suit une architecture MVC.

```
src/
├── app/          écrans (vue)
├── components/   composants d'affichage (vue)
├── hooks/        hooks contrôleurs
├── context/      état partagé entre les écrans
├── services/     accès aux données
├── models/       types et règles
└── data/         données locales

```
