import type { Meta, StoryObj } from '@storybook/react'
import type { CheckedState } from '@radix-ui/react-checkbox'
import { useState, type ComponentProps } from 'react'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  tags: ['autodocs'],
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    size: 'md',
    label: 'Accept terms',
    placement: 'right',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    placement: {
      control: 'inline-radio',
      options: ['left', 'right'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

const ControlledCheckbox = (args: ComponentProps<typeof Checkbox>) => {
  const [checked, setChecked] = useState<CheckedState>(false)
  return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
}

export const Default: Story = {
  render: (args) => <ControlledCheckbox {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Checkbox 
  label="Accept terms" 
  placement="right" 
  size="md" 
  checked={checked} 
  onCheckedChange={setChecked} 
/>`,
      },
    },
  },
}
