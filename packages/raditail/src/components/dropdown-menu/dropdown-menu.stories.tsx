import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  type DropdownMenuGeneratedItem,
} from './dropdown-menu'

const generatedItems: DropdownMenuGeneratedItem[] = [
  { type: 'label', label: 'Quick actions' },
  { label: 'Duplicate' },
  { label: 'Archive' },
  { type: 'separator' },
  { label: 'Notify me' },
]

const meta: Meta = {
  tags: ['autodocs'],
  title: 'Components/Dropdown Menu',
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    alignment: {
      control: 'inline-radio',
      options: ['left', 'right'],
    },
  },
  args: {
    size: 'md',
    alignment: 'left',
  },
  render: (args) => (
    <DropdownMenu
      size={args.size as 'sm' | 'md' | 'lg'}
      menuItems={generatedItems}
      trigger={
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open menu</Button>
        </DropdownMenuTrigger>
      }
      contentProps={{ alignment: args.alignment as 'left' | 'right' }}
    />
  ),
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
