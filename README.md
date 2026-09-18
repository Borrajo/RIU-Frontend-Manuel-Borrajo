# SuperHeroes

Web application for browsing and managing a list of superheroes. It is built with Angular 21, Angular Material, and TypeScript.

## Requirements

- Node.js 20 or later.
- npm 10 or later.
- Docker and Docker Compose, only if you want to run the containerized version.

## Installation

Install the dependencies from the project root:

```bash
npm install
```

## Local development

Start the development server:

```bash
npm start
```

Open `http://localhost:4200/`. The application reloads automatically when source files change.

## Testing

Run the test suite in interactive mode:

```bash
npm test
```

Run the tests once without watch mode:

```bash
npm test -- --watch=false
```

Run the tests once with coverage:

```bash
npm test -- --watch=false --coverage
```

## Linting

Run ESLint against the application code:

```bash
npm run lint
```

## Production build

Generate optimized artifacts in `dist/super-heroes`:

```bash
npm run build-production
```

## Docker

Build the image and start the application with Docker Compose:

```bash
docker compose up -d --build
```

Open `http://localhost:8080/`.

The image uses two stages: Node builds the application and Nginx serves the resulting static files. To stop the container:

```bash
docker compose down
```

## Architecture

The project uses standalone Angular components without NgModules:

- `src/app/main-page`: composes the main screen.
- `src/app/heroslist`: displays the table, pagination, and actions for each hero.
- `src/app/search-bar`: filters the list by name.
- `src/app/add-hero-button` and the dialogs in `src/app/*-hero-dialog`: add, edit, and delete heroes.
- `src/app/services/super-heros.ts`: centralizes hero state and operations.
- `src/shared/interfaces`: contains shared types.


## Technical decisions and assumptions

- State is kept in memory by the `SuperHeros` service; there is no backend or database.
- Changes made during a session are lost when the page is reloaded or the container is restarted.
- The initial hero list is defined in `src/app/services/super-heros.list.ts`.
- The application is served as an SPA by Nginx in Docker.
- Add and edit operations validate required fields, and adding a hero prevents duplicate names.
