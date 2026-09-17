import type { Meta, StoryObj } from '@storybook/react'
import { Textarea, type TextareaProps } from './textarea'

const meta: Meta<TextareaProps> = {
  tags: ['autodocs'],
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    placeholder: 'Write a description…',
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

type Story = StoryObj<TextareaProps>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true, value: 'Cannot edit this' },
}
