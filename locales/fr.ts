export default {
  hello: "Bonjour",
  "hello.world": "Hello world!",
  welcome: "Hello {name}!",

  common: {
    cancel: "Annuler",
    delete: "Supprimer",
  },

  aside: {
    home: "Accueil",
    players: "Joueurs",
    tournaments: "Tournois",
    blind: "Structure des blinds",
  },

  player: {
    title: "Joueurs",

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
    },
    card: {
      deleteBtn: "Supprimer",
      deleteTitle:
        "Êtes-vous sûr de vouloir supprimer cette structure des blinds ?",
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

  settings: {
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
    },
  },
} as const;
