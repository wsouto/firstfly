---
applyTo: "**/*.{ts,tsx,js,jsx}"
---

# firstfly AI guide
- Stack: Astro 5 with `srcDir: ./src/client`; Cloudflare adapter with `platformProxy` and `imageService: "cloudflare"` (see [astro.config.mjs](../../astro.config.mjs)). React integration is enabled for JSX in pages/components.
- Structure: pages in [src/client/pages](../../src/client/pages), layouts in [src/client/layouts](../../src/client/layouts), shared components in [src/client/components](../../src/client/components). The current flow is [index.astro](../../src/client/pages/index.astro) → [layout.astro](../../src/client/layouts/layout.astro) → [Hello.astro](../../src/client/components/Hello.astro).
- Layout pattern: layout imports global styles and owns the document shell (meta, favicon, body classes). Page files should wrap content in `<Layout>` and place page markup in the default slot to inherit the centered flex body.
- Styling: Tailwind CSS v4 via Vite plugin with DaisyUI enabled in [src/client/styles/global.css](../../src/client/styles/global.css). Prefer Tailwind utilities over custom CSS; DaisyUI components are available. Global font is Iosevka via `@fontsource/iosevka`.
- Assets and images: static assets go in `public/`. Astro image pipeline should target the Cloudflare image service per adapter config.
- Runtime: built Worker entry is `dist/_worker.js/index.js` with asset binding `ASSETS` and compatibility flags `nodejs_compat` and `global_fetch_strictly_public` (see [wrangler.jsonc](../../wrangler.jsonc)). Update `compatibility_date` if you depend on newer runtime features.
- Commands (run from repo root): `bun install`; `bun dev` (bunx astro dev); `bun run build` (astro build); `bun run preview` (build then `wrangler dev`); `bun run deploy` (build then `wrangler deploy`); `bun run cf-typegen` to refresh Cloudflare bindings types.
- Type setup: [tsconfig.json](../../tsconfig.json) extends `astro/tsconfigs/strict`, includes `worker-configuration.d.ts`, and sets `jsx` to `react-jsx` with `jsxImportSource: react` for React 19. Add new types under `src` to keep inference clean.
- Conventions: prefer `const`, `for...of`, optional chaining/nullish coalescing, and named constants for magic values. Avoid barrel exports. Keep hooks at top level and supply stable `key` values in lists; prefer `ref` prop over `forwardRef` per React 19 guidance.
- Lint/format: Ultracite (Biome) is the formatter/linter; use `npx ultracite fix` locally and `npx ultracite check` for CI-style runs. Remove stray `console.log`/`debugger` before shipping.
- Accessibility/security: use semantic elements, provide `alt` text for images, and add `rel="noopener"` on outbound `target="_blank"` links. Avoid `dangerouslySetInnerHTML`.
- Testing: no test suite present yet; if adding tests, keep them small and avoid `.only`/`.skip`.
- Performance: keep regex literals top-level; avoid spread in hot loops. Cloudflare runtime is edge-like—avoid Node-only APIs unless covered by `nodejs_compat`.
