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
    version: "2.0.0",
    date: "2026-05-18",
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
      ],
    },
  },
];
