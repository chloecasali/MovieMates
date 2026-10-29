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

Les films viennent de notre propre API, un fichier JSON publié avec GitHub Pages, gratuit et sans clé. Le prof a validé ce choix.

- adresse : à compléter après la publication
- 407 films, 19 genres, une affiche pour chaque film
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
