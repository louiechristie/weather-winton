import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import neostandard from 'neostandard';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
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
    },
  },
];

export default eslintConfig;
