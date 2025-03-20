import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import neostandard from 'neostandard';

/** @type {import('eslint').Linter.Config[]} */
export default [
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
];
