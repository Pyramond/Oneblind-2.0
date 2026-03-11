export default {
  hello: "Hello",
  "hello.world": "Hello world!",
  welcome: "Hello {name}!",

  common: {
    cancel: "Cancel",
    delete: "Delete",
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
      deleteBtn: "Delete",
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
    },

    card: {
      deleteBtn: "Delete",
      deleteTitle: "Are you sure you want to delete this blind structure?",
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

  settings: {
    title: "Settings",

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
