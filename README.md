# Personal Website with Angular, Tailwind and PrimeNG

![License: MIT](https://img.shields.io/badge/license-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Angular](https://img.shields.io/badge/Angular-19.2.6-red)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.4-blueviolet)
![PrimeNG](https://img.shields.io/badge/PrimeNG-19.0.10-orange)

---

## Features ✨

- **Angular 19**: Latest version for building modern web applications
- **TailwindCSS v4**: Utility-first CSS framework for rapid UI development
- **PrimeNG**: Feature-rich UI component library
- **i18n**: Built-in internationalization (English & German) with ngx-translate
- **ESLint & Prettier**: Code linting and formatting for consistent code style
- **Semantic Release**: Automated versioning and release management
- **GitHub Actions**: CI workflows for automated testing and deployment
- **Karma & Jasmine**: Testing setup for unit testing
- **Playwright E2E Testing**: Easy integration with end-to-end testing via schematics
- **Husky**: Git hooks for code quality enforcement
- **NgxSpinner**: Loading indicators for HTTP requests
- **Docker**: Containerized builds for deployment

---

## E2E Testing with Playwright 🎭

This project supports easy integration with Playwright for end-to-end testing:

```bash
ng add playwright-ng-schematics
```

This adds Playwright configuration and example tests to your project. To run the tests:

```bash
npx playwright test
```

Learn more at [playwright-ng-schematics](https://github.com/playwright-community/playwright-ng-schematics).

---

## Getting Started 🛠️

### Prerequisites

- [Node.js](https://nodejs.org/) (v22.x or higher)
- npm (latest version)
- [Docker](https://www.docker.com/) (optional, for containerized builds)

### Installation

**Clone the repository**:

```bash
git clone https://github.com/DavidHuhmann/personal-website.git
cd personal-website
```

**Install dependencies**:

```bash
npm install
```

### Development Server

To start the development server, run:

```bash
npm start
```

The application will be available at [http://localhost:4200/](http://localhost:4200/) and will automatically reload when you change any source files.

### Building the Project

To build the project for production:

```bash
npm run build
```

This will create a production build in the `dist` directory.

### Running Tests

To execute unit tests via Karma:

```bash
npm test
```

### Linting the Code

To lint your code:

```bash
npm run lint
```

---

## Docker Support 🐳

You can build and run the Angular app in a Docker container.

**Build and run:**

```bash
docker build -t personal-website .
docker run -p 8080:80 personal-website
```

Make sure to provide an `nginx.conf` if you need custom routing support.

---

## Project Structure 📁

- **public/i18n/**: Translation files (`en.json`, `de.json`)
- **src/app/**: Application source code
  - **core/**: Core functionality
  - **features/**: Feature modules for modular development
  - **shared/**: Shared styling and utilities

---

## Internationalization 🌐

This project uses [ngx-translate](https://github.com/ngx-translate/core) for i18n. Translation files are located in:

- `public/i18n/en.json` - English
- `public/i18n/de.json` - German

Default language and supported languages are configured in [`src/environments/environment.ts`](src/environments/environment.ts).

Usage in templates:

```html
{{ 'app.core.header.links.home' | translate }}
```

```typescript
imports: [TranslatePipe];
```

The language switcher component allows users to change languages dynamically.

---

## Styling 🎨

- **TailwindCSS**: Utility classes in [`src/styles.css`](src/styles.css)
- **PrimeNG**: Theming and UI components, with a custom color preset in [`src/app/shared/styling/color.preset.ts`](src/app/shared/styling/color.preset.ts)
- **Custom Styles**: Component-specific styles using CSS files

---

## Git Hooks with Husky 🐶

This project enforces code quality using Husky:

- **Commit Message Format**: Enforces [Conventional Commits](https://www.conventionalcommits.org/) format
  ```
  <type>(<scope>): <description>
  ```
  Valid types: feat, fix, chore, docs, test, style, refactor, perf, build, ci, revert

---

## Scripts 📜

- **`start`**: Starts the development server
  `npm start`
- **`build`**: Builds the project for production
  `npm run build`
- **`watch`**: Rebuilds the project on file changes
  `npm run watch`
- **`test`**: Runs unit tests
  `npm test`
- **`lint`**: Lints the project files using ESLint
  `npm run lint`
- **`prepare`**: Prepares Husky hooks
  `npm run prepare`

---

## Workflows ⚙️

- **CI**: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)
  Runs tests and linting on every push and pull request to ensure code quality.
- **Create Release**: [`.github/workflows/create-release.yml`](.github/workflows/create-release.yml)
  Uses [semantic-release](https://semantic-release.gitbook.io/) for automated versioning and changelog generation on pushes to `production`.

---

## HTTP Interceptors 🌐

The template includes an HTTP interceptor that:

- Shows a loading spinner during HTTP requests
- Handles error responses
- Provides a centralized way to modify HTTP requests and responses

---
