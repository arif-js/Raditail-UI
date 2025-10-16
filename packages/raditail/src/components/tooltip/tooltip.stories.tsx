import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'

type TooltipStoryArgs = {
  size: 'sm' | 'md' | 'lg'
  placement: 'top' | 'right' | 'bottom' | 'left'
  content: string
  colorScheme:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'destructive'
    | 'success'
    | 'warning'
  sideOffset: number
}

const meta: Meta<TooltipStoryArgs> = {
  tags: ['autodocs'],
  title: 'Components/Tooltip',
  component: TooltipContent,
  parameters: {
    docs: {
      description: {
        component:
          'A popup that displays information when hovering over an element.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tooltip',
    },
    placement: {
      control: 'inline-radio',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position relative to the trigger',
    },
    colorScheme: {
      control: 'inline-radio',
      options: [
        'default',
        'primary',
        'secondary',
        'destructive',
        'success',
        'warning',
      ],
      description: 'Semantic color scheme',
    },
    content: {
      control: 'text',
      description: 'Tooltip content',
    },
    sideOffset: {
      control: { type: 'range', min: 0, max: 30, step: 2 },
      description: 'Distance from the trigger',
    },
  },
  args: {
    size: 'md',
    placement: 'top',
    colorScheme: 'default',
    content: 'Helpful info',
    sideOffset: 8,
  },
  render: (args) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent {...args} />
      </Tooltip>
    </TooltipProvider>
  ),
}

export default meta

type Story = StoryObj<TooltipStoryArgs>

export const Default: Story = {}

export const ColorSchemes: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-wrap gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Default</Button>
          </TooltipTrigger>
          <TooltipContent colorScheme="default">Default tooltip</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" colorScheme="primary">
              Primary
            </Button>
          </TooltipTrigger>
          <TooltipContent colorScheme="primary">Primary tooltip</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" colorScheme="secondary">
              Secondary
            </Button>
          </TooltipTrigger>
          <TooltipContent colorScheme="secondary">
            Secondary tooltip
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" colorScheme="destructive">
              Destructive
            </Button>
          </TooltipTrigger>
          <TooltipContent colorScheme="destructive">
            Delete this item
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" colorScheme="success">
              Success
            </Button>
          </TooltipTrigger>
          <TooltipContent colorScheme="success">
            Successfully saved
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" colorScheme="warning">
              Warning
            </Button>
          </TooltipTrigger>
          <TooltipContent colorScheme="warning">
            Proceed with caution
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tooltips support semantic color schemes to match different contexts and actions.',
      },
    },
  },
}

export const CustomOffset: Story = {
  args: {
    sideOffset: 16,
    content: 'Offset tooltip',
  },
}
