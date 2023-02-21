module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'plugin:prettier/recommended',
    'airbnb',
    'prettier',
  ],
  overrides: [],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    'prettier/prettier': 'error',
    'no-shadow': ['error', { allow: ['done'] }],
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': [0],
    'no-unused-vars': 1,
    'react/prefer-stateless-function': [0, { ignorePureComponents: true }],
    'react/prop-types': 0,
    'react/button-has-type': 0,
    'no-extra-boolean-cast': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/label-has-associated-control': [
      0,
      {
        labelComponents: ['CustomLabel'],
        labelAttributes: ['inputLabel'],
        controlComponents: ['CustomInput'],
        assert: 'both',
        depth: 3,
      },
    ],
  },
};
