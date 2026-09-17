import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button/button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

type PopoverStoryArgs = {
  placement: 'left' | 'right' | 'top' | 'bottom'
  sideOffset: number
}

const meta: Meta<PopoverStoryArgs> = {
  tags: ['autodocs'],
  title: 'Components/Popover',
  component: PopoverContent,
  parameters: {
    docs: {
      description: {
        component:
          'Displays rich content in a portal, triggered by a button click.',
      },
    },
  },
  argTypes: {
    placement: {
      control: 'inline-radio',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'The preferred side of the trigger to render against',
    },
    sideOffset: {
      control: { type: 'range', min: 0, max: 30, step: 2 },
      description: 'The distance in pixels from the trigger',
    },
  },
  args: {
    placement: 'bottom',
    sideOffset: 8,
  },
}

export default meta

type Story = StoryObj<PopoverStoryArgs>

export const Default: Story = {
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent placement={args.placement} sideOffset={args.sideOffset}>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">Team invite</h3>
          <p className="text-sm text-[var(--rt-muted-foreground)]">
            Share your workspace with collaborators by sending them a link.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
