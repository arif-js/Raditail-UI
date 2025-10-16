import type { Preview } from '@storybook/react'
import { useEffect, type ReactNode } from 'react'
import '../src/theme/tailwind.css'
import '../src/theme/styles.css'

const ThemeWrapper = ({
  theme,
  children,
}: {
  theme: 'light' | 'dark'
  children: ReactNode
}) => {
  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme
    root.classList.toggle('dark', theme === 'dark')
    return () => {
      root.dataset.theme = 'light'
      root.classList.remove('dark')
    }
  }, [theme])

  return <>{children}</>
}

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
    docs: {
      toc: true,
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for Raditail UI',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => (
      <ThemeWrapper theme={context.globals.theme}>
        <Story />
      </ThemeWrapper>
    ),
  ],
}

export default preview
