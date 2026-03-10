# Carbon React v11 TypeScript Template

A minimal, production-ready starter template for building applications with [Carbon Design System v11](https://react.carbondesignsystem.com/) and [React 19](https://react.dev/), powered by [Vite](https://vitejs.dev/) and [TypeScript](https://www.typescriptlang.org/).

> Click **"Use this template"** on GitHub to scaffold your own Carbon-based project instantly.

---

## Features

- **React 19** with Strict Mode enabled
- **Carbon Design System v11** (`@carbon/react` + `@carbon/icons-react`)
- **Vite 6** for lightning-fast dev server and optimised production builds
- **TypeScript 5** with strict configuration
- **SCSS** with Carbon's modern-compiler API and IBM Plex Sans font
- Carbon `g100` (dark) theme applied as default

---

## Project Structure

```
carbon-react-template-v11/
├── public/                 # Static assets (favicon, manifest, robots.txt)
├── src/
│   ├── App.tsx             # Root application component
│   ├── Header.tsx          # Carbon UI Shell header component
│   ├── index.scss          # Global styles & Carbon SCSS entry point
│   ├── main.tsx            # React DOM entry point
│   └── vite-env.d.ts       # Vite environment type declarations
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript base config
├── tsconfig.app.json       # TypeScript app config
└── tsconfig.node.json      # TypeScript Node config
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later (comes with Node.js)

### Installation

```bash
# 1. Clone or use this template
git clone https://github.com/your-username/carbon-react-template-v11.git
cd carbon-react-template-v11

# 2. Install dependencies
npm install
```

---

## Available Scripts

### `npm run dev`

Starts the Vite development server with Hot Module Replacement (HMR).  
Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

### `npm run build`

Type-checks the project with `tsc` and then builds the app for production into the `dist/` folder.  
The output is minified and optimised for best performance.

### `npm run preview`

Serves the production build locally so you can verify the output before deploying.
Open [http://localhost:4173](http://localhost:4173) to preview the built app.

### `npm run deploy`

Builds the app (`predeploy` runs `npm run build` automatically) and publishes the `dist/` folder to the `gh-pages` branch of your repository.
See [GitHub Pages deployment](#-deploying-to-github-pages) below for setup instructions.

---

## Deploying to GitHub Pages

1. **Set the `homepage` field** in [`package.json`](package.json) to your IBM GitHub Pages URL:

   ```json
   "homepage": "https://pages.github.ibm.com/<your-org>/<your-repo-name>"
   ```

2. **Set the Vite `base` option** in [`vite.config.ts`](vite.config.ts) to match your repository name so assets resolve correctly:

   ```ts
   export default defineConfig({
     base: '/<your-repo-name>/',
     // ...
   });
   ```

3. **Run the deploy script:**

   ```bash
   npm run deploy
   ```

   This will:
   - Run `npm run build` (type-check + Vite production build → `dist/`)
   - Push the `dist/` folder to the `gh-pages` branch via `gh-pages`

4. In your GitHub repository, go to **Settings → Pages** and confirm the source is set to the `gh-pages` branch.

Your app will be live at the URL set in `homepage`.

---

## Styling

Global styles and Carbon's SCSS are imported in [`src/index.scss`](src/index.scss):

```scss
@use "@carbon/react";
@use "@carbon/react/scss/theme" as *;
```

The Vite config enables Carbon's **modern-compiler** SCSS API to suppress deprecation warnings from Sass:

```ts
// vite.config.ts
css: {
  preprocessorOptions: {
    scss: {
      api: 'modern-compiler',
    },
  },
},
```

The `<Theme>` component wraps the entire application in [`src/App.tsx`](src/App.tsx) to apply a consistent Carbon theme globally:

```tsx
import { Theme } from '@carbon/react';

const App = () => (
  <Theme theme="g100"> {/* white | g10 | g90 | g100 */}
    <div className="container">
      {/* your app content */}
    </div>
  </Theme>
);
```

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.0.0 | UI library |
| `react-dom` | ^19.0.0 | React DOM renderer |
| `@carbon/react` | ^1.73.0 | Carbon Design System components |
| `@carbon/icons-react` | ^11.56.1 | Carbon icon library |

### Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^6.1.0 | Build tool & dev server |
| `@vitejs/plugin-react` | ^4.3.4 | React Fast Refresh for Vite |
| `typescript` | ^5.7.2 | Static type checking |
| `sass` | ^1.85.0 | SCSS preprocessor |
| `gh-pages` | ^6.3.0 | GitHub Pages deployment |
| `@types/react` | ^19.0.0 | React type definitions |
| `@types/react-dom` | ^19.0.0 | React DOM type definitions |

---

## Useful Links

- [Carbon Design System](https://carbondesignsystem.com/)
- [Carbon React Components](https://react.carbondesignsystem.com/)
- [Carbon Icons](https://carbondesignsystem.com/elements/icons/library/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

## License

MIT © [Jagath Jayakumar](https://github.ibm.com/Jagath-Jayakumar)
