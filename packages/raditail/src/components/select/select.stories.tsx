import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select'

const meta: Meta = {
  tags: ['autodocs'],
  title: 'Components/Select',
  component: SelectTrigger,
  render: (args) => (
    <Select defaultValue="california">
      <SelectTrigger {...args}>
        <SelectValue placeholder="Select a state" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>States</SelectLabel>
          <SelectItem value="california">California</SelectItem>
          <SelectItem value="colorado">Colorado</SelectItem>
          <SelectItem value="florida">Florida</SelectItem>
          <SelectItem value="texas">Texas</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  args: {
    className: undefined,
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

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger>
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option">Option</SelectItem>
      </SelectContent>
    </Select>
  ),
}
