# Agent Guidelines for FirstFly

## Build/Lint/Test Commands

- **Build**: `astro build`
- **Dev server**: `bunx --bun astro dev`
- **Type generation**: `wrangler types`
- **Deploy**: `astro build && wrangler deploy`
- **Preview**: `astro build && wrangler dev`

No test framework configured.

## Code Style Guidelines

### Formatting & Linting

- 2-space indentation, 100 char line width
- Double quotes for JavaScript/TypeScript strings

### TypeScript

- Strict TypeScript configuration (`astro/tsconfigs/strict`)
- Strict null checks enabled
- React JSX with `jsxImportSource: "react"`

### Naming Conventions

- camelCase for JavaScript variables and functions
- PascalCase for React components
- lowercase for HTML elements and attributes
- kebab-case for file names (Astro convention)

### Imports

- Use relative imports (`../`) for internal modules
- Group imports: external packages first, then internal modules

### Commit Messages

- Follow conventional commits format
- Valid types: feat, fix, docs, style, refactor, test, chore

### Architecture

- Astro framework with React integration
- TailwindCSS for styling
- Cloudflare Pages deployment
- Source directory: `src/client/`
