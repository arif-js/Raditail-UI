export const tokens = {
  colors: {
    background: 'var(--rt-bg)',
    foreground: 'var(--rt-fg)',
    muted: 'var(--rt-muted-bg)',
    mutedForeground: 'var(--rt-muted-fg)',
    border: 'var(--rt-border-color)',
    primary: 'var(--rt-primary-color)',
    primaryForeground: 'var(--rt-primary-contrast)',
  },
  radii: {
    sm: 'var(--rt-radius-sm)',
    md: 'var(--rt-radius-md)',
    lg: 'var(--rt-radius-lg)',
  },
  spacing: {
    xs: 'var(--rt-spacing-xs)',
    sm: 'var(--rt-spacing-sm)',
    md: 'var(--rt-spacing-md)',
    lg: 'var(--rt-spacing-lg)',
    xl: 'var(--rt-spacing-xl)',
  },
}

export type RaditailTokens = typeof tokens
