# Backend ProxiTalent

## Description

Ce projet est le backend de l'application ProxiTalent. Il est développé en TypeScript avec Express et utilise MongoDB comme base de données. Le backend gère l'authentification, la gestion des utilisateurs, des prestataires, des entreprises, et des offres d'emploi.

## Installation

1. Cloner le dépôt :
```bash
git clone <url-du-repo>
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer un fichier `.env` à la racine du projet avec les variables d'environnement suivantes :

```
PORT=3000
MONGO_URI=<votre_uri_mongodb>
EMAIL_HOST=<hôte_smtp>
EMAIL_PORT=<port_smtp>
EMAIL_USER=<utilisateur_smtp>
EMAIL_PASS=<mot_de_passe_smtp>
```

## Lancement

- En mode développement (avec rechargement automatique) :
```bash
npm run dev
```

- En mode production (après compilation TypeScript) :
```bash
npm run build
npm start
```

Le serveur sera accessible sur le port défini dans la variable d'environnement `PORT`.

## Routes principales

- `/api/auth` : gestion de l'authentification (inscription, connexion, réinitialisation de mot de passe, etc.)
- `/api/utilisateur` : gestion des utilisateurs
- `/api/prestataires` : gestion des prestataires
- `/api/entreprises` : gestion des entreprises
- `/api/offres` : gestion des offres d'emploi

## Technologies utilisées

- Node.js avec Express
- TypeScript
- MongoDB avec Mongoose
- JWT pour l'authentification
- bcryptjs pour le hachage des mots de passe
- Multer pour la gestion des fichiers uploadés
- Nodemailer pour l'envoi d'emails
- dotenv pour la gestion des variables d'environnement
- CORS pour la gestion des accès cross-origin

## Structure du projet

- `src/controllers` : gestion des requêtes et réponses
- `src/routes` : définition des routes API
- `src/services` : logique métier
- `src/middlewares` : middlewares Express
- `src/models` : modèles Mongoose
- `src/config` : configuration base de données et email
- `src/utils` : utilitaires divers

