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
    edit: "Modifier",
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

      sort: {
        points: "Nombre de points",
        creationDate: "Date d'inscription",
      },

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

    edit: {
      dialogTitle: "Modifier le tournoi",

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

    list: {
      ongoingOnly: "En cours",
      finishedOnly: "Terminés",
      all: "Tous les tournois",
      sortNewest: "Plus récents",
      sortOldest: "Plus anciens",
    },

    dashboard: {
      cannotStart: {
        title: "Tournoi non prêt",
        description:
          "La configuration du tournoi est incomplète. Veuillez vérifier la structure de blinds et les joueurs inscrits.",
        btn: "Retour",
      },
      finished: {
        title: "Tournoi terminé",
        description: "Ce tournoi est déjà terminé et ne peut plus être lancé.",
        btn: "Retour",
      },
    },

    card: {
      finished: "Terminé",
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

      blindStructureNotFound: "Structure des blinds inexistante",
      blindStructureNotFoundTooltipContent:
        "La structure des blinds est introuvable ou a été supprimée. Le tournoi ne peut pas être lancé.",
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

    firebase: {
      connected: "Connecté à {name}",
      disconnected: "Non connecté à Firebase",

      setup: {
        title: "Firebase non configuré",
        description: "Renseignez vos identifiants Firebase pour commencer.",
        link: "Configurer un projet Firebase",
        apiKey: "Clé API",
        projectId: "Identifiant du projet",
        connectBtn: "Connecter",
        editBtn: "Modifier",
        refreshBtn: "Actualiser",

        update: {
          title: "Modifier la configuration Firebase",
          description: "Renseignez vos identifiants Firebase.",
        },
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
