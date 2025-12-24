# Agent Guidelines for FirstFly

## Description

This a waitlist application. It's a lightweight system used to collect, manage, and prioritize users who want access to a product, service, event, or feature that is not yet fully available. Its main goal is to capture demand, control rollout, and communicate status to users while capacity is limited.

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

- **Build**: `bun run build:client`
- **Dev server**: `bun run dev` (starts both client and worker concurrently)
- **Type generation**: `wrangler types` (or `bun run typegen`)
- **Deploy**: `bun run deploy` (or `bun run deploy:staging`, `bun run deploy:prod`)
- **Preview**: `bun run preview`
- **Lint**: `bun run lint` (check) or `bun run lint:fix` (auto-fix)
- **Format**: `bun run format` (check) or `bun run format:fix` (auto-fix)

### Available Scripts (from package.json)

- `bun run dev`: Starts both client (Astro) and worker (Wrangler) servers concurrently.
- `bun run client`: Starts the Astro development server.
- `bun run worker`: Starts the Wrangler development server.
- `bun run build:client`: Builds the client for production.
- `bun run preview`: Builds and previews with Wrangler.
- `bun run deploy`: Builds and deploys to Cloudflare.
- `bun run deploy:staging`: Builds and deploys to staging environment.
- `bun run deploy:prod`: Builds and deploys to production environment.
- `bun run dryrun:staging`: Dry run deploy to staging.
- `bun run dryrun:prod`: Dry run deploy to production.
- `bun run typegen`: Generates Cloudflare Worker types.
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

- Framework: Astro + React + Hono (server-side).
- Styling: TailwindCSS v4 + daisyUI v5.
- Deployment: Cloudflare Pages (proxy enabled) + Cloudflare Images + Cloudflare Workers.
- Source directories: `src/client/` (client code), `src/server/` (server-side API with Hono).
- Dev tools: ESLint, Prettier, Commitlint, Lefthook, lint-staged, Husky.
- Configuration files: `eslint.config.js`, `.prettierrc`, `lefthook.yml`, `wrangler.jsonc`, `commitlint.config.js`.

---

## Git Hooks

- **Husky** is used for installing git hooks, with **Lefthook** managing the hook logic (configured in `lefthook.yml` and `.husky/_/`).
- **lint-staged** runs linters and formatters on staged files before commits.
- Commits are automatically formatted, linted, and validated before being allowed.

---

## Project Structure

```text
firstfly/
├── .github/                # GitHub-specific files and instructions
├── .husky/                 # Husky git hooks
├── .vscode/                # VSCode settings
├── .wrangler/              # Wrangler-generated files
├── public/                 # Static assets
├── src/
│   ├── client/             # Client-side source code
│   │   ├── components/     # React components
│   │   ├── layouts/        # Astro layouts
│   │   └── pages/          # Astro pages
│   ├── server/             # Server-side API code (Hono)
│   │   ├── middleware/     # Server middleware
│   │   └── index.ts        # Main server file
│   └── env.d.ts            # TypeScript environment declarations
├── .editorconfig           # Editor configuration
├── .prettierignore         # Prettier ignore patterns
├── .prettierrc             # Prettier configuration
├── AGENTS.md               # This file
├── astro.config.mjs        # Astro configuration
├── bun.lock                # Bun lockfile
├── commitlint.config.js    # Commitlint configuration
├── eslint.config.js        # ESLint rules
├── lefthook.yml            # Lefthook configuration
├── package-lock.json       # NPM lockfile
├── package.json            # Project dependencies and scripts
├── README.md               # Project README
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
