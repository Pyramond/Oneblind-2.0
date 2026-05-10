export default {
  hello: "Hello",
  "hello.world": "Hello world!",
  welcome: "Hello {name}!",

  common: {
    cancel: "Cancel",
    delete: "Delete",
    close: "Close",
    save: "Save",
    open: "Open",
    error: "Error",
    edit: "Edit",
  },

  aside: {
    home: "Home",
    players: "Players",
    tournaments: "Tournaments",
    blind: "Blind structure",
  },

  player: {
    title: "Players",

    playerList: {
      profileBtn: "Profile",

      sort: {
        points: "Points",
        creationDate: "Creation Date",
      },

      delete: {
        deleteBtn: "Delete",
        title: "Are you sure you want to delete {name} ?",
        description: "This action cannot be undone",
      },
    },

    create: {
      btnTitle: "Create player",
      dialogTitle: "Create player",
      textFieldLabel: "Name",
      textFieldPlaceholder: "Name",
      closeBtn: "Cancel",
      saveBtn: "Save",
    },
    profile: {
      playerDate: "Member since",
      history: "History",
    },
  },

  blinds: {
    title: "Blind structure",

    type: {
      game: "Game",
      pause: "Pause",
    },

    create: {
      btnTitle: "Create blind structure",
      dialogTitle: "Create blind structure",
      textFieldLabel: "Name",
      textFieldPlaceholder: "Name",
      createStepTitle: "Create new step",
      createStepTime: "Time (min)",
      createStepSmallBlind: "Small blind",
      createStepBigBlind: "Big blind",
      createStepType: "Type",
      createStepTypePause: "Pause",
      createStepTypeGame: "Game",
      createStepAddBtn: "Add",
      closeBtn: "Cancel",
      saveBtn: "Save",

      double: "Double big blind",

      errors: {
        title: "Error",
        name: "The blind structure name is empty",
        steps: "The structure must contain at least one step",
      },
    },

    card: {
      deleteBtn: "Delete",
      deleteTitle:
        "Are you sure you want to delete {structure} blind structure ?",
      deleteDescription: "This action cannot be undone.",
    },

    view: {
      table: {
        type: "Type",
        time: "Time (min)",
        smallBlind: "Small Blind",
        bigBlind: "Big Blind",
      },
    },
  },

  tournaments: {
    title: "Tournaments",

    create: {
      btnTitle: "Create tournament",
      dialogTitle: "Create tournament",

      name: "Name",
      blindStructure: "Blind structure",
      startingStack: "Starting stack",
      countPoints: "Count points",
      players: "Players",

      blindStructureErr: "You don't have a blind structure created yet",
      playerErr: "You haven't created a player yet",

      playerCountErr:
        "At least two players are required to create a tournament",
      initialStackErr: "The initial stack must be greater than zero",
    },

    edit: {
      dialogTitle: "Edit tournament",

      name: "Name",
      blindStructure: "Blind structure",
      startingStack: "Starting stack",
      countPoints: "Count points",
      players: "Players",

      blindStructureErr: "You don't have a blind structure created yet",
      playerErr: "You haven't created a player yet",

      playerCountErr:
        "At least two players are required to create a tournament",
      initialStackErr: "The initial stack must be greater than zero",
    },

    list: {
      ongoingOnly: "Ongoing",
      finishedOnly: "Finished",
      all: "All tournaments",
      sortNewest: "Newest",
      sortOldest: "Oldest",
    },

    dashboard: {
      cannotStart: {
        title: "Tournament not ready",
        description:
          "The tournament configuration is incomplete. Please check the blind structure and registered players.",
        btn: "Go back",
      },
      finished: {
        title: "Tournament finished",
        description:
          "This tournament is already finished and cannot be started.",
        btn: "Go back",
      },
    },

    runner: {
      players: "{count} players",
      eliminate: {
        btn: "Eliminate a player",
        title: "Eliminate a player",
        description: "Select the player to eliminate from the tournament.",
      },
      rebuy: "Rebuy",
      rebuys: "Rebuys",
    },

    card: {
      finished: "Completed",
      viewBtn: "View",
      blindStructure: "Blind structure",
      startingStack: "Starting stack",
      playerCount: "Players",
      countPoints: {
        yes: "Points counted",
        no: "Points not counted",
      },

      delete: {
        deleteTitle:
          "Are you sure you want to delete {tournament} tournament ?",
        deleteDescription: "This action cannot be undone.",
      },

      blindStructureNotFound: "Blind structure not found",
      blindStructureNotFoundTooltipContent:
        "The blind structure is missing or has been deleted. The tournament cannot be started.",
    },
  },

  settings: {
    title: "Settings",

    other: {
      title: "Others",

      language: {
        title: "Language",
        fr: "French",
        en: "English",
      },
    },

    firebase: {
      connected: "Connected to {name}",
      disconnected: "Not connected to Firebase",

      setup: {
        title: "Firebase not configured",
        description: "Enter your Firebase credentials to get started.",
        link: "Set up a Firebase project",
        apiKey: "API Key",
        projectId: "Project ID",
        connectBtn: "Connect",
        editBtn: "Edit",
        refreshBtn: "Refresh",

        update: {
          title: "Update Firebase configuration",
          description: "Enter your Firebase credentials",
        },
      },
    },

    appearance: {
      title: "Appearance",
      radius: {
        title: "Borders",

        type: {
          none: "None",
          small: "Small",
          medium: "Medium",
          large: "Large",
          full: "Full",
        },
      },
      color: {
        title: "Color Selection",
      },
      logoTheme: {
        title: "Logo Theme",

        type: {
          default: "Default",
          onePiece: "One Piece",
        },
      },
    },
  },
} as const;
