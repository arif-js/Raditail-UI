import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarFallback } from '../avatar/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card'

type HoverCardStoryArgs = {
  placement: 'left' | 'right' | 'top' | 'bottom'
  sideOffset: number
}

const meta: Meta<HoverCardStoryArgs> = {
  tags: ['autodocs'],
  title: 'Components/Hover Card',
  component: HoverCardContent,
  parameters: {
    docs: {
      description: {
        component:
          'A popup that displays information related to an element when the user hovers over it.',
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

type Story = StoryObj<HoverCardStoryArgs>

export const Default: Story = {
  render: (args) => (
    <HoverCard>
      <HoverCardTrigger className="inline-flex items-center gap-2 cursor-pointer">
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-[var(--rt-foreground)]">
          Jamie Doe
        </span>
      </HoverCardTrigger>
      <HoverCardContent placement={args.placement} sideOffset={args.sideOffset}>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Jamie Doe</p>
          <p className="text-sm text-[var(--rt-muted-foreground)]">
            Senior Product Designer
          </p>
          <p className="text-xs text-[var(--rt-muted-foreground)]">
            Passionate about creating intuitive and accessible user experiences.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
