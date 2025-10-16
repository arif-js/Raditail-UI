import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
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

export const Default: Story = {
  render: (args) => <CheckboxDemo {...args} />,
}

function CheckboxDemo(props: React.ComponentProps<typeof Checkbox>) {
  const [checked, setChecked] = useState(false)
  return <Checkbox {...props} checked={checked} onCheckedChange={setChecked} />
}
