# Agent Guidelines for FirstFly

## Build/Lint/Test Commands

- **Build**: `astro build`
- **Dev server**: `bunx --bun astro dev`
- **Type generation**: `wrangler types` (or `bun run cf-typegen`)
- **Deploy**: `astro build && wrangler deploy` (or `bun run deploy`)
- **Preview**: `astro build && wrangler dev` (or `bun run preview`)
- **Lint**: `bun run lint` (check) or `bun run lint:fix` (auto-fix)
- **Format**: `bun run format` (check) or `bun run format:fix` (auto-fix)

No test framework configured.

## Code Style Guidelines

### Formatting & Linting

- 2-space indentation, 100 char line width
- Single quotes for JavaScript/TypeScript strings (double quotes in JSX)

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
- TailwindCSS v4 for styling (with daisyUI v5)
- Cloudflare Pages deployment with platform proxy enabled
- Cloudflare image service for optimized images
- Source directory: `src/client/`
- Dev tools: ESLint, Prettier, Commitizen, Lefthook, lint-staged
