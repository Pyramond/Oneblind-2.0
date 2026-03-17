export default {
  hello: "Bonjour",
  "hello.world": "Hello world!",
  welcome: "Hello {name}!",

  common: {
    cancel: "Annuler",
    delete: "Supprimer",
    close: "Fermer",
    save: "Sauvegarder",
    open: "Ouvrir",
    error: "Erreur",
  },

  aside: {
    home: "Accueil",
    players: "Joueurs",
    tournaments: "Tournois",
    blind: "Structure des blinds",
  },

  player: {
    title: "Joueurs",

    playerList: {
      profileBtn: "Profil",

      delete: {
        deleteBtn: "Supprimer",
        title: "Êtes-vous sûr de vouloir supprimer {name} ?",
        description: "Cette action ne peut pas être annulée.",
      },
    },

    create: {
      btnTitle: "Créer un joueur",
      dialogTitle: "Créer un joueur",
      textFieldLabel: "Nom",
      textFieldPlaceholder: "Nom",
      closeBtn: "Annuler",
      saveBtn: "Sauvegarder",
    },
    profile: {
      playerDate: "Membre depuis le",
      history: "Historique",
    },
  },

  blinds: {
    title: "Structure des blinds",

    type: {
      game: "Jeu",
      pause: "Pause",
    },

    create: {
      btnTitle: "Créer une structure des blinds",
      dialogTitle: "Créer une structure des blinds",
      textFieldLabel: "Nom",
      textFieldPlaceholder: "Nom",
      createStepTitle: "Créer une étape",
      createStepTime: "Temps (min)",
      createStepSmallBlind: "Petite blind",
      createStepBigBlind: "Grosse blind",
      createStepType: "Type",
      createStepTypePause: "Pause",
      createStepTypeGame: "Jeu",
      createStepAddBtn: "Ajouter",
      closeBtn: "Annuler",
      saveBtn: "Sauvegarder",

      double: "Doubler la grosse blind",

      errors: {
        title: "Erreur",
        name: "Le nom de la structure des blinds est vide",
        steps: "La structure doit contenir au moins une étape",
      },
    },
    card: {
      deleteBtn: "Supprimer",
      deleteTitle:
        "Êtes-vous sûr de vouloir supprimer la structure des blinds {structure} ?",
      deleteDescription: "Cette action ne peut pas être annulée.",
    },

    view: {
      table: {
        type: "Type",
        time: "Temps (min)",
        smallBlind: "Petite Blind",
        bigBlind: "Grosse Blind",
      },
    },
  },

  tournaments: {
    title: "Tournois",

    create: {
      btnTitle: "Créer un tournoi",
      dialogTitle: "Créer un tournoi",

      name: "Nom",
      blindStructure: "Structure des blinds",
      startingStack: "Tapis de départ",
      countPoints: "Compter les points",
      players: "Joueurs",

      blindStructureErr: "Vous n'avez pas encore de structure de blind créée.",
      playerErr: "Vous n'avez pas encore créé de joueur.",
      playerCountErr: "Au moins deux joueurs sont requis pour créer un tournoi",
      initialStackErr: "Le tapis de départ doit être supérieur à zéro",
    },

    card: {
      viewBtn: "Voir",
      blindStructure: "Structure des blinds",
      startingStack: "Tapis de départ",
      playerCount: "Joueurs",
      countPoints: {
        yes: "Points comptés",
        no: "Points non comptés",
      },

      delete: {
        deleteTitle:
          "Êtes-vous sûr de vouloir supprimer le tournoi {tournament} ?",
        deleteDescription: "Cette action ne peut pas être annulée.",
      },
    },
  },

  settings: {
    title: "Paramètres",

    other: {
      title: "Autres",

      language: {
        title: "Langue",
        fr: "Français",
        en: "Anglais",
      },
    },

    appearance: {
      title: "Apparence",
      radius: {
        title: "Bordures",

        type: {
          none: "Aucune",
          small: "Petite",
          medium: "Moyennes",
          large: "Larges",
          full: "Completes",
        },
      },
      color: {
        title: "Selection de la couleur",
      },
      logoTheme: {
        title: "Theme du logo",

        type: {
          default: "Par défaut",
          onePiece: "One Piece",
        },
      },
    },
  },
} as const;
