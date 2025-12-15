---
applyTo: "**/*.{ts,tsx,js,jsx}"
---

# firstfly AI guide
- Stack: Astro 5 with `srcDir` at `src/client`; Cloudflare adapter with `platformProxy` and `imageService: "cloudflare"` (see [astro.config.mjs](../../astro.config.mjs)). Tailwind CSS v4 + DaisyUI via Vite plugin and global font import in [src/client/styles/global.css](../../src/client/styles/global.css).
- Pages live in [src/client/pages](../../src/client/pages); layouts in [src/client/layouts](../../src/client/layouts); shared components in [src/client/components](../../src/client/components). Example flow: [index.astro](../../src/client/pages/index.astro) wraps a `Hello` component with the base layout.
- Layout pattern: keep `<Layout>` responsible for document shell (meta, favicon, body classes). Put page content in `<slot />` to inherit the flex-centered body styling.
- Styling: prefer Tailwind utility classes; DaisyUI components are available. The `@fontsource/iosevka` import sets the monospace base; adjust typography through Tailwind classes rather than custom CSS when possible.
- Commands (root): `bun install`; `bun dev` (bunx astro dev); `bun run build` (astro build); `bun run preview` builds then `wrangler dev`; `bun run deploy` builds then `wrangler deploy`; `bun run cf-typegen` to refresh Cloudflare bindings types.
- Deployment/runtime: Cloudflare Worker entry at `dist/_worker.js/index.js` with assets binding `ASSETS` (see [wrangler.jsonc](../../wrangler.jsonc)). Compatibility flags include `nodejs_compat` and `global_fetch_strictly_public`; update `compatibility_date` as needed.
- Types: `tsconfig.json` extends `astro/tsconfigs/strict`, includes `worker-configuration.d.ts`, and sets `jsx` to `react-jsx` for React 19. Add new types under `src` to keep inference clean.
- React usage: integration is enabled; use function components. Keep hooks at top-level and provide stable `key` props in iterables. Prefer `ref` prop over `forwardRef` (React 19 guidance).
- Assets: place static files in `public/`. Use Astro image pipeline via Cloudflare image service when adding images.
- Lint/format: Ultracite (Biome) is enforced. Run `npx ultracite fix` before commits; `npx ultracite check` for CI-style linting; `npx ultracite doctor` if tooling misbehaves. Remove stray `console.log`/`debugger` before shipping.
- Conventions: use `const` by default; prefer `for...of` over `.forEach`; use optional chaining/nullish coalescing for safety. Extract magic values into named constants. Avoid barrel re-exports.
- Security/accessibility: add `rel="noopener"` to outbound links with `target="_blank"`; favor semantic elements over generic divs; provide alt text for images. Avoid `dangerouslySetInnerHTML`.
- Performance: keep regex literals top-level; avoid spread in hot loops. Astro + Cloudflare deploys run in edge-like environments—avoid Node-only APIs unless covered by `nodejs_compat`.
- Testing: no suite present; if adding tests, keep them small and avoid `.only`/`.skip`. Use async/await instead of callbacks.

# Ultracite code standards
- Focus on accessible, performant, type-safe code with explicit intent.
- Type safety: prefer `unknown` to `any`; use const assertions for immutables; rely on narrowing instead of assertions.
- Modern JS/TS: use arrow callbacks; template literals over concatenation; destructure inputs; use `const` by default.
- Async: always `await` promises; avoid async Promise executors; handle errors with meaningful messages.
- Organization: favor early returns; avoid nested ternaries; keep functions small and named clearly.
- Security/performance: avoid `eval` and direct `document.cookie` writes; prefer specific imports; avoid barrel files.
- Testing hygiene: assertions inside `it`/`test`; no `done` callbacks; keep suites shallow.
