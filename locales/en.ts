export default {
  hello: "Hello",
  "hello.world": "Hello world!",
  welcome: "Hello {name}!",

  aside: {
    home: "Home",
    players: "Players",
    tournaments: "Tournaments",
    blind: "Blind structure",
  },

  player: {
    title: "Players",

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
  },

  settings: {
    colorSelectionTitle: "Color Selection",
  },
} as const;
