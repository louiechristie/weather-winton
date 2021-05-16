module.exports = {
  extends: ['universe/node', 'universe/shared/typescript-analysis', 'prettier'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
