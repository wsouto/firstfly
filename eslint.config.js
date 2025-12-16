import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  // Ignore build output
  {
    ignores: ['dist/**', '.astro/**'],
  },

  // Base JS rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // Astro rules
  ...astro.configs.recommended,

  // Disable formatting-related rules
  prettier,

  // Global rule adjustments (Astro-friendly)
  {
    rules: {
      'no-prototype-builtins': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },

  // Parser setup for .astro files
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
