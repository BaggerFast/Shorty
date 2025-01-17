// @ts-check

import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import tailwindPlugin from 'eslint-plugin-tailwindcss'
import { fixupPluginRules } from '@eslint/compat'
import jsxA11y from 'eslint-plugin-jsx-a11y'

// @ts-ignore
const patchedReactHooksPlugin = fixupPluginRules(reactHooksPlugin)

export default [
  jsxA11y.flatConfigs.strict,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  ...tailwindPlugin.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'react-hooks': patchedReactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      tailwindcss: {
        callees: ['classnames', 'cn', 'clsx', 'cva'],
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      '@typescript-eslint/no-misused-promises': 'off',
      'tailwindcss/migration-from-tailwind-2': 'off',
    },
  },
]
