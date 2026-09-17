import type { Meta, StoryObj } from '@storybook/react'
import { Separator } from './separator'

const meta: Meta<typeof Separator> = {
  tags: ['autodocs'],
  title: 'Components/Separator',
  component: Separator,
}

export default meta

type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: (args) => (
    <div className="w-64 space-y-4 text-sm text-[var(--rt-muted-foreground)]">
      <p>Raditail UI combines Radix primitives with Tailwind tokens.</p>
      <Separator {...args} />
      <p>Use separators to organize menus, lists, or layouts.</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: (args) => (
    <div className="flex items-center gap-4 text-sm text-[var(--rt-muted-foreground)]">
      <span>Item A</span>
      <Separator {...args} orientation="vertical" className="h-6" />
      <span>Item B</span>
    </div>
  ),
}
