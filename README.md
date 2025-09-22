# Scriptum Frontend

Application frontend de la plateforme d'écriture Scriptum développée avec Next.js et TypeScript.

## 🚀 Installation

1. **Installer les dépendances**
```bash
yarn install
```

2. **Configuration des variables d'environnement**
Créer un fichier `.env.local` à la racine :
```plaintext
NEXT_PUBLIC_API_URL= URL de l'API backend
```

3. **Lancer le serveur de développement**
```bash
yarn dev
```

## 🛠 Technologies

- Next.js 15.4.5
- React 19.1.0
- TypeScript
- Redux Toolkit
- Ant Design
- Font Awesome

## 📁 Structure du projet

```
frontend/
├── components/      # Composants réutilisables
├── pages/          # Pages de l'application
├── public/         # Fichiers statiques
├── styles/         # Styles CSS
├── types/          # Types TypeScript
└── redux/          # Configuration Redux
```

## 📜 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `yarn dev` | Lance le serveur de développement sur http://localhost:3000 |
| `yarn build` | Crée une version optimisée pour la production |
| `yarn start` | Démarre l'application en mode production |
| `yarn lint` | Vérifie le code avec ESLint |

## 🔧 Fonctionnalités principales

- Inscription, connexion et gestion utilisateur
- Création et gestion de livres (livre, chapitre)
- Système de tags et genres
- Gestion des avertissements de contenu
- Création et gestion de l'univers des livres (personnages, lieux, créatures)
- Upload d'images via Cloudinary
- Gestion des favoris et des suivis d'auteurs
- Recherche des livres à partir de critères
- Interface responsive avec Ant Design

## 📦 Dépendances principales

- @reduxjs/toolkit : Gestion de l'état global
- antd : Bibliothèque de composants UI
- @fortawesome : Icônes
- typescript : Support du typage statique

## 🌐 Variables d'environnement

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_API_URL | URL de l'API backend |
