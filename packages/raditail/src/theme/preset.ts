import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export const colorTokens = {
  background: 'rgb(var(--rt-background) / <alpha-value>)',
  foreground: 'rgb(var(--rt-foreground) / <alpha-value>)',
  muted: 'rgb(var(--rt-muted) / <alpha-value>)',
  'muted-foreground': 'rgb(var(--rt-muted-foreground) / <alpha-value>)',
  border: 'rgb(var(--rt-border) / <alpha-value>)',
  primary: 'rgb(var(--rt-primary) / <alpha-value>)',
  'primary-foreground': 'rgb(var(--rt-primary-foreground) / <alpha-value>)',
  secondary: 'rgb(var(--rt-secondary) / <alpha-value>)',
  'secondary-foreground': 'rgb(var(--rt-secondary-foreground) / <alpha-value>)',
  destructive: 'rgb(var(--rt-destructive) / <alpha-value>)',
  'destructive-foreground':
    'rgb(var(--rt-destructive-foreground) / <alpha-value>)',
  success: 'rgb(var(--rt-success) / <alpha-value>)',
  'success-foreground': 'rgb(var(--rt-success-foreground) / <alpha-value>)',
  warning: 'rgb(var(--rt-warning) / <alpha-value>)',
  'warning-foreground': 'rgb(var(--rt-warning-foreground) / <alpha-value>)',
  accent: 'rgb(var(--rt-accent) / <alpha-value>)',
  'accent-foreground': 'rgb(var(--rt-accent-foreground) / <alpha-value>)',
}

export const radiusTokens = {
  none: '0px',
  sm: 'var(--rt-radius-sm)',
  md: 'var(--rt-radius-md)',
  lg: 'var(--rt-radius-lg)',
  full: '9999px',
}

export const spacingTokens = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
}

export const raditailPreset: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        rt: colorTokens,
      },
      borderRadius: {
        ...radiusTokens,
      },
      spacing: {
        ...spacingTokens,
      },
      ringColor: {
        rt: 'rgb(var(--rt-ring) / <alpha-value>)',
      },
      ringOffsetColor: {
        rt: 'rgb(var(--rt-ring-offset) / <alpha-value>)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': {
          '--rt-ring-offset-width': '2px',
        },
      })
    }),
  ],
}

export const raditailTheme = {
  colors: colorTokens,
  radii: radiusTokens,
  spacing: spacingTokens,
}

export default raditailPreset
