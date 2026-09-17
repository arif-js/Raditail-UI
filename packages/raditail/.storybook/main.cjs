const { resolve } = require('node:path')

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/react-vite', options: {} },
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

module.exports = config
