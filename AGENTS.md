# Agent Guidelines for FirstFly

## Setup & Dependencies

### Prerequisites

- **Bun** (v1.0.0 or later) – Fast JavaScript runtime and package manager.
- **Wrangler CLI** – Cloudflare Workers CLI for type generation and deployments.
- **Node.js** (optional) – Only needed if Bun is unavailable (fallback for local development).

### Installation

1. Install **Bun** from [bun.sh](https://bun.sh/).
2. Install dependencies:
   ```sh
   bun install
   ```
3. Generate TypeScript types (required for Cloudflare Workers compatibility):
   ```sh
   wrangler types
   ```
   (or use the Bun alternative: `bun run cf-typegen`)

### Verify Installation

Run a dev server to confirm everything is set up correctly:

```sh
bunx --bun astro dev
```

Open `http://localhost:3000` in your browser. If you see the Astro app, your environment is ready!

---

## Build / Dev / Deploy Commands

- **Build**: `astro build`
- **Dev server**: `bunx --bun astro dev`
- **Type generation**: `wrangler types` (or `bun run cf-typegen`)
- **Deploy**: `astro build && wrangler deploy` (or `bun run deploy`)
- **Preview**: `astro build && wrangler dev` (or `bun run preview`)
- **Lint**: `bun run lint` (check) or `bun run lint:fix` (auto-fix)
- **Format**: `bun run format` (check) or `bun run format:fix` (auto-fix)

No test framework configured.

---

## Code Style Guidelines

### Formatting & Linting

- 2-space indentation, 100-character line width.
- Single quotes for JavaScript/TypeScript strings (`" "` reserved for JSX).
- Enforced via:
  - `.editorconfig` (line endings, indentation)
  - `.eslintrc` (linting rules)
  - `prettier.config.js` (auto-formatting)

### TypeScript

- Strict mode (`astro/tsconfigs/strict`).
- `strictNullChecks: true`.
- React JSX: `jsxImportSource: "react"` (see `tsconfig.json`).

### Naming Conventions

- **Files**: kebab-case (e.g., `user-profile.tsx`).
- **JS/TS**: camelCase (e.g., `handleClick()`).
- **React**: PascalCase (e.g., `<UserProfile />`).
- **Extensions**: `.tsx` (React), `.ts` (utilities), `.js` (legacy).

### Imports

- Use relative paths (`../`) for internal modules.
- Group imports: **external packages first**, then internal modules.

### Commit Messages

- Follow [conventional commits](https://www.conventionalcommits.org/).
- Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

---

## Architecture

- Framework: Astro + React.
- Styling: TailwindCSS v4 + daisyUI v5.
- Deployment: Cloudflare Pages (proxy enabled) + Cloudflare Images.
- Source directory: `src/client/` (client code only).
- Dev tools: ESLint, Prettier, Commitizen, Lefthook, lint-staged.

---

## Cloudflare & Secrets

- Configure secrets in `wrangler.toml` or the [Cloudflare Dashboard](https://dash.cloudflare.com/).
- Environment variables are loaded at runtime during deployment.

---
