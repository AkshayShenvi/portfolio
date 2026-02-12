# Portfolio Website

A personal portfolio website built with React, TypeScript, and Vite. Designed for hosting on GitHub Pages.

## Features

- Responsive design
- Sections: About, Projects, Contact
- Built with modern web technologies

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment to GitHub Pages

### Option 1: Automatic Deployment with GitHub Actions (Recommended)

1. Create a new repository on GitHub named `portfolio` (or update the `base` in `vite.config.ts` if using a different name).

2. Push your code to the `main` branch of this repository.

3. Go to your repository settings on GitHub.

4. Navigate to "Pages" in the left sidebar.

5. Under "Source", select "GitHub Actions".

6. The workflow file (`.github/workflows/deploy.yml`) will automatically build and deploy your site.

7. Your site will be available at `https://yourusername.github.io/portfolio/`.

### Option 2: Manual Deployment

1. Create a new repository on GitHub named `portfolio`.

2. Push your code to the repository.

3. Run `npm run build` locally to generate the `dist` folder.

4. Install `gh-pages` package: `npm install --save-dev gh-pages`

5. Add to `package.json` scripts: `"deploy": "gh-pages -d dist"`

6. Run `npm run deploy` to push the `dist` folder to the `gh-pages` branch.

7. In repository settings > Pages, select "Deploy from a branch" and choose `gh-pages` branch with `/ (root)` folder.

8. Your site will be available at `https://yourusername.github.io/portfolio/`.

### Important Notes

- Make sure the repository name matches the `base` path in `vite.config.ts` (currently set to `/portfolio/`).
- If you change the repository name, update the `base` in `vite.config.ts` accordingly.
- The automatic deployment option is recommended as it rebuilds on every push to main.

## Technologies Used

- React
- TypeScript
- Vite
- CSS
  {
  files: ['**/*.{ts,tsx}'],
  extends: [
  // Other configs...

        // Remove tseslint.configs.recommended and replace with this
        tseslint.configs.recommendedTypeChecked,
        // Alternatively, use this for stricter rules
        tseslint.configs.strictTypeChecked,
        // Optionally, add this for stylistic rules
        tseslint.configs.stylisticTypeChecked,

        // Other configs...
      ],
      languageOptions: {
        parserOptions: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: import.meta.dirname,
        },
        // other options...
      },

  },
  ])

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````
