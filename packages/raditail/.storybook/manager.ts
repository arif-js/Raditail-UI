import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

const theme = create({
  base: 'light',

  // Brand info
  brandTitle: 'Raditail UI',
  brandUrl: 'https://github.com/arif-js/Raditail-UI',
  brandTarget: '_blank',

  // Typography
  fontBase: '"Inter", "Segoe UI", "Roboto", sans-serif',
  fontCode: 'monospace',

  // Colors
  colorPrimary: '#3b82f6',
  colorSecondary: '#8b5cf6',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#e5e7eb',
  appBorderRadius: 8,

  // Text colors
  textColor: '#1f2937',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#6b7280',
  barSelectedColor: '#3b82f6',
  barBg: '#f9fafb',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#d1d5db',
  inputTextColor: '#1f2937',
  inputBorderRadius: 6,
})

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
})
