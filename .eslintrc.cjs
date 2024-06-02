module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { 'jsx': true}},
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    "import/no-extraneous-dependencies": "off",
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/jsx-no-target-blank': 'off',
    "react/function-component-definition": [
      "error",
      { "namedComponents": "arrow-function", "unnamedComponents": "arrow-function" }
    ],
    "jsx-a11y/no-static-element-interactions": 'off',
    "jsx-a11y/click-events-have-key-events": 'off',
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/no-autofocus": "off",
    "sx-a11y/no-static-element-interactions": 'off',
    "no-restricted-exports": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
