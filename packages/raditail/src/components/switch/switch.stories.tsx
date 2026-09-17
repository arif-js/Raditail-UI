import type { Meta, StoryObj } from '@storybook/react'
import { useState, type ComponentProps } from 'react'
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

const ControlledSwitch = (args: ComponentProps<typeof Switch>) => {
  const [checked, setChecked] = useState(false)
  const resolvedSize = args.size ?? 'md'
  return (
    <div
      className={cn(
        'flex items-center font-medium text-[var(--rt-foreground)]',
        controlLabelGapClasses[resolvedSize],
        controlLabelTextClasses[resolvedSize]
      )}
    >
      <label htmlFor="switch-default">Enable alerts</label>
      <Switch
        id="switch-default"
        {...args}
        checked={checked}
        onCheckedChange={setChecked}
      />
    </div>
  )
}

export const Default: Story = {
  render: (args) => <ControlledSwitch {...args} />,
}
