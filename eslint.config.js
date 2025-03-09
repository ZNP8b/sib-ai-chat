import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      // Автофикс: правило "semi" исправляет отсутствие/избыточные точки с запятой
      semi: ['error', 'always'],
      // Правило для кавычек: исправляет двойные на одинарные
      quotes: ['error', 'single'],
      // Пример: предупреждение об неиспользуемых переменных (автофикс отсутствует)
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Дополнительное правило: можно добавить свои кастомные настройки
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      indent: ['error', 2],
      'no-console': 'warn',
      'comma-dangle': ['error', 'always-multiline'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'space-infix-ops': 'error',
      'prefer-const': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'no-mixed-spaces-and-tabs': 'error',
    },
  },
  eslintConfigPrettier,
]
