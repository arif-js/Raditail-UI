import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../button/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet'

const meta: Meta = {
  tags: ['autodocs'],
  title: 'Components/Sheet',
  component: SheetContent,
  parameters: {
    docs: {
      description: {
        component:
          'A slide-out panel that overlays the main content, accessible from any edge of the screen.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Project settings</SheetTitle>
          <SheetDescription>
            Update integration keys and owners.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 text-sm">
          <label className="space-y-1">
            <span className="font-medium">Project name</span>
            <input className="w-full rounded-[var(--rt-radius-sm)] border border-[var(--rt-border-color)] px-3 py-2" />
          </label>
        </div>
        <SheetFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant="solid">Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}
