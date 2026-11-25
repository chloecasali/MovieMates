# MovieMates

MovieMates aide à choisir un film sans passer la soirée à hésiter. L'application présente les films un par un avec leur affiche, et on garde ou on passe chacun d'un geste, comme sur une application de rencontre. On retrouve ensuite ses films aimés, classés par genre, avec leur fiche et un lien vers IMDb.

## membres

| prénom | nom         | compte GitHub                                 | partie                 |
| ------ | ----------- | --------------------------------------------- | ---------------------- |
| Chloé  | Casali      | [chloecasali](https://github.com/chloecasali) | B Navigation et compte |
| Eva    | Cherbonnier | [cherbobs](https://github.com/cherbobs)       | A catalogue            |
| Kerim  | Kasikci     | [kskerim](https://github.com/kskerim)         | C données partagées    |

## les parties

- **A · catalogue** : le modèle des films, le service de l'API, les hooks et l'écran du catalogue.
- **B · navigation et compte** : les écrans, la navigation et le compte utilisateur.
- **C · données partagées** : les données communes à plusieurs écrans, gérées avec un Context.

## API

API **MovieMates** : fichiers JSON statiques sur GitHub Pages, gratuits et sans clé.
Source : https://github.com/kskerim/moviemates-api

| Route                                                      | Contenu                                |
| ---------------------------------------------------------- | -------------------------------------- |
| `https://kskerim.github.io/moviemates-api/api/movies.json` | les 401 films                          |
| `https://kskerim.github.io/moviemates-api/api/genres.json` | les 19 genres et leur libellé français |

Recherche et détail : pour l'instant, l'app charge la liste une fois, puis filtre et cherche par `id` en local.
Évolution prévue : reprendre la sémantique de TMDB v3 (discover, search, movie/{id}, genre/movie/list).

### Champs utilisés

| Champ               | Type                 | Remarque                               |
| ------------------- | -------------------- | -------------------------------------- |
| `id`                | texte                | identifiant IMDb (`tt0068646`), unique |
| `title`             | texte                | titre français                         |
| `original_title`    | texte                |                                        |
| `year`              | nombre ou `null`     | null sur 2 films                       |
| `runtime_minutes`   | nombre ou `null`     | null sur 2 films                       |
| `genres`            | liste d'identifiants | au moins un, voir `genres.json`        |
| `directors`, `cast` | listes de textes     | peuvent être vides                     |
| `description`       | texte ou `null`      | une ligne, pas un vrai résumé          |
| `poster_url`        | texte                | toujours présent (affiches IMDb)       |

Pas de note dans les données : le filtre par note et `RatingBadge` attendront l'adaptation de l'API.

## Firebase

Connexion par e-mail et trois collections Firestore, une par partie.

```
users/{uid}                                 B · profil
playlists/{playlistId}                      C · playlists
playlists/{playlistId}/entries/{filmId}     A · films d'une playlist
```

Les dates sont rangées en nombre de millisecondes (`Date.now()`). Un champ facultatif est absent du document quand il est vide.

### users/{uid}

| Champ         | Type   | Remarque                   |
| ------------- | ------ | -------------------------- |
| `displayName` | texte  | nom affiché aux autres     |
| `email`       | texte  |                            |
| `createdAt`   | nombre | date de création du compte |

### playlists/{playlistId}

| Champ         | Type                  | Remarque                            |
| ------------- | --------------------- | ----------------------------------- |
| `name`        | texte                 |                                     |
| `description` | texte, facultatif     |                                     |
| `ownerId`     | texte                 | `uid` du créateur                   |
| `memberIds`   | liste de textes       | `uid` des membres, créateur compris |
| `visibility`  | `private` ou `shared` |                                     |
| `inviteCode`  | texte, facultatif     | code pour rejoindre une playlist    |
| `createdAt`   | nombre                |                                     |

### playlists/{playlistId}/entries/{filmId}

L'identifiant du document est celui du film. Le titre, l'année, les genres et l'affiche sont recopiés depuis l'API pour afficher la playlist sans la rappeler.

| Champ      | Type               | Remarque                      |
| ---------- | ------------------ | ----------------------------- |
| `title`    | texte              |                               |
| `year`     | nombre, facultatif |                               |
| `genres`   | liste de textes    | genres de l'app               |
| `coverUrl` | texte, facultatif  |                               |
| `addedBy`  | texte              | `uid` de qui a ajouté le film |
| `addedAt`  | nombre             |                               |

## lancer le projet

```
npm install
npx expo start
```

Dans le terminal, `w` ouvre la version web sur http://localhost:8081. Sur téléphone, il faut scanner le QR code avec Expo Go, sur le même réseau Wi-Fi que l'ordinateur.

`npx tsc --noEmit` vérifie les types sans lancer l'application.

## Avant de push

```
make ci
```

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
