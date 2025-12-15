# Copilot Instructions for FirstFly

## Architecture Overview

**FirstFly** is an Astro-based web application deployed on Cloudflare Pages with Workers backend support. The project uses:
- **Framework**: Astro 5 with React integration for interactive components
- **Styling**: TailwindCSS (v4) + DaisyUI for component library
- **Deployment**: Cloudflare Pages (via Wrangler) with edge runtime capabilities
- **Source Root**: `src/client/` (configured in astro.config.mjs)

Key insight: Components are split between static **Astro** components (`.astro` files for server-rendered content) and **React** components (for client-side interactivity). See `src/client/components/` and `src/client/pages/index.astro` for examples.

## Essential Commands & Workflows

| Task | Command | Notes |
|------|---------|-------|
| **Dev server** | `bunx --bun astro dev` | Runs at `localhost:4321`; watches for changes |
| **Build** | `astro build` | Outputs to `./dist/`; required before deploy |
| **Deploy** | `astro build && wrangler deploy` | Builds + deploys to Cloudflare Pages |
| **Preview locally** | `astro build && wrangler dev` | Test production build before deploying |
| **Lint** | `ultracite check` | Checks code against Ultracite rules + Biome |
| **Auto-fix** | `ultracite fix` | Applies linting fixes; organizes imports |
| **Type generation** | `wrangler types` | Generates Cloudflare Worker types to `worker-configuration.d.ts` |

No test framework is configured—focus on linting and type safety instead.

## Code Style & Conventions

- **Formatting**: Biome (2-space indentation, 100-char line width)
- **Quotes**: Double quotes for all JavaScript/TypeScript strings
- **Naming**: `camelCase` for variables/functions, `PascalCase` for React/Astro components, `kebab-case` for filenames
- **Imports**: Relative imports (`../`) for internal modules; external packages first, then internal
- **TypeScript**: Strict mode enabled (`astro/tsconfigs/strict`), strict null checks required
- **JSX**: React JSX with `jsxImportSource: "react"` configured in tsconfig

See `biome.json` for formatter rules and `ultracite` configuration for linting strictness.

## Component Patterns

**Astro Components** (`.astro`) — Server-rendered, zero client JavaScript by default:
```astro
---
// Frontmatter: component logic, imports, server-only code
import Hello from "../components/Hello.astro";
---

<!-- Template: HTML-like syntax -->
<Hello/>
```

**React Components** (when needed) — Use `client:load` or other directives for hydration:
```astro
<ReactComponent client:load />
```

**Styling**: Apply TailwindCSS classes directly; DaisyUI components available (e.g., `kbd`, `btn`). See `src/client/components/Slogan.astro` for inline `<script>` usage with libraries like `typed.js`.

## Critical Paths & Key Files

- **Pages**: `src/client/pages/index.astro` — Entry point; routes determined by filename
- **Layouts**: `src/client/layouts/layout.astro` — Wraps page content
- **Global styles**: `src/client/styles/global.css` — TailwindCSS directives
- **Build output**: `dist/` → `dist/_worker.js/index.js` (configured in wrangler.jsonc)
- **Types**: `worker-configuration.d.ts` — Generated Cloudflare types; regenerate with `wrangler types`

## Cloudflare Integration

- **Adapter**: `@astrojs/cloudflare` with `platformProxy` enabled for local development
- **Image Service**: Cloudflare Images (configured in astro.config.mjs)
- **Observability**: Enabled in wrangler.jsonc; opt-in at build time
- **Assets**: Static files from `./dist` bound as `ASSETS` variable

Access Cloudflare context in server code via `Astro.locals.runtime.env` (requires `platformProxy` enabled locally).

## Git & Quality Checks

- **Commit linting**: `commitlint` enforces Conventional Commits (feat, fix, docs, style, refactor, test, chore)
- **Pre-commit hooks**: Lefthook configured in `lefthook.yml`
- **Auto-organize imports**: Enabled in Ultracite; redundant imports removed automatically

Always run `ultracite fix` before committing to ensure consistent formatting and no linting violations.
