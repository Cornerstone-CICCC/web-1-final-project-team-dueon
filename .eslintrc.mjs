export default {
  env: {
    browser: true,
    es2024: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    indent: ['error', 2],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    semi: ['error', 'always'],
    quotes: ['error', 'single']
  }
};
