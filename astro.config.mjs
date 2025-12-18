// @ts-check

import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  srcDir: './src/client',

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },

    imageService: 'cloudflare',
  }),

  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8787',
        },
      },
    },
  },

  integrations: [react()],
});
