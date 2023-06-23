module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // 추가
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    indent: 'off',
    // 'no-console': 2,
    // 'linebreak-style': 2,
    // 'max-len': ['warn', { code: 100 }],
  },
};
