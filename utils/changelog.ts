export interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    fr: string[];
    en: string[];
  };
}

export const changelog: ChangelogEntry[] = [
  {
    version: "2.1.0",
    date: "2026-05-28",
    changes: {
      fr: [
        "Page d'accueil : affichage du top 3 des joueurs par points",
        "Page d'accueil : affichage des 3 derniers tournois avec statut et date",
        "Thème de logo 'OG'",
      ],
      en: [
        "Home page: display top 3 players by points",
        "Home page: display last 3 tournaments with status and date",
        "'OG' logo theme",
      ],
    },
  },
  {
    version: "2.0.0",
    date: "2026-05-26",
    changes: {
      fr: [
        "Intégration Firebase (connexion via clé API)",
        "Sélection de la langue (FR / EN)",
        "Sélection de la couleur et du rayon de bordure",
        "Thème du logo (défaut / One Piece)",
        "Gestion des joueurs et de l'historique de tournois",
        "Création et gestion des structures de blinds",
        "Création et gestion des tournois",
        "Runner de tournoi avec timer, éliminations et recaves",
        "Calcul automatique des points à la fin d'un tournoi",
        "Affichage des points gagnés dans l'historique des joueurs",
        "Journalisation des requêtes Firebase",
        "Page des logs avec aperçu dans les réglages",
        "Alerte sonore quand il reste 10 secondes à une étape",
        "Paramètre de son d'alerte avec mode silencieux",
      ],
      en: [
        "Firebase integration (connection via API key)",
        "Language selection (FR / EN)",
        "Color and border radius selection",
        "Logo theme (default / One Piece)",
        "Player management and tournament history",
        "Blind structure creation and management",
        "Tournament creation and management",
        "Tournament runner with timer, eliminations and rebuys",
        "Automatic points calculation at tournament end",
        "Display earned points in player history",
        "Firebase request logging",
        "Logs page with preview in settings",
        "Sound alert when 10 seconds remain in a tournament step",
        "Alert sound setting with silent mode",
      ],
    },
  },
];
