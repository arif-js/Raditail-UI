import type { Meta, StoryObj } from '@storybook/react'
import { Input, type InputProps } from './input'

const meta: Meta<InputProps> = {
  tags: ['autodocs'],
  title: 'Components/Input',
  component: Input,
  args: {
    placeholder: 'Enter text',
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

type Story = StoryObj<InputProps>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Read only value',
  },
}
