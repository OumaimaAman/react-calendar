module.exports = {
  root: true,
  env: {
    browser: true,
    mocha: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'react-app',
  ],
  rules: {
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'jsx-quotes': 'error',
    '@typescript-eslint/no-non-null-assertion': [0],
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/ban-types': [1],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    'import/no-anonymous-default-export': 'off',
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ],
    'react/display-name': [0],
    'no-console': 'warn',
  },
};
