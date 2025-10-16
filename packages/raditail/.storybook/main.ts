import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    const srcPath = resolve(__dirname, '../src')
    const aliasKey = '@/'
    const aliasValue = `${srcPath}/`

    if (Array.isArray(config.resolve?.alias)) {
      const hasAlias = config.resolve.alias.some(
        (entry) => entry.find === aliasKey
      )

      config.resolve.alias = hasAlias
        ? config.resolve.alias
        : [...config.resolve.alias, { find: aliasKey, replacement: aliasValue }]
    } else {
      config.resolve = {
        ...(config.resolve ?? {}),
        alias: {
          ...(config.resolve?.alias ?? {}),
          [aliasKey]: config.resolve?.alias?.[aliasKey] ?? aliasValue,
        },
      }
    }
    config.define = {
      ...(config.define ?? {}),
      'process.env': {},
    }
    return config
  },
}

export default config
