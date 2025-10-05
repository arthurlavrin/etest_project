# Best Shop - Travel Suitcase E-Commerce

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js v18+](https://img.shields.io/badge/Node-v18+-blue)](https://nodejs.org)

## 📖 Overview

**Best Shop** is a fully responsive, multi-page e-commerce website for travel suitcases and luggage. Built with **vanilla JavaScript**, **SCSS (7-1 architecture)**, and modern web development best practices, this project features dynamic catalog filtering, shopping cart functionality with localStorage persistence, product search, sorting, pagination, and real-time form validation.

---

## ✨ Key Features

- ✅ **Fully Responsive Design** — Breakpoints: 768px, 1024px, 1440px
- 🎨 **SCSS Architecture (7-1 Pattern)** — Organized variables, mixins, and modular partials
- 🛒 **Shopping Cart System** — Add, update, remove items with localStorage persistence
- 🔍 **Advanced Catalog** — Filtering, sorting, search, and pagination
- 📦 **Dynamic Product Loading** — Data loaded from JSON file
- 🖼️ **Interactive UI** — Image sliders, hover effects, modals, and animations
- 📱 **Mobile-Friendly** — Hamburger menu, touch-optimized controls
- 🧩 **Modular Components** — Header, footer, product cards loaded dynamically
- ✅ **Real-Time Form Validation** — Instant feedback on contact form
- 🚀 **Code Quality Tools** — ESLint & Stylelint for clean, maintainable code

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher) — [Download here](https://nodejs.org)
- **npm** (comes with Node.js)

### Installation

1. **Clone or Download the Repository:**

   ```bash
   git clone <repository-url>
   cd project-template-ua
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

   This command installs all required packages including:

   - **Sass** — CSS preprocessor for SCSS compilation
   - **ESLint** — JavaScript linter
   - **Stylelint** — SCSS/CSS linter

3. **Compile SCSS to CSS:**

   Before running the project, you need to compile the SCSS files into CSS:

   ```bash
   npm run sass-compile
   ```

   This creates the compiled CSS files in the `dist/css/` folder.

---

## 🖥️ Running the Project

### Option 1: Live Server (Recommended for Development)

If you're using **VS Code**, install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer):

1. **Start SCSS Watcher (for automatic CSS compilation):**

   ```bash
   npm run sass-watch
   ```

   _Keep this terminal open. It will watch for changes to SCSS files and automatically recompile them._

2. **Launch Live Server:**

   - Right-click on `index.html` (in the root folder) in VS Code
   - Select **"Open with Live Server"**
   - Your browser will open at `http://127.0.0.1:5500/` and automatically redirect to the homepage

3. **Start Coding:**
   - Edit HTML, SCSS, or JavaScript files
   - Changes to SCSS will auto-compile (thanks to `sass-watch`)
   - Live Server will auto-reload the browser when files change

### Option 2: Manual Preview

1. **Compile SCSS:**

   ```bash
   npm run sass-compile
   ```

2. **Open in Browser:**
   - Navigate to the project folder
   - Open `index.html` in your browser
   - You will be automatically redirected to `src/index.html`

---

## 📜 Available Scripts

| Script                 | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `npm run sass-compile` | Compiles all SCSS files to CSS (one-time compilation)          |
| `npm run sass-watch`   | Watches SCSS files and recompiles automatically on changes     |
| `npm run lint:js`      | Lints JavaScript files with ESLint                             |
| `npm run lint:css`     | Lints SCSS/CSS files with Stylelint                            |
| `npm run lint`         | Runs both JavaScript and CSS linters                           |
| `npm run lint:fix:js`  | Automatically fixes JavaScript linting errors (where possible) |
| `npm run lint:fix:css` | Automatically fixes SCSS/CSS linting errors (where possible)   |
| `npm run lint:fix`     | Automatically fixes all linting errors (JavaScript + CSS)      |

---

## 📁 Project Structure

```
project-template-ua/
│
├── index.html                     # Root redirect to src/index.html
├── package.json                   # Project metadata and scripts
├── eslint.config.js               # ESLint configuration
├── stylelint.config.js            # Stylelint configuration
│
├── src/
│   ├── index.html                 # Homepage
│   │
│   ├── pages/
│   │   ├── about.html             # About Us page
│   │   ├── catalog.html           # Product Catalog page
│   │   ├── contact.html           # Contact Us page
│   │   ├── cart.html              # Shopping Cart page
│   │   └── product-details-template.html  # Product Details page
│   │
│   ├── components/
│   │   ├── header.html            # Header component (loaded dynamically)
│   │   ├── footer.html            # Footer component (loaded dynamically)
│   │   ├── auth-modal.html        # Login modal component
│   │   └── product-card.html      # Reusable product card template
│   │
│   ├── assets/
│   │   ├── data.json              # Product data (JSON)
│   │   └── images/                # All images organized by page/component
│   │
│   ├── js/
│   │   ├── main.js                # Main JavaScript entry point
│   │   ├── layout.js              # Loads header, footer dynamically
│   │   ├── cart.js                # Cart page functionality
│   │   ├── cart-handler.js        # Cart counter and navigation
│   │   ├── catalog-page.js        # Catalog filtering logic
│   │   ├── products-section.js    # Product rendering, search, sort, pagination
│   │   ├── product-details.js     # Product details page logic
│   │   ├── products-overview.js   # Homepage product sections
│   │   ├── contact.js             # Contact form validation
│   │   ├── auth-modal.js          # Login modal functionality
│   │   ├── hamburger-menu.js      # Mobile menu toggle
│   │   └── scroll-button.js       # Scroll-to-top button
│   │
│   └── scss/
│       ├── abstracts/
│       │   ├── _variables.scss    # Color, font, breakpoint variables
│       │   └── _mixins.scss       # Reusable SCSS mixins
│       ├── base/
│       │   ├── _reset.scss        # CSS reset
│       │   └── _fonts.scss        # Font declarations
│       ├── components/
│       │   ├── _buttons.scss      # Button styles
│       │   ├── _forms.scss        # Form input styles
│       │   ├── _product-card.scss # Product card component
│       │   ├── _products-section.scss  # Product section styles
│       │   └── _auth-modal.scss   # Login modal styles
│       ├── layouts/
│       │   ├── header.scss        # Header layout
│       │   └── footer.scss        # Footer layout
│       ├── pages/
│       │   ├── _catalog.scss      # Catalog page styles
│       │   ├── _product-details.scss  # Product details page styles
│       │   ├── _cart.scss         # Cart page styles
│       │   ├── _about.scss        # About Us page styles
│       │   └── _contact.scss      # Contact page styles
│       └── main.scss              # Main SCSS file (imports all partials)
│
└── dist/
    └── css/
        ├── main.css               # Compiled CSS from main.scss
        ├── main.css.map           # Source map for debugging
        └── layouts/               # Compiled header/footer CSS
```

---

## 🛠️ Technologies Used

- **HTML5** — Semantic markup
- **SCSS/CSS3** — Styling with Sass preprocessor
- **JavaScript (ES6+)** — Vanilla JavaScript (no frameworks)
- **LocalStorage API** — Cart persistence
- **JSON** — Product data storage
- **ESLint** — JavaScript code quality
- **Stylelint** — SCSS/CSS code quality
- **Sass** — CSS preprocessing
- **Live Server** — Development server with live reload

---

## 🌟 Main Features

### 1. Homepage

- Interactive image slider with hover effects
- Featured products carousel
- New arrivals section loaded from JSON
- "Add to Cart" functionality with instant cart counter update

### 2. Catalog Page

- **Expandable Filters** — Filter by category, color, size, sales status
- **Sorting** — Sort by price, popularity, rating
- **Search** — Real-time product search
- **Pagination** — 12 products per page with dynamic navigation
- **"Product Not Found" Modal** — Displayed when search yields no results

### 3. Product Details Page

- Dynamic product loading from JSON
- Image gallery with thumbnails
- Quantity selector (+/- buttons)
- "Add to Cart" functionality
- Product tabs (Details, Reviews)
- Review submission form with validation
- "You May Also Like" section (4 random products)

### 4. Shopping Cart Page

- Add, update, remove products
- Automatic price calculations
- 10% discount when total exceeds $3,000
- LocalStorage persistence (cart survives page refresh)
- "Checkout" and "Clear Cart" functionality

### 5. Contact Page

- Real-time form validation
- Email format validation with RegEx
- Required field checks
- Success/error messages without page reload

### 6. About Us Page

- Company information
- Team member profiles
- "See All Models" link to catalog

---

## 🧪 Code Quality

This project uses **ESLint** and **Stylelint** to maintain code quality:

### Run Linters

```bash
# Check JavaScript
npm run lint:js

# Check SCSS/CSS
npm run lint:css

# Check both
npm run lint
```

### Auto-Fix Issues

```bash
# Fix JavaScript
npm run lint:fix:js

# Fix SCSS/CSS
npm run lint:fix:css

# Fix both
npm run lint:fix
```

---

## 📱 Responsive Design

The website is fully responsive with three main breakpoints:

- **Mobile:** < 768px
- **Tablet:** 768px - 1023px
- **Desktop:** 1024px+

All layouts adapt seamlessly, including:

- Hamburger menu for mobile
- Flexible grid layouts
- Touch-optimized controls
- Readable typography at all sizes

---

## 🎨 Design

This project follows the design from a Figma template, ensuring:

- Consistent typography and spacing
- Professional color scheme
- Modern UI/UX patterns
- Accessible navigation

---

## 📝 Notes

- **Asset Paths:** All paths in HTML/CSS are relative and designed to work with the project structure.
- **LocalStorage:** Cart data is stored in the browser's localStorage and persists across sessions.
- **Cross-Browser:** Tested on Chrome and Firefox.
- **No Frameworks:** This project intentionally avoids JavaScript frameworks (React, Vue, Angular) and CSS frameworks (Bootstrap, Tailwind) to demonstrate fundamental web development skills.

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

## 🤝 Contributing

This is an educational project. Feel free to fork, modify, and learn from it!

---

## 📞 Support

For questions or issues, please refer to the project requirements in `REQUIREMENTS.md` or open an issue in the repository.

---

**Happy Coding! 🚀**
