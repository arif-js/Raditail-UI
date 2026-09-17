import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
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
  parameters: {
    docs: {
      description: {
        component:
          'Note: `DropdownMenu` renders its `children` as a sibling of the trigger, ' +
          '**not** inside the menu. Use the `menuItems` prop for generated menus, or ' +
          'pass an explicit `DropdownMenuContent` to place your own markup inside the menu.',
      },
    },
  },
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

export const CustomContentWithShortcuts: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Signed in as ada</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Settings <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Sign out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Custom markup needs an explicit `DropdownMenuContent` — it portals the items ' +
          'into the menu. `DropdownMenuShortcut` renders the keyboard hint on the right.',
      },
    },
  },
}
