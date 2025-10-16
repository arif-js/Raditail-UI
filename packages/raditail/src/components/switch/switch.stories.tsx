import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Switch } from './switch'
import { controlLabelGapClasses, controlLabelTextClasses } from '@/utils/size'
import { cn } from '@/utils/cn'

const meta: Meta<typeof Switch> = {
  tags: ['autodocs'],
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: 'A toggle control that switches between two states.',
      },
    },
  },
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    const resolvedSize = args.size ?? 'md'
    return (
      <label
        className={cn(
          'flex items-center font-medium text-[var(--rt-foreground)]',
          controlLabelGapClasses[resolvedSize],
          controlLabelTextClasses[resolvedSize]
        )}
      >
        <span>Enable alerts</span>
        <Switch {...args} checked={checked} onCheckedChange={setChecked} />
      </label>
    )
  },
}
