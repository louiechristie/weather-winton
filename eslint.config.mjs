import globals from 'globals';
import pluginJs from '@eslint/js';
import neostandard from 'neostandard';
import nextVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';
import { defineConfig } from 'eslint/config';
import pluginJest from 'eslint-plugin-jest';

export default defineConfig([
  {
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...pluginJest.environments.globals.globals,
      },
    },
  },
  pluginJs.configs.recommended,
  ...nextVitals,
  ...typescript,
  ...neostandard({
    noStyle: true, // Disable style-related rules (useful with Prettier or dprint)
    globals: globals.jest,
    ts: true, // Enable TypeScript support
    ignores: ['node_modules', '.cache', 'public', '.next'],
  }),
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    ignores: ['/data/daily/daily.js'],
    rules: {
      // Because we only use SVG images and these are low file size so we don't need to optimise them like bitmap based formats.
      '@next/next/no-img-element': 'off',
      'no-warning-comments': [
        'error',
        { terms: ['@TODO'], location: 'anywhere' },
      ],
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
    },
  },
]);
