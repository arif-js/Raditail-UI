import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from './scroll-area'

const meta: Meta<typeof ScrollArea> = {
  tags: ['autodocs'],
  title: 'Components/Scroll Area',
  component: ScrollArea,
}

export default meta

type Story = StoryObj<typeof ScrollArea>

export const Default: Story = {
  render: (args) => (
    <ScrollArea
      {...args}
      className="h-40 w-60 rounded-[var(--rt-radius-lg)] border border-[var(--rt-border-color)] p-4"
    >
      <div className="space-y-2 text-sm text-[var(--rt-muted-foreground)]">
        {Array.from({ length: 12 }).map((_, index) => (
          <p key={index}>Scrollable item {index + 1}</p>
        ))}
      </div>
    </ScrollArea>
  ),
}
