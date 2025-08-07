import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
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
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...neostandard({
    noStyle: true, // Disable style-related rules (useful with Prettier or dprint)
    globals: globals.jest,
    ts: true, // Enable TypeScript support
    ignores: ['node_modules', '.cache', 'public'],
  }),
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default eslintConfig;
