# Front - Restaurant Réservation

Application React/Vite consommant l'API Node/Express du projet.

## Installation

```bash
npm install
npm run dev
```

L'API doit être démarrée sur `http://localhost:3000`. En développement, Vite
redirige automatiquement les requêtes `/api` vers le back-end.

Pour utiliser une autre adresse, copiez `.env.example` vers `.env` puis
modifiez `VITE_API_URL`.

## Scripts

- `npm run dev` : démarrer le serveur de développement ;
- `npm run build` : créer la version de production ;
- `npm run lint` : vérifier la qualité du code ;
- `npm run preview` : prévisualiser la version de production.

## Structure

```text
src/
├── components/  Composants réutilisables et protection de route
├── context/     Gestion globale de l'authentification
├── pages/       Pages de l'application
├── services/    Appels centralisés vers l'API
└── styles/      Styles globaux
```

## Routes disponibles

- `/` : accueil ;
- `/menu` : menu public du restaurant ;
- `/signup` : création de compte ;
- `/login` : connexion ;
- `/profile` : profil protégé, accessible avec un token JWT ;
- `/my-reservations` : réservations du client connecté ;
- `/reservations/new` : création d'une réservation.
- `/reservations` : tableau des réservations réservé aux administrateurs ;
- `/unauthorized` : message affiché lorsque le rôle est insuffisant.

Le token est enregistré dans le `localStorage` sous la clé
`restaurant_token`. Le service API l'ajoute aux requêtes privées avec l'en-tête
`Authorization: Bearer <token>`.

## Images de la page d'accueil

Les visuels utilisés par la page d'accueil sont stockés dans `public/images/` :

- `restaurant-hero.png` : ambiance intérieure du restaurant ;
- `lf-logo.png` : logo officiel de La Fourchette ;
- `dish-main.png` : plat principal ;
- `dish-starter.png` : entrée de saison ;
- `dish-dessert.png` : dessert au chocolat.

Ces images ont été générées pour le projet et ne dépendent d'aucune URL externe.

## Répartition du travail

### Kevin

- [PRR-17](https://bluevalley-dev.atlassian.net/browse/PRR-17) — Mise en
  place de la structure du front React/Vite et du service commun pour les
  appels à l'API (Partie 1).
- [PRR-18](https://bluevalley-dev.atlassian.net/browse/PRR-18) — Création
  des pages d'inscription et de connexion reliées aux endpoints
  `POST /signup` et `POST /login` (Partie 1).
- [PRR-19](https://bluevalley-dev.atlassian.net/browse/PRR-19) — Gestion
  du token JWT côté client : stockage, persistance, envoi dans les requêtes
  privées et déconnexion (Partie 1).
- [PRR-26](https://bluevalley-dev.atlassian.net/browse/PRR-26) — Mise en
  place de React Router, des routes publiques et privées et de la protection
  des pages selon l'authentification et le rôle (Partie 2).

### Arthur

- [PRR-20](https://bluevalley-dev.atlassian.net/browse/PRR-20) — Affichage
  du menu du restaurant depuis l'API, avec regroupement des plats par
  catégorie (Partie 1).
- [PRR-21](https://bluevalley-dev.atlassian.net/browse/PRR-21) — Création
  de la page permettant au client connecté de consulter ses réservations
  (Partie 1).
- [PRR-22](https://bluevalley-dev.atlassian.net/browse/PRR-22) — Création
  du formulaire de réservation et ajout de l'annulation d'une réservation
  client (Partie 1).
- [PRR-27](https://bluevalley-dev.atlassian.net/browse/PRR-27) — Création
  de l'`AuthContext` pour centraliser l'utilisateur, son rôle, le token JWT,
  la connexion et la déconnexion (Partie 2).

### Adam

- [PRR-23](https://bluevalley-dev.atlassian.net/browse/PRR-23) — Création
  de l'espace administrateur affichant toutes les réservations du restaurant
  (Partie 1).
- [PRR-24](https://bluevalley-dev.atlassian.net/browse/PRR-24) — Ajout des
  actions permettant à l'administrateur de valider ou d'annuler une
  réservation (Partie 1).
- [PRR-28](https://bluevalley-dev.atlassian.net/browse/PRR-28) — Affichage
  dynamique des créneaux disponibles selon la date choisie lors de la
  création d'une réservation (Partie 2).
