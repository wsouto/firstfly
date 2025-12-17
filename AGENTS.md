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

- **Build**: `bunx --bun astro build`
- **Dev server**: `bunx --bun astro dev`
- **Type generation**: `wrangler types` (or `bun run cf-typegen`)
- **Deploy**: `astro build && wrangler deploy` (or `bun run deploy`)
- **Preview**: `astro build && wrangler dev` (or `bun run preview`)
- **Lint**: `bun run lint` (check) or `bun run lint:fix` (auto-fix)
- **Format**: `bun run format` (check) or `bun run format:fix` (auto-fix)

### Available Scripts (from package.json)

- `bun run dev`: Starts the Astro development server.
- `bun run build`: Builds the project for production.
- `bun run preview`: Builds and previews with Wrangler.
- `bun run deploy`: Builds and deploys to Cloudflare.
- `bun run cf-typegen`: Generates Cloudflare Worker types.
- `bun run format`: Checks code formatting with Prettier.
- `bun run format:fix`: Fixes code formatting with Prettier.
- `bun run lint`: Runs ESLint on source files.
- `bun run lint:fix`: Runs ESLint with auto-fix on source files.

No test framework configured.

---

## Code Style Guidelines

### Formatting & Linting

- 2-space indentation, 100-character line width.
- Single quotes for JavaScript/TypeScript strings (`" "` reserved for JSX).
- Enforced via:
  - `.editorconfig` (line endings, indentation)
  - `eslint.config.js` (linting rules)
  - `.prettierrc` (auto-formatting)
  - `lefthook.yml` (git hooks)
  - `lint-staged` (pre-commit linting and formatting)

### TypeScript

- Strict mode (`astro/tsconfigs/strict`).
- `strictNullChecks: true`.
- React JSX: `jsxImportSource: "react"` (see `tsconfig.json`).
- Custom worker types via `worker-configuration.d.ts` for Cloudflare compatibility.

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
- Dev tools: ESLint, Prettier, Commitlint, Lefthook, lint-staged.
- Configuration files: `eslint.config.js`, `.prettierrc`, `lefthook.yml`, `wrangler.jsonc`.

---

## Git Hooks

- **Lefthook** is used for managing git hooks (configured in `lefthook.yml`).
- **lint-staged** runs linters and formatters on staged files before commits.
- Commits are automatically formatted and linted before being allowed.

---

## Project Structure

```
firstfly/
├── .vscode/                # VSCode settings
├── .wrangler/              # Wrangler-generated files
├── public/                 # Static assets
├── src/
│   ├── client/             # Source code (Astro pages, components, etc.)
│   └── env.d.ts            # TypeScript environment declarations
├── astro.config.mjs        # Astro configuration
├── eslint.config.js        # ESLint rules
├── lefthook.yml            # Git hooks configuration
├── package.json            # Project dependencies and scripts
├── prettierrc              # Prettier configuration
├── tsconfig.json           # TypeScript configuration
├── worker-configuration.d.ts  # Cloudflare Workers types
└── wrangler.jsonc          # Cloudflare Wrangler configuration
```

---

## Cloudflare & Secrets

- Configure environment variables in `wrangler.jsonc`.
- Configure secrets (sensitive data) in the [Cloudflare Dashboard](https://dash.cloudflare.com/) or via `wrangler secret put`.
- Environment variables are loaded at runtime during deployment.
- Custom worker configuration defined in `worker-configuration.d.ts`.

---
