# Oneblind 2.0

**Oneblind** is a poker tournament management application designed for desktop use. It lets you manage players, define blind structures, and run tournaments with a built-in timer — all synced in real time through your own Firebase project.

Live app: [www.oneblind.app](https://www.oneblind.app)

---

## Features

- **Players** — Create and manage players, track their tournament history and points.
- **Blind structures** — Define custom blind levels, antes, and durations.
- **Tournaments** — Configure tournaments with a starting stack, player list, and blind structure. Run them with a live timer that auto-advances through levels.
- **Rankings** — Automatically computed standings when a tournament ends.
- **Appearance** — Choose your accent color, border radius, and logo theme.
- **Multilingual** — English and French supported.

---

## Tech stack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Radix UI Themes](https://www.radix-ui.com/themes)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)

---

## Firebase setup

Oneblind stores all its data in a Firestore database. You need to create your own Firebase project and connect it in the app settings.

### 1. Create a Firebase project

Go to [https://console.firebase.google.com](https://console.firebase.google.com) and click **Add project**.

---

### 2. Enable Firestore

In your project's left sidebar, go to **Database > Firestore**, then click **Create database**.

![Firebase — enable Firestore](docs/screenshots/01_enable_firestore.png)

When prompted:

- **Edition** — select **Standard**
- **Server location** — choose the region closest to your users
- **Security rules** — select **Production mode**

---

### 3. Update Firestore security rules

Once Firestore is created, go to the **Rules** tab and replace the default rules with the following:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```

Click **Publish**.

![Firebase — Firestore rules](docs/screenshots/02_firestore_rules.png)

> These rules allow open read/write access. Since the app runs entirely client-side with no authentication, this is intentional — only share your Firebase credentials with people you trust.

---

### 4. Register a web app

In your Firebase project, go to **Project settings** then the **General** tab. Scroll down to **Your apps** and click the **Web** icon (`</>`).

![Firebase — register web app](docs/screenshots/03_register_web_app.png)

Give your app a name and click **Register app**. Firebase will display a configuration snippet like this:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:..."
};
```

Copy the **`apiKey`** and **`projectId`** values — you will need them in the next step.

> These values are always available later under **Project settings > General > Your apps**.

---

## Local development

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.