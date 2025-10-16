import type { Meta, StoryObj } from '@storybook/react'
import {
  NavigationMenu,
  NavigationMenuViewport,
  type NavigationMenuItemConfig,
} from './navigation-menu'

const generatedItems: NavigationMenuItemConfig[] = [
  {
    key: 'product',
    label: 'Product',
    content: (
      <div className="grid gap-3 text-sm">
        <span className="font-semibold text-[var(--rt-foreground)]">
          Design system
        </span>
        <p className="text-sm text-[var(--rt-muted-foreground)]">
          Unified tokens and accessible components.
        </p>
      </div>
    ),
    contentProps: {
      className:
        'rounded-[var(--rt-radius-lg)] border border-[--rt-border-color] bg-[var(--rt-bg)] p-6',
    },
  },
  {
    key: 'pricing',
    label: 'Pricing',
    href: '#',
  },
]

const meta: Meta = {
  tags: ['autodocs'],
  title: 'Components/Navigation Menu',
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    size: 'md',
  },
  render: (args) => (
    <NavigationMenu
      size={args.size as 'sm' | 'md' | 'lg'}
      menuItems={generatedItems}
    >
      <NavigationMenuViewport />
    </NavigationMenu>
  ),
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
