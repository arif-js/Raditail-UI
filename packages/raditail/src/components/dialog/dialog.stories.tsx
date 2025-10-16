import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'
import { Button } from '../button/button'

type DialogStoryArgs = {
  size: NonNullable<React.ComponentProps<typeof DialogContent>['size']>
  fullScreen: boolean
  showCloseButton: boolean
  dismissable: boolean
  includeFooter: boolean
  triggerLabel: string
}

const meta: Meta<DialogStoryArgs> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A modal dialog that overlays the page content and captures focus.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    fullScreen: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    dismissable: { control: 'boolean' },
    includeFooter: { control: 'boolean' },
    triggerLabel: { control: 'text' },
  },
  args: {
    size: 'md',
    fullScreen: false,
    showCloseButton: false,
    dismissable: true,
    includeFooter: true,
    triggerLabel: 'Open dialog',
  },
  render: ({
    size,
    fullScreen,
    showCloseButton,
    dismissable,
    includeFooter,
    triggerLabel,
  }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent
        size={size}
        fullScreen={fullScreen}
        showCloseButton={showCloseButton}
        dismissable={dismissable}
      >
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4">
          <label className="flex flex-col gap-2 text-left text-sm">
            Name
            <input
              className="rounded-[var(--rt-radius-sm)] border border-[var(--rt-border-color)] bg-[var(--rt-bg)] px-3 py-2 text-[var(--rt-foreground)] focus:border-[var(--rt-primary-color)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rt-primary-color)]/40"
              defaultValue="Jane Doe"
            />
          </label>
        </form>
        {includeFooter ? (
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="solid">
              Save changes
            </Button>
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  ),
}

export default meta

type Story = StoryObj<DialogStoryArgs>

export const Default: Story = {}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const FullScreen: Story = {
  args: {
    fullScreen: true,
  },
}

export const WithCloseButton: Story = {
  args: {
    showCloseButton: true,
    includeFooter: false,
  },
}

export const NotDismissable: Story = {
  args: {
    dismissable: false,
    showCloseButton: false,
    includeFooter: false,
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(true)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>{args.triggerLabel}</Button>
        </DialogTrigger>
        <DialogContent
          size={args.size}
          fullScreen={args.fullScreen}
          showCloseButton={args.showCloseButton}
          dismissable={args.dismissable}
        >
          <DialogHeader>
            <DialogTitle>Controlled dialog</DialogTitle>
            <DialogDescription>
              The `open` prop is managed externally.
            </DialogDescription>
          </DialogHeader>
          {args.includeFooter ? (
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button onClick={() => setOpen(false)} variant="solid">
                Close
              </Button>
            </DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>
    )
  },
}
