import eslintPluginPrettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import js from '@eslint/js';

export default tseslint.config(
  { ignores: ['node_modules', 'dist', 'vite.config.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: eslintPluginPrettier,
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          bracketSameLine: false,
          bracketSpacing: true,
          embeddedLanguageFormatting: 'auto',
          htmlWhitespaceSensitivity: 'css',
          insertPragma: false,
          singleQuote: true,
          jsxSingleQuote: true,
          printWidth: 120,
          proseWrap: 'preserve',
          quoteProps: 'as-needed',
          requirePragma: false,
          semi: true,
          tabWidth: 2,
          useTabs: false,
          endOfLine: 'auto',
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // `react` first, `next` second, then packages starting with a character
            ['^react$', '^next', '^[a-z]'],
            // Packages starting with `@`
            ['^@'],
            // Packages starting with `~`
            ['^~'],
            // Imports starting with `../`
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Imports starting with `./`
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports
            ['^.+\\.s?css$'],
            // Side effect imports
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
);
