# Project template

[![npm version](https://img.shields.io/npm/v/capstone-project-template)](https://www.npmjs.com/package/capstone-project-template)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Prettier](https://img.shields.io/badge/Prettier-3.5.3-brightgreen.svg)](https://prettier.io)
[![Node.js v22.11.0](https://img.shields.io/badge/Node-v22.11.0-blue)](https://nodejs.org)

## Overview

This project is a template for an online learning platform. It offers a clean, accessible, and responsive front-end design to Best Shop with travel suits, articles, and other platform content. Built with SCSS and vanilla JavaScript, it includes modern tooling for faster development, code-quality enforcement, and live browser reloading.

---

## ✨ Features

✅ **Responsive Layout** — Three breakpoints: 1440 px / 1024 px / 768 px
🎨 **SCSS Architecture (7-1)** — Variables, mixins, and modular partials
🧩 **Modular Components** — Header, footer, scroll button, products sections
⚙️ **Dynamic Catalog** — JSON data, sorting, filtering, pagination
🛒 **Cart System** — Add / remove products with localStorage persistence
🚀 **Fetch Includes** — Header & footer automatically loaded via JS
🖼 **Interactive Product Cards** — Hover zoom and smooth shadow effects
💻 **Live Reload & SCSS Watcher** — Automatic rebuilds during development

---

## 🚀 Getting Started

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd capstone-project-template
   npm install
   ```

2. **Install Dependencies:**  
   The above `npm install` command will install all required packages.

---

## Running the Project

You have two options for previewing the project:

### Option 1: Manual Preview

1. Run the Sass watcher:

   ```bash
   npm run sass-watch
   ```

2. Manually open `src/index.html` in your browser to view the site.

### Option 2: Automatic Preview with Live Reload

```bash
npm run start
```

This script will:

- Compile SCSS files (in watch mode) into the `css` folder.
- Wait until `css/global.css` exists.
- Launch a local server using BrowserSync.
- Open the browser at [http://localhost:3000/src/index.html](http://localhost:3000/src/index.html).
- Auto-reload on changes to HTML, CSS, JS, or image files.

---

## Available Scripts

| Script                 | Description                                                                  |
| ---------------------- | ---------------------------------------------------------------------------- |
| `npm run start`        | Runs the Sass watcher & launches BrowserSync to serve from the project root. |
| `npm run sass-watch`   | Compiles SCSS to CSS in watch mode.                                          |
| `npm run sass:build`   | Compiles SCSS to minified CSS for production.                                |
| `npm run build`        | Alias for `npm run sass:build`.                                              |
| `npm run lint:js`      | Lints JavaScript with ESLint.                                                |
| `npm run lint:css`     | Lints SCSS/CSS with Stylelint.                                               |
| `npm run lint`         | Runs both JavaScript & SCSS/CSS linters.                                     |
| `npm run lint:fix:js`  | Automatically fixes some JavaScript linting errors.                          |
| `npm run lint:fix:css` | Automatically fixes some SCSS/CSS linting errors.                            |
| `npm run lint:fix`     | Runs both `lint:fix:js` & `lint:fix:css`.                                    |
| `npm run format`       | Formats code with Prettier.                                                  |

---

## Project Structure
.
├── src/
│   ├── index.html
│   ├── pages/
│   │   ├── about.html
│   │   ├── catalog.html
│   │   ├── contact.html
│   │   └── product-details-template.html
│   ├── components/
│   │   ├── header.html
│   │   ├── footer.html
│   │   └── scroll-button.html
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   ├── fonts/
│   │   └── data.json
│   └── js/
│       ├── main.js
│       ├── layout.js
│       ├── cart.js
│       ├── scroll-button.js
│       ├── catalog.js
│       └── utils/
│
├── dist/
│   └── css/main.css
│
├── scss/
│   ├── abstracts/     # variables, mixins
│   ├── base/          # resets, typography
│   ├── components/    # buttons, cards
│   ├── layout/        # header, footer, grid
│   ├── pages/         # page-specific styles
│   ├── vendors/       # external libraries
│   └── main.scss
│
├── eslint.config.js
├── stylelint.config.js
└── package.json

---

## Tooling

- **sass**: Compiles SCSS to CSS.
- **browser-sync**: Serves files & auto-reloads the browser.
- **wait-on**: Waits for specific files (e.g., `css/global.css`) to exist before launching the server.
- **eslint**: JavaScript linting.
- **stylelint**: SCSS/CSS linting.
- **prettier**: Code formatting.
- **npm-run-all**: Runs multiple scripts in parallel or in sequence (cross-platform).

---

## Notes

- **Node.js:** Ensure Node.js is installed (v18+ recommended or use the version in the badge above).
- **Running the Project:**
  - Option 1: `npm run sass-watch` & manually open `src/index.html`.
  - Option 2: `npm run start` for an automated workflow with BrowserSync.
- **Asset Paths:** Since the project is served from the root, use relative paths in your HTML (e.g., `../css/global.css`).

---

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
