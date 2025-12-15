type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare module "astro" {
  interface Locals extends Runtime {}
}
