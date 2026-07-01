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

Le token est enregistré dans le `localStorage` sous la clé
`restaurant_token`. Le service API l'ajoute aux requêtes privées avec l'en-tête
`Authorization: Bearer <token>`.
